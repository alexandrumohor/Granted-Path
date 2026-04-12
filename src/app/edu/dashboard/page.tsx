"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, BarChart3, Brain, ArrowRight, TrendingUp, Clock, AlertTriangle, Check } from "lucide-react";

const mock = {
  school: "Liceul Teoretic Example",
  totalStudents: 156,
  activeToday: 89,
  avgProgress: 62,
  classes: [
    { id: "1", name: "Clasa a 10-a A", students: 28, avgProgress: 71, teacher: "Prof. Ionescu" },
    { id: "2", name: "Clasa a 10-a B", students: 26, avgProgress: 58, teacher: "Prof. Popescu" },
    { id: "3", name: "Clasa a 11-a A", students: 30, avgProgress: 65, teacher: "Prof. Ionescu" },
  ],
  recentSubmissions: [
    { student: "Maria P.", assignment: "Python Quiz Module 2", score: 92, time: "10 min ago" },
    { student: "Andrei M.", assignment: "Matematica Test 3", score: 78, time: "25 min ago" },
    { student: "Elena D.", assignment: "English Grammar", score: 85, time: "1h ago" },
  ],
  aiInsights: [
    { type: "warning", text: "5 students in Class 10-B haven't logged in for 7+ days." },
    { type: "insight", text: "Students who completed flashcard reviews scored 23% higher on quizzes." },
    { type: "success", text: "Class 11-A finished the Python module ahead of schedule." },
  ],
};

export default function EduDashboardPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{mock.school}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Education Dashboard — Teacher View</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Users className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold">{mock.totalStudents}</p><p className="text-xs text-muted-foreground">Total Students</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><TrendingUp className="h-8 w-8 text-green-500" /><div><p className="text-2xl font-bold">{mock.activeToday}</p><p className="text-xs text-muted-foreground">Active Today</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><BarChart3 className="h-8 w-8 text-blue-400" /><div><p className="text-2xl font-bold">{mock.avgProgress}%</p><p className="text-xs text-muted-foreground">Avg Progress</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><BookOpen className="h-8 w-8 text-purple-400" /><div><p className="text-2xl font-bold">{mock.classes.length}</p><p className="text-xs text-muted-foreground">Active Classes</p></div></div></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Classes */}
          <div>
            <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold">Classes</h2><Link href="/edu/classes" className="text-sm text-primary hover:underline">View all</Link></div>
            <div className="space-y-3">
              {mock.classes.map(c => (
                <Link key={c.id} href={`/edu/classes/${c.id}`}>
                  <Card className="hover:border-primary/30 transition-all">
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2"><p className="font-medium">{c.name}</p><Badge variant="secondary" className="text-xs">{c.students} students</Badge></div>
                        <p className="text-xs text-muted-foreground mt-1">{c.teacher}</p>
                      </div>
                      <div className="text-right w-20">
                        <p className="text-sm font-semibold">{c.avgProgress}%</p>
                        <div className="mt-1 h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${c.avgProgress}%` }} /></div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Submissions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Submissions</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {mock.recentSubmissions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{s.student}</p>
                        <p className="text-xs text-muted-foreground">{s.assignment}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={s.score >= 80 ? "default" : "secondary"}>{s.score}%</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{s.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Brain className="h-5 w-5 text-primary" />AI Insights</h2>
          <div className="space-y-3">
            {mock.aiInsights.map((insight, i) => (
              <Card key={i} className={insight.type === "warning" ? "border-orange-500/20" : insight.type === "success" ? "border-green-500/20" : ""}>
                <CardContent className="py-4 flex gap-3">
                  {insight.type === "warning" ? <AlertTriangle className="h-4 w-4 shrink-0 text-orange-500 mt-0.5" /> : insight.type === "success" ? <Check className="h-4 w-4 shrink-0 text-green-500 mt-0.5" /> : <Brain className="h-4 w-4 shrink-0 text-primary mt-0.5" />}
                  <p className="text-sm text-muted-foreground">{insight.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/edu/classes"><Button variant="outline" className="w-full justify-start"><Users className="mr-2 h-4 w-4" />Manage Classes</Button></Link>
              <Link href="/edu/assignments"><Button variant="outline" className="w-full justify-start"><BookOpen className="mr-2 h-4 w-4" />Create Assignment</Button></Link>
              <Link href="/edu/analytics"><Button variant="outline" className="w-full justify-start"><BarChart3 className="mr-2 h-4 w-4" />View Analytics</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
