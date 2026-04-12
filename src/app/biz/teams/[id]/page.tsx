"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Users, Plus, Route, Brain, TrendingUp, Target,
  Mail, Award, Clock,
} from "lucide-react";

const teams: Record<string, {
  name: string; lead: string; department: string; members: number; avgProgress: number;
  description: string;
  membersList: { name: string; role: string; progress: number; lastActive: string }[];
  paths: { name: string; assigned: number; completed: number; dueDate: string }[];
  insights: string[];
}> = {
  eng: {
    name: "Engineering", lead: "Sarah Chen", department: "Technology", members: 48, avgProgress: 74,
    description: "Backend, frontend, platform and DevOps engineers.",
    membersList: [
      { name: "Maria Popescu", role: "Senior Backend", progress: 89, lastActive: "2h ago" },
      { name: "Dan Ionescu", role: "Frontend Dev", progress: 72, lastActive: "1h ago" },
      { name: "Alex V.", role: "DevOps Lead", progress: 95, lastActive: "30m ago" },
      { name: "Elena C.", role: "ML Engineer", progress: 68, lastActive: "Yesterday" },
      { name: "Chris M.", role: "Mobile Dev", progress: 54, lastActive: "3h ago" },
    ],
    paths: [
      { name: "Cloud Architecture Fundamentals", assigned: 48, completed: 34, dueDate: "May 15" },
      { name: "Security Best Practices", assigned: 48, completed: 41, dueDate: "Apr 30" },
      { name: "AI/ML for Engineers", assigned: 25, completed: 12, dueDate: "Jun 20" },
    ],
    insights: [
      "Team velocity on AI/ML path is 40% above average — consider expanding to adjacent teams.",
      "3 members risk missing Security path deadline — auto-reminder scheduled.",
      "Flashcard reviews correlate with 28% better assessment scores on this team.",
    ],
  },
  sales: {
    name: "Sales", lead: "Mike Brown", department: "Revenue", members: 32, avgProgress: 61,
    description: "Inside sales, field sales, account management.",
    membersList: [
      { name: "John D.", role: "Enterprise AE", progress: 82, lastActive: "1h ago" },
      { name: "Anna B.", role: "SDR", progress: 45, lastActive: "15m ago" },
      { name: "Carlos R.", role: "Sales Ops", progress: 70, lastActive: "Today" },
    ],
    paths: [
      { name: "Consultative Selling", assigned: 32, completed: 18, dueDate: "May 10" },
      { name: "GDPR for Sales", assigned: 32, completed: 28, dueDate: "Apr 25" },
    ],
    insights: [
      "Team engagement drops on Fridays — schedule content earlier in the week.",
      "GDPR compliance nearly complete — reminder for 4 outstanding members.",
    ],
  },
};

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const { id } = await params;
  const team = teams[id];
  if (!team) notFound();

  return (
    <div className="p-6 lg:p-8">
      <Link href="/biz/teams" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />Back to Teams
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{team.name}</h1>
            <Badge variant="secondary">{team.department}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{team.description}</p>
          <p className="mt-2 text-xs text-muted-foreground">Lead: {team.lead}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Mail className="mr-2 h-4 w-4" />Message All</Button>
          <Button><Plus className="mr-2 h-4 w-4" />Assign Path</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Users className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold">{team.members}</p><p className="text-xs text-muted-foreground">Members</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><TrendingUp className="h-8 w-8 text-green-500" /><div><p className="text-2xl font-bold">{team.avgProgress}%</p><p className="text-xs text-muted-foreground">Avg Progress</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Route className="h-8 w-8 text-blue-400" /><div><p className="text-2xl font-bold">{team.paths.length}</p><p className="text-xs text-muted-foreground">Active Paths</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Award className="h-8 w-8 text-amber-400" /><div><p className="text-2xl font-bold">82</p><p className="text-xs text-muted-foreground">Certifications</p></div></div></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Members */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Members</h2>
            <Card>
              <CardContent className="pt-6 divide-y divide-border/50">
                {team.membersList.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="h-9 w-9 rounded-full bg-primary/10" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.role}</p>
                    </div>
                    <div className="w-32">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{m.progress}%</span>
                        <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{m.lastActive}</span>
                      </div>
                      <div className="mt-1 h-1 rounded-full bg-muted">
                        <div className="h-1 rounded-full bg-primary" style={{ width: `${m.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Paths */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Assigned Learning Paths</h2>
            <div className="space-y-3">
              {team.paths.map((p, i) => {
                const pct = Math.round((p.completed / p.assigned) * 100);
                return (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">Due {p.dueDate}</p>
                        </div>
                        <Badge variant={pct > 80 ? "default" : "secondary"}>{pct}%</Badge>
                      </div>
                      <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{p.completed} / {p.assigned} completed</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Brain className="h-5 w-5 text-primary" />AI Insights
          </h2>
          <div className="space-y-3">
            {team.insights.map((text, i) => (
              <Card key={i}>
                <CardContent className="py-4">
                  <p className="text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
