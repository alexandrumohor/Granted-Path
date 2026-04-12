"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, Calendar, Target, TrendingUp, MessageSquare, Check,
  Clock, ArrowRight, Brain, Flame, Lightbulb, AlertTriangle,
} from "lucide-react";

const lastSession = {
  date: "April 4, 2026",
  duration: "18 min",
  summary: "We focused on your Python async struggles. I challenged your assumption that asyncio is always faster — you agreed after walking through the CPU-bound example. We set a commitment: you'd write one async scraper by this week.",
  commitments: [
    { text: "Write an async scraper using aiohttp", done: true },
    { text: "Review 5 flashcards on coroutines daily", done: true },
    { text: "Read PEP 492 sections on async/await semantics", done: false },
  ],
};

const weekReview = {
  studyHours: 8.5,
  studyGoal: 10,
  streak: 12,
  topicsCovered: 4,
  weakPointsResolved: 2,
  newWeakPoints: 3,
};

const coachQuestions = [
  "You skipped the PEP 492 reading — was that a scheduling issue or did you find it too dense? Be honest, I'm not grading you.",
  "Your Python async accuracy jumped from 54% to 81%. What clicked for you this week? I want to make sure we double down on what's working.",
  "Your Kubernetes path has been untouched for 6 days. Are you still committed to the May deadline, or should we renegotiate it?",
];

const insights = [
  { icon: TrendingUp, type: "win", text: "You answered 3 async questions in a row without hesitation — genuine improvement, not luck." },
  { icon: AlertTriangle, type: "concern", text: "You've been avoiding video content for 2 weeks. You told me in session 4 that videos drain you — are we still learning, or just hiding?" },
  { icon: Lightbulb, type: "insight", text: "You learn fastest between 9am-11am based on assessment timestamps. Consider protecting that window for deep work." },
];

export default function AICoachPage() {
  const t = useTranslations("aiCoach");
  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Coach
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button size="lg"><MessageSquare className="mr-2 h-4 w-4" />{t("startSession")}</Button>
      </div>

      {/* Next Session CTA */}
      <Card className="mb-6 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <Badge className="mb-2 bg-primary/20 text-primary">Session 8 — ready now</Badge>
                <h2 className="text-lg font-semibold">{t("weeklyCheckin")}</h2>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  I've reviewed your week. I have 3 questions for you — some will feel uncomfortable. That's the point. Sessions average 15–20 minutes.
                </p>
              </div>
            </div>
            <Button>{t("begin")}<ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {/* Week Review Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{t("studyHours")}</span>
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{weekReview.studyHours}h <span className="text-sm font-normal text-muted-foreground">/ {weekReview.studyGoal}h</span></p>
            <div className="mt-2 h-1 rounded-full bg-muted">
              <div className="h-1 rounded-full bg-primary" style={{ width: `${(weekReview.studyHours / weekReview.studyGoal) * 100}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Streak</span>
              <Flame className="h-3.5 w-3.5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">{weekReview.streak} <span className="text-sm font-normal text-muted-foreground">days</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{t("weakPointsResolved")}</span>
              <Check className="h-3.5 w-3.5 text-green-500" />
            </div>
            <p className="text-2xl font-bold">{weekReview.weakPointsResolved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{t("newWeakPoints")}</span>
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold">{weekReview.newWeakPoints}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Last Session */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">{t("lastSession")}</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{lastSession.date}</span>
                  <span>·</span>
                  <Clock className="h-3.5 w-3.5" />
                  <span>{lastSession.duration}</span>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{lastSession.summary}</p>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("commitments")}</p>
                <ul className="space-y-2">
                  {lastSession.commitments.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div className={
                        c.done
                          ? "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/20"
                          : "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted"
                      }>
                        {c.done && <Check className="h-3 w-3 text-green-500" />}
                      </div>
                      <span className={c.done ? "text-muted-foreground line-through" : ""}>{c.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Coach's Questions */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">{t("whatIllAsk")}</h2>
            <div className="space-y-3">
              {coachQuestions.map((q, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <p className="flex gap-3 text-sm">
                      <span className="shrink-0 font-semibold text-primary">{i + 1}.</span>
                      <span className="text-muted-foreground">{q}</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Brain className="h-5 w-5 text-primary" />Coach's Observations
          </h2>
          <div className="space-y-3">
            {insights.map((ins, i) => {
              const Icon = ins.icon;
              const color = ins.type === "win" ? "text-green-500" : ins.type === "concern" ? "text-orange-500" : "text-primary";
              const border = ins.type === "win" ? "border-green-500/20" : ins.type === "concern" ? "border-orange-500/20" : "border-primary/20";
              return (
                <Card key={i} className={border}>
                  <CardContent className="py-4">
                    <div className="flex gap-3">
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${color}`} />
                      <p className="text-sm text-muted-foreground">{ins.text}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
