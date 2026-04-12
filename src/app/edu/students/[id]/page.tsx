"use client";
import { useTranslations } from "@/hooks/use-translations";
import { use } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Brain, BookOpen, Dumbbell, TrendingUp, Clock, Target, ChevronRight, MessageSquare } from "lucide-react";

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const { id } = use(params);

  const student = {
    name: "Maria Popescu", class: "Clasa a 10-a A", progress: 85, xp: 980, level: 7,
    lastActive: "Today, 10:30", streak: 8, totalHours: 24,
    courses: [
      { name: "Python Fundamentals", progress: 85, score: 88 },
      { name: "Digital Marketing 101", progress: 42, score: 72 },
    ],
    recentScores: [
      { assignment: "Python Variables Quiz", score: 92, date: "Apr 10" },
      { assignment: "Loops Practice", score: 78, date: "Apr 8" },
      { assignment: "Data Types Test", score: 95, date: "Apr 5" },
    ],
    strengths: ["Variables & Data Types", "Conditional Logic", "String Operations"],
    weaknesses: ["Loops & Iteration", "Functions"],
    aiInsight: "Maria excels at conceptual understanding but struggles with practical loop exercises. Recommend more hands-on coding practice with guided hints.",
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/edu/classes" className="hover:text-foreground">Classes</Link><ChevronRight className="h-3.5 w-3.5" />
        <Link href="/edu/classes/1" className="hover:text-foreground">Clasa a 10-a A</Link><ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{student.name}</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">{student.name.charAt(0)}</div>
        <div>
          <h1 className="text-2xl font-bold">{student.name}</h1>
          <p className="text-sm text-muted-foreground">{student.class} &bull; Level {student.level} &bull; {student.xp} XP</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-primary">{student.progress}%</p><p className="text-xs text-muted-foreground">Overall Progress</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold">{student.streak}</p><p className="text-xs text-muted-foreground">Day Streak</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold">{student.totalHours}h</p><p className="text-xs text-muted-foreground">Total Study Time</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><p className="text-2xl font-bold text-green-500">{student.lastActive}</p><p className="text-xs text-muted-foreground">Last Active</p></CardContent></Card>
      </div>

      {/* AI Insight */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 pt-6">
          <Brain className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div><p className="text-sm font-medium text-primary">AI Student Insight</p><p className="text-sm text-muted-foreground mt-1">{student.aiInsight}</p></div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Courses */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" />Enrolled Courses</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {student.courses.map(c => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1"><span className="font-medium">{c.name}</span><span>{c.progress}%</span></div>
                <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${c.progress}%` }} /></div>
                <p className="text-xs text-muted-foreground mt-1">Avg quiz score: {c.score}%</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Scores */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Dumbbell className="h-4 w-4 text-primary" />Recent Scores</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {student.recentScores.map(s => (
              <div key={s.assignment} className="flex items-center justify-between">
                <div><p className="text-sm font-medium">{s.assignment}</p><p className="text-xs text-muted-foreground">{s.date}</p></div>
                <Badge variant={s.score >= 80 ? "default" : "secondary"}>{s.score}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Strengths & Weaknesses */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4 text-green-500" />Strengths</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">{student.strengths.map(s => <Badge key={s} variant="outline" className="text-green-500 border-green-500/30">{s}</Badge>)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Target className="h-4 w-4 text-orange-500" />Needs Improvement</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">{student.weaknesses.map(w => <Badge key={w} variant="outline" className="text-orange-500 border-orange-500/30">{w}</Badge>)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
