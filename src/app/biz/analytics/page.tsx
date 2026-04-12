"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Brain, Users, Award, Clock, DollarSign } from "lucide-react";

const teamData = [
  { name: "Engineering", progress: 74, engagement: 88, completion: 71 },
  { name: "Sales", progress: 61, engagement: 72, completion: 58 },
  { name: "Operations", progress: 82, engagement: 91, completion: 85 },
  { name: "HR", progress: 55, engagement: 65, completion: 48 },
  { name: "Marketing", progress: 69, engagement: 78, completion: 66 },
  { name: "Finance", progress: 78, engagement: 82, completion: 74 },
];

const skillsMatrix = [
  { skill: "Technical", eng: 85, sales: 30, ops: 55, hr: 20, mkt: 45, fin: 50 },
  { skill: "Compliance", eng: 90, sales: 88, ops: 95, hr: 92, mkt: 85, fin: 96 },
  { skill: "Leadership", eng: 45, sales: 62, ops: 70, hr: 78, mkt: 58, fin: 65 },
  { skill: "Communication", eng: 55, sales: 88, ops: 72, hr: 85, mkt: 90, fin: 68 },
];

const aiRecs = [
  { title: "Engagement gap on HR team", detail: "HR engagement is 23pts below company average. Root cause analysis suggests content misalignment — schedule a 15-min intake interview with the HR lead to realign path selection." },
  { title: "ROI on Security Awareness", detail: "Security Awareness 2026 completion saved an estimated $147k in potential breach costs (based on industry baseline). Consider expanding to quarterly refreshers." },
  { title: "Sales upskilling opportunity", detail: "Top 5 sales reps who completed Consultative Selling closed 28% more deals in the following quarter. Expand cohort from 32 to all 45 sales-facing roles." },
];

export default function BizAnalyticsPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const kpis = [
    { label: "Total Learning Hours", value: "4,287", icon: Clock, change: "+12%" },
    { label: "Completion Rate", value: "68%", icon: TrendingUp, change: "+5%" },
    { label: "Active Learners", value: "184", icon: Users, change: "+8%" },
    { label: "Est. ROI", value: "$312k", icon: DollarSign, change: "+21%" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Company-wide learning performance · Last 30 days</p>
      </div>

      {/* KPIs */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <p className="text-2xl font-bold">{k.value}</p>
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-500 text-xs">{k.change}</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Team Comparison */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Team Comparison</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {teamData.map((t, i) => (
                <div key={i}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-muted-foreground">Progress {t.progress}% · Engagement {t.engagement}%</span>
                  </div>
                  <div className="grid gap-1">
                    <div className="h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${t.progress}%` }} /></div>
                    <div className="h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-blue-400" style={{ width: `${t.engagement}%` }} /></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Matrix */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Skills Matrix</h2>
        <Card>
          <CardContent className="pt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-left text-xs uppercase text-muted-foreground">
                  <th className="pb-2 pr-4">Skill</th>
                  <th className="pb-2 pr-2">Eng</th>
                  <th className="pb-2 pr-2">Sales</th>
                  <th className="pb-2 pr-2">Ops</th>
                  <th className="pb-2 pr-2">HR</th>
                  <th className="pb-2 pr-2">Mkt</th>
                  <th className="pb-2">Fin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {skillsMatrix.map((s, i) => (
                  <tr key={i}>
                    <td className="py-3 pr-4 font-medium">{s.skill}</td>
                    {(["eng", "sales", "ops", "hr", "mkt", "fin"] as const).map(k => {
                      const v = s[k];
                      const color = v >= 80 ? "bg-green-500/20 text-green-400" : v >= 60 ? "bg-blue-500/20 text-blue-400" : v >= 40 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400";
                      return <td key={k} className="py-3 pr-2"><span className={`inline-block rounded px-2 py-0.5 text-xs ${color}`}>{v}</span></td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Brain className="h-5 w-5 text-primary" />AI Recommendations
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {aiRecs.map((r, i) => (
            <Card key={i} className="border-primary/20">
              <CardContent className="pt-6">
                <p className="font-semibold">{r.title}</p>
                <p className="mt-2 text-xs text-muted-foreground">{r.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
