"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, Calendar, Clock, Brain, Zap, RefreshCcw,
  Sun, Moon, Coffee, Dumbbell, BookOpen, MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Block = {
  time: string;
  title: string;
  type: "study" | "review" | "practice" | "break" | "voice";
  duration: number;
  energy: "high" | "medium" | "low";
};

const week: Record<string, Block[]> = {
  Lun: [
    { time: "09:00", title: "Cloud Architecture — Module 3", type: "study", duration: 45, energy: "high" },
    { time: "09:45", title: "Pauza", type: "break", duration: 10, energy: "low" },
    { time: "09:55", title: "Revizuire flashcard-uri: Python async", type: "review", duration: 15, energy: "medium" },
    { time: "19:00", title: "Tutor vocal: practica DI", type: "voice", duration: 20, energy: "medium" },
  ],
  Mar: [
    { time: "09:00", title: "Kubernetes Module 1", type: "study", duration: 40, energy: "high" },
    { time: "09:40", title: "Practice quiz", type: "practice", duration: 15, energy: "medium" },
    { time: "18:30", title: "Revizuire flashcard-uri: Cloud basics", type: "review", duration: 15, energy: "low" },
  ],
  Mie: [
    { time: "09:00", title: "Zi de odihna — revizuire usoara", type: "review", duration: 15, energy: "low" },
    { time: "20:00", title: "Tutor vocal: conversatie", type: "voice", duration: 15, energy: "low" },
  ],
  Joi: [
    { time: "09:00", title: "Observability & Monitoring", type: "study", duration: 45, energy: "high" },
    { time: "09:45", title: "Pauza", type: "break", duration: 10, energy: "low" },
    { time: "09:55", title: "Practica: Grafana dashboards", type: "practice", duration: 20, energy: "medium" },
  ],
  Vin: [
    { time: "09:00", title: "Cost Optimization module", type: "study", duration: 30, energy: "medium" },
    { time: "09:30", title: "Evaluare saptamanala", type: "practice", duration: 25, energy: "medium" },
  ],
  Sam: [{ time: "10:00", title: "Recuperare / revizuire", type: "review", duration: 30, energy: "low" }],
  Dum: [{ time: "10:00", title: "Sesiune Antrenor AI", type: "voice", duration: 20, energy: "medium" }],
};

const typeStyles: Record<Block["type"], { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  study: { color: "bg-primary/20 text-primary border-primary/30", icon: BookOpen },
  review: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: RefreshCcw },
  practice: { color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: Dumbbell },
  break: { color: "bg-muted text-muted-foreground border-border", icon: Coffee },
  voice: { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: MessageSquare },
};

export default function AIPlannerPage() {
  const [goal, setGoal] = useState("");
  const t = useTranslations("aiPlanner");

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Study Planner
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Brain className="mr-2 h-4 w-4" />{t("explainPlan")}</Button>
          <Button><RefreshCcw className="mr-2 h-4 w-4" />{t("regenerate")}</Button>
        </div>
      </div>

      {/* Why this plan */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">{t("whyThisPlan")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                I front-loaded your deep work Mon/Tue/Thu mornings — that's when your assessment scores are 34% higher. Wednesday is intentionally light because you've averaged 11h/week for 3 weeks and I'm seeing early fatigue signals. Voice sessions land on evenings because speaking practice works better when you're not aiming for accuracy. Your Kubernetes deadline (May 15) drove module sequencing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick optimize */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{t("changeGoal")}</p>
              <p className="text-xs text-muted-foreground">e.g., "I have an exam May 20", "only 30 min/day this week"</p>
            </div>
            <div className="flex flex-1 max-w-md gap-2">
              <input
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder={t("tellMeChanged")}
                className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-sm"
              />
              <Button size="sm">{t("replan")}</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Week Grid */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {Object.entries(week).map(([day, blocks]) => {
          const total = blocks.filter(b => b.type !== "break").reduce((s, b) => s + b.duration, 0);
          return (
            <Card key={day} className="flex flex-col">
              <CardContent className="pt-6 flex-1">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">{day}</h3>
                  <Badge variant="secondary" className="text-xs">{total}m</Badge>
                </div>
                <div className="space-y-2">
                  {blocks.map((b, i) => {
                    const { color, icon: Icon } = typeStyles[b.type];
                    return (
                      <div key={i} className={cn("rounded-lg border p-2.5", color)}>
                        <div className="flex items-center gap-1.5 text-[10px] opacity-80">
                          <Clock className="h-2.5 w-2.5" />
                          <span>{b.time}</span>
                          <span className="ml-auto">{b.duration}m</span>
                        </div>
                        <div className="mt-1 flex items-start gap-1.5">
                          <Icon className="mt-0.5 h-3 w-3 shrink-0" />
                          <p className="text-xs font-medium leading-snug">{b.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Energy Curve */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <Sun className="h-4 w-4 text-amber-400" />
            Your Energy Profile <span className="text-xs font-normal text-muted-foreground">(invatat din 127 sesiuni)</span>
          </h3>
          <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-0.5 md:gap-1">
            {Array.from({ length: 24 }).map((_, h) => {
              const energy = h < 6 || h > 22 ? 10 : h >= 9 && h <= 11 ? 95 : h >= 14 && h <= 16 ? 70 : h >= 19 && h <= 21 ? 55 : 40;
              return (
                <div key={h} className="flex flex-col items-center gap-1">
                  <div className="h-16 w-full rounded-sm bg-muted relative">
                    <div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 rounded-sm",
                        energy > 80 ? "bg-primary" : energy > 50 ? "bg-primary/60" : "bg-primary/30"
                      )}
                      style={{ height: `${energy}%` }}
                    />
                  </div>
                  {h % 3 === 0 && <span className="text-[9px] text-muted-foreground">{h}h</span>}
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Sun className="h-3 w-3 text-amber-400" />Peak: 9–11am</span>
            <span className="flex items-center gap-1"><Moon className="h-3 w-3 text-blue-400" />Low: 2–4pm post-lunch dip</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
