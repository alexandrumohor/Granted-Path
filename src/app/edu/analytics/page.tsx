"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, TrendingUp, Brain, BookOpen, Clock } from "lucide-react";

const CLASS_STATS = [
  { name: "Clasa a 10-a A", students: 28, avgProgress: 71, avgScore: 78, activeRate: 89 },
  { name: "Clasa a 10-a B", students: 26, avgProgress: 58, avgScore: 65, activeRate: 72 },
  { name: "Clasa a 11-a A", students: 30, avgProgress: 65, avgScore: 71, activeRate: 80 },
  { name: "Clasa a 11-a B", students: 27, avgProgress: 52, avgScore: 60, activeRate: 63 },
  { name: "Clasa a 12-a A", students: 25, avgProgress: 78, avgScore: 82, activeRate: 92 },
];

const TOPIC_PERFORMANCE = [
  { topic: "Python Basics", avgScore: 82, difficulty: "Easy" },
  { topic: "Loops & Iteration", avgScore: 65, difficulty: "Medium" },
  { topic: "Functions", avgScore: 58, difficulty: "Hard" },
  { topic: "Data Types", avgScore: 75, difficulty: "Easy" },
  { topic: "String Operations", avgScore: 68, difficulty: "Medium" },
];

const AI_INSIGHTS = [
  "Students in Class 10-B struggle most with loops — consider adding visual loop diagrams.",
  "Flashcard reviews improved quiz scores by 23% across all classes.",
  "Morning study sessions (before 10am) show 15% higher retention than evening sessions.",
  "5 students haven't logged in for 7+ days: 2 from Class 10-B, 3 from Class 11-B.",
];

export default function EduAnalyticsPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6 text-primary" />Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">School-wide learning analytics and AI insights.</p>
      </div>

      {/* Overview */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="pt-6"><Users className="h-5 w-5 text-primary mb-2" /><p className="text-2xl font-bold">136</p><p className="text-xs text-muted-foreground">Total Students</p></CardContent></Card>
        <Card><CardContent className="pt-6"><TrendingUp className="h-5 w-5 text-green-500 mb-2" /><p className="text-2xl font-bold">65%</p><p className="text-xs text-muted-foreground">Avg Progress</p></CardContent></Card>
        <Card><CardContent className="pt-6"><BookOpen className="h-5 w-5 text-blue-400 mb-2" /><p className="text-2xl font-bold">74%</p><p className="text-xs text-muted-foreground">Avg Quiz Score</p></CardContent></Card>
        <Card><CardContent className="pt-6"><Clock className="h-5 w-5 text-purple-400 mb-2" /><p className="text-2xl font-bold">79%</p><p className="text-xs text-muted-foreground">Active Rate (7d)</p></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Class comparison */}
        <Card>
          <CardHeader><CardTitle className="text-base">Class Performance</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {CLASS_STATS.map(c => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{c.name}</span>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>Progress: {c.avgProgress}%</span>
                    <span>Score: {c.avgScore}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${c.avgProgress}%` }} /></div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Topic difficulty */}
        <Card>
          <CardHeader><CardTitle className="text-base">Topic Performance</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {TOPIC_PERFORMANCE.sort((a, b) => a.avgScore - b.avgScore).map(t => (
              <div key={t.topic}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2"><span>{t.topic}</span><Badge variant="outline" className="text-xs">{t.difficulty}</Badge></div>
                  <span className={`font-medium ${t.avgScore < 65 ? "text-orange-500" : ""}`}>{t.avgScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted"><div className={`h-2 rounded-full ${t.avgScore >= 75 ? "bg-green-500" : t.avgScore >= 65 ? "bg-primary" : "bg-orange-500"}`} style={{ width: `${t.avgScore}%` }} /></div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Brain className="h-4 w-4 text-primary" />AI Insights & Recommendations</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {AI_INSIGHTS.map((insight, i) => (
                <div key={i} className="rounded-lg bg-primary/5 border border-primary/10 p-4 text-sm text-muted-foreground">{insight}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
