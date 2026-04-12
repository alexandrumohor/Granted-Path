"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Route, Users, Clock, BookOpen, CheckCircle2,
  PlayCircle, Brain, Target, Edit, Send,
} from "lucide-react";

export default async function PathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const { id } = await params;

  const path = {
    id, name: "Cloud Architecture Fundamentals",
    description: "Comprehensive introduction to cloud-native architecture patterns: microservices, containers, orchestration, observability, and cost optimization. Designed for engineers transitioning from monoliths.",
    category: "Technical", duration: "12h", teams: ["Engineering"], enrolled: 48,
    completion: 71, difficulty: "Intermediate", language: "English",
  };

  const modules = [
    { name: "Cloud Fundamentals", lessons: 6, duration: "2h", status: "published" },
    { name: "Containerization with Docker", lessons: 8, duration: "3h", status: "published" },
    { name: "Kubernetes Orchestration", lessons: 10, duration: "4h", status: "published" },
    { name: "Observability & Monitoring", lessons: 5, duration: "2h", status: "published" },
    { name: "Cost Optimization", lessons: 3, duration: "1h", status: "draft" },
  ];

  const metrics = {
    avgTime: "9.2h", completionRate: 71, assessmentAvg: 82, npsScore: 8.4,
  };

  return (
    <div className="p-6 lg:p-8">
      <Link href="/biz/paths" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />Back to Paths
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{path.name}</h1>
            <Badge variant="secondary">{path.category}</Badge>
            <Badge variant="outline">{path.difficulty}</Badge>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{path.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Edit className="mr-2 h-4 w-4" />Edit</Button>
          <Button><Send className="mr-2 h-4 w-4" />Assign</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Users className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold">{path.enrolled}</p><p className="text-xs text-muted-foreground">Enrolled</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><CheckCircle2 className="h-8 w-8 text-green-500" /><div><p className="text-2xl font-bold">{path.completion}%</p><p className="text-xs text-muted-foreground">Completion</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Target className="h-8 w-8 text-amber-400" /><div><p className="text-2xl font-bold">{metrics.assessmentAvg}%</p><p className="text-xs text-muted-foreground">Avg Score</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Clock className="h-8 w-8 text-blue-400" /><div><p className="text-2xl font-bold">{metrics.avgTime}</p><p className="text-xs text-muted-foreground">Avg Time</p></div></div></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Curriculum</h2>
          <div className="space-y-3">
            {modules.map((m, i) => (
              <Card key={i}>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{m.name}</p>
                      {m.status === "draft" && <Badge variant="outline" className="text-[10px]">Draft</Badge>}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{m.lessons} lessons · {m.duration}</p>
                  </div>
                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Brain className="h-5 w-5 text-primary" />Path Analytics
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Completion Rate</span><span className="font-semibold">{metrics.completionRate}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Assessment</span><span className="font-semibold">{metrics.assessmentAvg}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg Time Spent</span><span className="font-semibold">{metrics.avgTime}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">NPS Score</span><span className="font-semibold">{metrics.npsScore}/10</span></div>
            </CardContent>
          </Card>

          <Card className="mt-4 border-primary/20">
            <CardContent className="pt-6">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><Brain className="h-4 w-4 text-primary" />AI Recommendation</p>
              <p className="text-xs text-muted-foreground">
                Module 3 (Kubernetes) has a 34% drop-off rate. Consider adding a prerequisite check or splitting into two shorter modules. Flashcard adoption on this path is low — auto-schedule 3×/week reviews to boost retention.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
