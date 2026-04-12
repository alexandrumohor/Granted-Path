"use client";
import { useTranslations } from "@/hooks/use-translations";
import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BarChart3, ArrowRight, Brain, TrendingUp, TrendingDown, UserPlus, FileText, ChevronRight } from "lucide-react";

const STUDENTS = [
  { id: "s1", name: "Maria Popescu", progress: 85, lastActive: "Today", xp: 980, trend: "up" },
  { id: "s2", name: "Andrei Marinescu", progress: 72, lastActive: "Today", xp: 750, trend: "up" },
  { id: "s3", name: "Elena Dumitru", progress: 68, lastActive: "Yesterday", xp: 620, trend: "stable" },
  { id: "s4", name: "Alexandru Ion", progress: 45, lastActive: "3 days ago", xp: 380, trend: "down" },
  { id: "s5", name: "Ioana Stan", progress: 92, lastActive: "Today", xp: 1100, trend: "up" },
  { id: "s6", name: "Mihai Radu", progress: 38, lastActive: "5 days ago", xp: 250, trend: "down" },
  { id: "s7", name: "Diana Popa", progress: 61, lastActive: "Today", xp: 540, trend: "stable" },
];

const ASSIGNMENTS = [
  { id: "a1", title: "Python Variables Quiz", due: "Apr 12", submitted: 22, total: 28, avgScore: 78 },
  { id: "a2", title: "Loops Practice Set", due: "Apr 15", submitted: 15, total: 28, avgScore: null },
  { id: "a3", title: "Module 1 Final Test", due: "Apr 20", submitted: 0, total: 28, avgScore: null },
];

export default function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const { id } = use(params);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/edu/classes" className="hover:text-foreground">Classes</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-foreground">Clasa a 10-a A</span>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Clasa a 10-a A</h1><p className="mt-1 text-sm text-muted-foreground">Prof. Ionescu &bull; 28 students</p></div>
        <div className="flex gap-2">
          <Button variant="outline"><UserPlus className="mr-2 h-4 w-4" />Add Student</Button>
          <Button><FileText className="mr-2 h-4 w-4" />New Assignment</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold text-primary">71%</p><p className="text-sm text-muted-foreground">Avg Progress</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold text-green-500">22/28</p><p className="text-sm text-muted-foreground">Active Today</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold">3</p><p className="text-sm text-muted-foreground">Active Assignments</p></CardContent></Card>
      </div>

      {/* AI Insight */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 pt-6">
          <Brain className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary">AI Class Insight</p>
            <p className="text-sm text-muted-foreground mt-1">Alexandru Ion and Mihai Radu are falling behind — they haven&apos;t been active in 3-5 days and their progress is below 50%. Consider reaching out or assigning lighter catch-up exercises.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Students */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Students</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {STUDENTS.sort((a, b) => b.progress - a.progress).map(s => (
                  <Link key={s.id} href={`/edu/students/${s.id}`} className="flex items-center gap-4 rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">{s.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{s.name}</p>
                        {s.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-red-400" />}
                        {s.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-green-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground">Last active: {s.lastActive}</p>
                    </div>
                    <div className="text-right w-20">
                      <p className="text-sm font-semibold">{s.progress}%</p>
                      <div className="mt-1 h-1.5 rounded-full bg-muted"><div className={`h-1.5 rounded-full ${s.progress >= 70 ? "bg-green-500" : s.progress >= 50 ? "bg-primary" : "bg-orange-500"}`} style={{ width: `${s.progress}%` }} /></div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Assignments</h2>
          <div className="space-y-3">
            {ASSIGNMENTS.map(a => (
              <Card key={a.id}>
                <CardContent className="py-4">
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">Due: {a.due}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{a.submitted}/{a.total} submitted</span>
                    {a.avgScore && <Badge variant="secondary">Avg: {a.avgScore}%</Badge>}
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${(a.submitted / a.total) * 100}%` }} /></div>
                </CardContent>
              </Card>
            ))}
            <Link href="/edu/assignments"><Button variant="outline" size="sm" className="w-full"><FileText className="mr-2 h-3.5 w-3.5" />All Assignments</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
