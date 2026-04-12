"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain, Zap, DollarSign, AlertTriangle, TrendingUp,
  Activity, CheckCircle2, XCircle, Clock,
} from "lucide-react";

const summary = {
  tokensToday: 18.4,
  requestsToday: 42180,
  costToday: 284,
  avgLatency: 1.2,
  errorRate: 0.4,
  qualityScore: 92,
};

const modelBreakdown = [
  { name: "claude-opus-4-6", usage: 45, cost: 128, tokens: 8.2, quality: 94 },
  { name: "claude-sonnet-4-6", usage: 38, cost: 102, tokens: 7.1, quality: 91 },
  { name: "claude-haiku-4-5", usage: 17, cost: 54, tokens: 3.1, quality: 88 },
];

const featureUsage = [
  { feature: "AI Chat", requests: 18420, avgTokens: 1240, cost: 142, latency: "0.8s" },
  { feature: "Lesson Tutor", requests: 8210, avgTokens: 2840, cost: 68, latency: "1.4s" },
  { feature: "Voice Tutor", requests: 4820, avgTokens: 1680, cost: 34, latency: "2.1s" },
  { feature: "Exam Predictor", requests: 2840, avgTokens: 4200, cost: 22, latency: "3.2s" },
  { feature: "AI Coach", requests: 1840, avgTokens: 3800, cost: 12, latency: "2.8s" },
  { feature: "Content Generation", requests: 6050, avgTokens: 5600, cost: 6, latency: "4.1s" },
];

const alerts = [
  { type: "warning", text: "Daily AI spend 18% above forecast ($284 vs $240 budget)", time: "22m ago" },
  { type: "info", text: "Voice Tutor latency P95 above 3s — monitor closely", time: "1h ago" },
  { type: "success", text: "Quality score on AI Chat improved to 94% (from 91%)", time: "4h ago" },
];

export default function AdminAIMonitoringPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Monitoring</h1>
          <p className="mt-1 text-sm text-muted-foreground">Anthropic API usage, cost tracking, and quality scores</p>
        </div>
        <Badge className="bg-green-500/20 text-green-500"><Activity className="mr-1 h-3 w-3" />Anthropic API healthy</Badge>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center justify-between">
              <Brain className="h-6 w-6 text-primary" />
              <Badge className="bg-green-500/20 text-green-500 text-xs"><TrendingUp className="mr-1 h-3 w-3" />+8.2%</Badge>
            </div>
            <p className="text-3xl font-bold">{summary.tokensToday}M</p>
            <p className="mt-1 text-xs text-muted-foreground">Tokens today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Zap className="mb-2 h-6 w-6 text-amber-400" />
            <p className="text-3xl font-bold">{summary.requestsToday.toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted-foreground">Requests today</p>
          </CardContent>
        </Card>
        <Card className="border-orange-500/30">
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center justify-between">
              <DollarSign className="h-6 w-6 text-orange-500" />
              <Badge className="bg-orange-500/20 text-orange-400 text-xs">Over budget</Badge>
            </div>
            <p className="text-3xl font-bold">${summary.costToday}</p>
            <p className="mt-1 text-xs text-muted-foreground">Cost today · Budget $240</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" />Avg Latency</div>
            <p className="text-2xl font-bold">{summary.avgLatency}s</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><XCircle className="h-3.5 w-3.5" />Error Rate</div>
            <p className="text-2xl font-bold">{summary.errorRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5" />Quality Score</div>
            <p className="text-2xl font-bold">{summary.qualityScore}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Model Breakdown */}
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold">Model Breakdown</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            {modelBreakdown.map((m, i) => (
              <div key={i}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-mono font-medium">{m.name}</span>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{m.tokens}M tokens</span>
                    <span>${m.cost}</span>
                    <span>Quality {m.quality}%</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted">
                  <div className="h-1.5 rounded-full bg-primary" style={{ width: `${m.usage}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Feature Usage */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Feature Usage</h2>
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border/50 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3">Feature</th>
                    <th className="px-3 py-3 text-right">Requests</th>
                    <th className="px-3 py-3 text-right">Avg Tokens</th>
                    <th className="px-3 py-3 text-right">Cost</th>
                    <th className="px-3 py-3 text-right">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {featureUsage.map((f, i) => (
                    <tr key={i}>
                      <td className="px-6 py-3 font-medium">{f.feature}</td>
                      <td className="px-3 py-3 text-right font-mono">{f.requests.toLocaleString()}</td>
                      <td className="px-3 py-3 text-right font-mono">{f.avgTokens.toLocaleString()}</td>
                      <td className="px-3 py-3 text-right font-mono">${f.cost}</td>
                      <td className="px-3 py-3 text-right font-mono">{f.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><AlertTriangle className="h-5 w-5 text-orange-500" />Alerts</h2>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <Card
                key={i}
                className={a.type === "warning" ? "border-orange-500/20" : a.type === "success" ? "border-green-500/20" : ""}
              >
                <CardContent className="py-4">
                  <p className="text-sm text-muted-foreground">{a.text}</p>
                  <p className="mt-1 text-xs text-muted-foreground/60">{a.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
