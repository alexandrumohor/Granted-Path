"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Mail, Brain, Award, Clock, TrendingUp, Target,
  CheckCircle2, AlertCircle, BookOpen,
} from "lucide-react";

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const { id } = await params;

  const employee = {
    id, name: "Maria Popescu", email: "maria.p@acme.com", role: "Senior Backend",
    team: "Engineering", joinedDate: "Jan 15, 2024", manager: "Sarah Chen",
    overall: 89, totalHours: 142, streak: 18, certifications: 7,
  };

  const skills = [
    { name: "Python", level: 92, trend: "up" },
    { name: "System Design", level: 78, trend: "up" },
    { name: "SQL", level: 85, trend: "steady" },
    { name: "Kubernetes", level: 61, trend: "up" },
    { name: "GraphQL", level: 54, trend: "steady" },
  ];

  const activePaths = [
    { name: "Cloud Architecture Fundamentals", progress: 68, dueDate: "May 15" },
    { name: "Security Best Practices", progress: 85, dueDate: "Apr 30" },
    { name: "AI/ML for Engineers", progress: 42, dueDate: "Jun 20" },
  ];

  const aiInsight = {
    strengths: ["Fast learner on backend topics", "Consistent daily engagement", "Strong on practical exercises"],
    weaknesses: ["Skips flashcard reviews — retention may suffer long-term", "Avoids video content"],
    recommendation: "Maria shows strong momentum on technical paths. Consider assigning her as a peer mentor for the AI/ML cohort — teaching will reinforce her own learning and accelerate team progress.",
  };

  return (
    <div className="p-6 lg:p-8">
      <Link href="/biz/employees" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />Back to Employees
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10" />
          <div>
            <h1 className="text-2xl font-bold">{employee.name}</h1>
            <p className="text-sm text-muted-foreground">{employee.role} · {employee.team}</p>
            <p className="mt-1 text-xs text-muted-foreground">{employee.email} · Joined {employee.joinedDate} · Manager: {employee.manager}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Mail className="mr-2 h-4 w-4" />Message</Button>
          <Button>Assign Path</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><TrendingUp className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold">{employee.overall}%</p><p className="text-xs text-muted-foreground">Overall Progress</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Clock className="h-8 w-8 text-blue-400" /><div><p className="text-2xl font-bold">{employee.totalHours}h</p><p className="text-xs text-muted-foreground">Total Learning</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Target className="h-8 w-8 text-green-500" /><div><p className="text-2xl font-bold">{employee.streak}</p><p className="text-xs text-muted-foreground">Day Streak</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Award className="h-8 w-8 text-amber-400" /><div><p className="text-2xl font-bold">{employee.certifications}</p><p className="text-xs text-muted-foreground">Certifications</p></div></div></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Skills */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Skill Matrix</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-muted-foreground">{s.level}%</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Active Paths */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Active Learning Paths</h2>
            <div className="space-y-3">
              {activePaths.map((p, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">Due {p.dueDate}</p>
                        </div>
                      </div>
                      <Badge variant={p.progress > 75 ? "default" : "secondary"}>{p.progress}%</Badge>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted">
                      <div className="h-1.5 rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assessment */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Brain className="h-5 w-5 text-primary" />AI Assessment
          </h2>
          <Card className="mb-4 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{aiInsight.recommendation}</p>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4 text-green-500" />Strengths</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {aiInsight.strengths.map((s, i) => <li key={i}>· {s}</li>)}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold"><AlertCircle className="h-4 w-4 text-orange-500" />Areas to Improve</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {aiInsight.weaknesses.map((w, i) => <li key={i}>· {w}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
