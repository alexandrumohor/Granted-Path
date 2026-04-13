"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, MessageSquare, Dumbbell, Target, Clock, Flame, Zap, Brain, ChevronRight } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function DashboardPage() {
  const { data: session } = useSession();
  const t = useTranslations("dashboard");
  const tn = useTranslations("nav");
  const name = session?.user?.name?.split(" ")[0] || "User";

  const activeCourse = { title: "Python Fundamentals", module: "Control Flow", lesson: "for si while loops", progress: 45, timeLeft: "12 min", slug: "python-fundamentals" };
  const courses = [
    { title: "English Conversation B2", progress: 62, lesson: "Work Situations", time: "8 min", slug: "english-conversation-b2" },
    { title: "Project Management Basics", progress: 18, lesson: "Work breakdown structure", time: "15 min", slug: "project-management-basics" },
  ];
  const weekStats = { studied: 96, goal: 150, streak: 12, xp: 320 };
  const goals = [
    { title: "Termina Python basics", deadline: "15 Mai", progress: 45 },
    { title: "BAC Matematica", deadline: "25 Iun", progress: 12 },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-[1200px] mx-auto">

      {/* ── GREETING ── */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-[-0.02em]">{t("welcome")} {name}</h1>
        <p className="mt-1 text-[14px] text-muted-foreground">{t("keepMomentum")}</p>
      </div>

      {/* ══════ HERO — PRIORITY ZONE ══════ */}
      <div className="rounded-xl border border-border bg-card p-6 lg:p-8 mb-6" style={{boxShadow:"var(--shadow-card)"}}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-[13px] font-medium text-primary">{t("aiRecommendation")}</span>
            </div>
            <h2 className="text-[20px] font-semibold">{activeCourse.title}</h2>
            <p className="mt-1 text-[14px] text-muted-foreground">
              {activeCourse.module} → <span className="text-foreground font-medium">{activeCourse.lesson}</span>
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1 max-w-[300px]">
                <div className="flex items-center justify-between text-[13px] mb-1.5">
                  <span className="text-muted-foreground">{t("progress" as string) || "Progres"}</span>
                  <span className="font-semibold">{activeCourse.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary transition-all" style={{width:`${activeCourse.progress}%`}} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{activeCourse.timeLeft}</span>
              </div>
            </div>
          </div>
          <Link href={`/learn/${activeCourse.slug}`}>
            <Button className="h-11 px-6 text-[15px] shrink-0">
              Continua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* ══════ MAIN GRID ══════ */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

        {/* ── LEFT 70% ── */}
        <div className="space-y-6">

          {/* Active Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-semibold">{t("activeCourses")}</h3>
              <Link href="/learn" className="text-[13px] text-primary hover:underline">{tn("learn")} →</Link>
            </div>
            <div className="space-y-3">
              {courses.map((c, i) => (
                <Link key={i} href={`/learn/${c.slug}`}>
                  <div className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all duration-150 hover:translate-y-[-1px] flex items-center gap-4" style={{boxShadow:"var(--shadow-card)"}}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium truncate">{c.title}</p>
                      <p className="text-[12px] text-muted-foreground mt-0.5">Urmatoarea: {c.lesson}</p>
                    </div>
                    <div className="w-28 shrink-0 hidden sm:block">
                      <div className="flex items-center justify-between text-[12px] mb-1">
                        <span className="text-muted-foreground">{c.progress}%</span>
                        <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3"/>{c.time}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-primary" style={{width:`${c.progress}%`}} />
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div>
            <h3 className="text-[16px] font-semibold mb-4">{t("weekProgress")}</h3>
            <div className="rounded-xl border border-border bg-card p-5" style={{boxShadow:"var(--shadow-card)"}}>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-[20px] font-bold">{weekStats.studied}<span className="text-[13px] font-normal text-muted-foreground">m</span></p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">/ {weekStats.goal}m</p>
                  <div className="mt-2 h-1 rounded-full bg-muted mx-auto max-w-[60px]">
                    <div className="h-1 rounded-full bg-primary" style={{width:`${Math.round(weekStats.studied/weekStats.goal*100)}%`}} />
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="text-[20px] font-bold">{weekStats.streak}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t("streak")}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-[20px] font-bold">{weekStats.xp}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">XP</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-[20px] font-bold">7</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Lectii</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT 30% ── */}
        <div className="space-y-6">

          {/* Quick Actions */}
          <div>
            <h3 className="text-[16px] font-semibold mb-4">{t("quickActions")}</h3>
            <div className="space-y-2">
              <Link href="/learn">
                <Button variant="outline" className="w-full h-11 justify-start text-[14px] font-medium">
                  <BookOpen className="mr-3 h-4 w-4 text-primary" />
                  {t("startLesson")}
                </Button>
              </Link>
              <Link href="/practice">
                <Button variant="outline" className="w-full h-11 justify-start text-[14px] font-medium">
                  <Dumbbell className="mr-3 h-4 w-4 text-primary" />
                  {t("practiceExercise")}
                </Button>
              </Link>
              <Link href="/ai-chat">
                <Button variant="outline" className="w-full h-11 justify-start text-[14px] font-medium">
                  <MessageSquare className="mr-3 h-4 w-4 text-primary" />
                  {t("openAIChat")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Goals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-semibold">{t("goals")}</h3>
              <Link href="/goals" className="text-[13px] text-primary hover:underline">Vezi tot</Link>
            </div>
            <div className="space-y-3">
              {goals.map((g, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4" style={{boxShadow:"var(--shadow-card)"}}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-2.5">
                      <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[13px] font-medium">{g.title}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{g.deadline}</p>
                      </div>
                    </div>
                    <span className="text-[13px] font-semibold">{g.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted">
                    <div className="h-1.5 rounded-full bg-primary" style={{width:`${g.progress}%`}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
