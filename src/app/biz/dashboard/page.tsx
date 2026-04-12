"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users, UserCircle, TrendingUp, Award, Brain, ArrowRight,
  AlertTriangle, Check, Clock, Target, Route, ShieldCheck, BarChart3,
} from "lucide-react";

const mock = {
  company: "Acme Corp",
  totalEmployees: 247,
  activeThisWeek: 184,
  avgCompletion: 68,
  certifications: 412,
  teams: [
    { id: "eng", name: "Engineering", members: 48, avgProgress: 74, lead: "Sarah Chen" },
    { id: "sales", name: "Sales", members: 32, avgProgress: 61, lead: "Mike Brown" },
    { id: "ops", name: "Operations", members: 28, avgProgress: 82, lead: "Ana Popescu" },
    { id: "hr", name: "Human Resources", members: 12, avgProgress: 55, lead: "James K." },
  ],
  recentActivity: [
    { user: "Maria Popescu", action: "completed", target: "Advanced Python", time: "12 min ago" },
    { user: "Dan Ionescu", action: "earned certification", target: "Data Privacy GDPR", time: "1h ago" },
    { user: "Elena V.", action: "started", target: "Leadership Fundamentals", time: "2h ago" },
    { user: "Chris M.", action: "completed", target: "Security Awareness", time: "3h ago" },
  ],
  aiInsights: [
    { type: "warning", text: "12 employees have compliance training expiring within 14 days." },
    { type: "insight", text: "Sales team shows 34% better retention on flashcard-based review vs video-only." },
    { type: "success", text: "Engineering team ahead of Q2 skill-up plan by 18 days." },
  ],
  quickStats: [
    { label: "Compliance Rate", value: "94%", icon: ShieldCheck, color: "text-green-500" },
    { label: "Active Paths", value: "23", icon: Route, color: "text-primary" },
    { label: "Avg Time/Day", value: "32 min", icon: Clock, color: "text-blue-400" },
    { label: "Goals Met", value: "87%", icon: Target, color: "text-purple-400" },
  ],
};

export default function BizDashboardPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{mock.company}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Business Dashboard — Enterprise View</p>
        </div>
        <Link href="/biz/paths">
          <Button><Route className="mr-2 h-4 w-4" />Create Learning Path</Button>
        </Link>
      </div>

      {/* Top Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><UserCircle className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold">{mock.totalEmployees}</p><p className="text-xs text-muted-foreground">Total Employees</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><TrendingUp className="h-8 w-8 text-green-500" /><div><p className="text-2xl font-bold">{mock.activeThisWeek}</p><p className="text-xs text-muted-foreground">Active This Week</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Brain className="h-8 w-8 text-blue-400" /><div><p className="text-2xl font-bold">{mock.avgCompletion}%</p><p className="text-xs text-muted-foreground">Avg Completion</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Award className="h-8 w-8 text-amber-400" /><div><p className="text-2xl font-bold">{mock.certifications}</p><p className="text-xs text-muted-foreground">Certifications Held</p></div></div></CardContent></Card>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {mock.quickStats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i}>
              <CardContent className="flex items-center gap-3 py-4">
                <Icon className={`h-5 w-5 ${s.color}`} />
                <div className="flex-1"><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-sm font-semibold">{s.value}</p></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Teams */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Teams</h2>
              <Link href="/biz/teams" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {mock.teams.map(t => (
                <Link key={t.id} href={`/biz/teams/${t.id}`}>
                  <Card className="transition-all hover:border-primary/30">
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{t.name}</p>
                          <Badge variant="secondary" className="text-xs">{t.members} members</Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Lead: {t.lead}</p>
                      </div>
                      <div className="w-24 text-right">
                        <p className="text-sm font-semibold">{t.avgProgress}%</p>
                        <div className="mt-1 h-1.5 rounded-full bg-muted">
                          <div className="h-1.5 rounded-full bg-primary" style={{ width: `${t.avgProgress}%` }} />
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {mock.recentActivity.map((a, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10" />
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{a.user}</span>{" "}
                            <span className="text-muted-foreground">{a.action}</span>{" "}
                            <span className="font-medium">{a.target}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{a.time}</p>
                        </div>
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
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Brain className="h-5 w-5 text-primary" />AI Insights
          </h2>
          <div className="space-y-3">
            {mock.aiInsights.map((insight, i) => (
              <Card
                key={i}
                className={
                  insight.type === "warning"
                    ? "border-orange-500/20"
                    : insight.type === "success"
                    ? "border-green-500/20"
                    : ""
                }
              >
                <CardContent className="flex gap-3 py-4">
                  {insight.type === "warning" ? (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                  ) : insight.type === "success" ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  ) : (
                    <Brain className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  )}
                  <p className="text-sm text-muted-foreground">{insight.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/biz/employees"><Button variant="outline" className="w-full justify-start"><UserCircle className="mr-2 h-4 w-4" />Manage Employees</Button></Link>
              <Link href="/biz/compliance"><Button variant="outline" className="w-full justify-start"><ShieldCheck className="mr-2 h-4 w-4" />Compliance Report</Button></Link>
              <Link href="/biz/analytics"><Button variant="outline" className="w-full justify-start"><BarChart3 className="mr-2 h-4 w-4" />View Analytics</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}