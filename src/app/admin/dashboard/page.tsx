"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users, DollarSign, Brain, Activity, TrendingUp, TrendingDown,
  AlertTriangle, Check, Server, Database, Zap, CreditCard,
} from "lucide-react";

const kpis = [
  { label: "MRR", value: "€47,830", change: "+12.4%", trend: "up", icon: DollarSign, color: "text-green-500" },
  { label: "Total Users", value: "28,147", change: "+8.2%", trend: "up", icon: Users, color: "text-primary" },
  { label: "Active (DAU)", value: "9,482", change: "+3.1%", trend: "up", icon: Activity, color: "text-blue-400" },
  { label: "AI Spend / day", value: "$284", change: "-5.8%", trend: "down", icon: Brain, color: "text-purple-400" },
];

const revenueBreakdown = [
  { plan: "Individual Starter", users: 3240, mrr: 32400 },
  { plan: "Individual Pro", users: 1820, mrr: 18200 },
  { plan: "Individual Master", users: 340, mrr: 20400 },
  { plan: "Education", seats: 4820, mrr: 24100 },
  { plan: "Business Starter", seats: 580, mrr: 6960 },
  { plan: "Business Growth", seats: 1240, mrr: 11160 },
  { plan: "Business Enterprise", seats: 215, mrr: 1290 },
];

const health = [
  { name: "API (Vercel)", status: "operational", latency: "142ms" },
  { name: "PostgreSQL (Neon)", status: "operational", latency: "8ms" },
  { name: "Redis (Upstash)", status: "operational", latency: "3ms" },
  { name: "Anthropic API", status: "operational", latency: "1.2s" },
  { name: "Stripe", status: "operational", latency: "184ms" },
  { name: "Resend Email", status: "degraded", latency: "2.8s" },
];

const recentEvents = [
  { type: "signup", text: "New organization: TechCorp SRL (Business Growth, 48 seats)", time: "3m ago" },
  { type: "payment", text: "Charge €2,480 — TechCorp SRL invoice #INV-2026-04-142", time: "3m ago" },
  { type: "alert", text: "AI cost alert: daily spend 18% above forecast", time: "22m ago" },
  { type: "support", text: "Ticket #8412 marked urgent — billing issue escalated", time: "45m ago" },
  { type: "deploy", text: "Deployment successful: commit 8a3f2c1 to production", time: "1h ago" },
  { type: "signup", text: "New education org: Liceul Teoretic Iasi (82 seats)", time: "2h ago" },
];

const eventStyles: Record<string, { icon: typeof Check; color: string }> = {
  signup: { icon: Users, color: "text-primary" },
  payment: { icon: CreditCard, color: "text-green-500" },
  alert: { icon: AlertTriangle, color: "text-orange-500" },
  support: { icon: AlertTriangle, color: "text-red-500" },
  deploy: { icon: Check, color: "text-blue-400" },
};

export default function AdminDashboardPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const totalMrr = revenueBreakdown.reduce((s, p) => s + p.mrr, 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Platform Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time platform metrics and system health</p>
        </div>
        <Badge className="bg-green-500/20 text-green-500">
          <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          All systems nominal
        </Badge>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          const Trend = k.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center justify-between">
                  <Icon className={`h-8 w-8 ${k.color}`} />
                  <div className={`flex items-center gap-1 text-xs font-semibold ${k.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    <Trend className="h-3 w-3" />
                    {k.change}
                  </div>
                </div>
                <p className="text-2xl font-bold">{k.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{k.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Revenue Breakdown */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Revenue Breakdown</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {revenueBreakdown.map((r, i) => {
                    const pct = (r.mrr / totalMrr) * 100;
                    return (
                      <div key={i}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-medium">{r.plan}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">
                              {"users" in r ? `${r.users} users` : `${r.seats} seats`}
                            </span>
                            <span className="font-semibold w-20 text-right">€{r.mrr.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted">
                          <div className="h-1.5 rounded-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="text-sm font-semibold">Total MRR</span>
                  <span className="text-lg font-bold">€{totalMrr.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Events */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Recent Events</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {recentEvents.map((e, i) => {
                    const style = eventStyles[e.type] || { icon: Activity, color: "text-muted-foreground" };
                    const Icon = style.icon;
                    return (
                      <div key={i} className="flex items-start gap-3 px-6 py-3">
                        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${style.color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{e.text}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{e.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Health */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Server className="h-5 w-5 text-primary" />System Health
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {health.map((h, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className={
                        "h-2 w-2 rounded-full " +
                        (h.status === "operational" ? "bg-green-500" : h.status === "degraded" ? "bg-amber-500" : "bg-red-500")
                      } />
                      <span className="text-sm">{h.name}</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{h.latency}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-4">
            <CardContent className="pt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground flex items-center gap-2"><Brain className="h-3.5 w-3.5" />Tokens today</span><span className="font-semibold">18.4M</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground flex items-center gap-2"><Zap className="h-3.5 w-3.5" />AI requests</span><span className="font-semibold">42,180</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground flex items-center gap-2"><Database className="h-3.5 w-3.5" />DB size</span><span className="font-semibold">14.2 GB</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground flex items-center gap-2"><Activity className="h-3.5 w-3.5" />Uptime 30d</span><span className="font-semibold">99.97%</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
