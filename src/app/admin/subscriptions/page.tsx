"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard, TrendingUp, TrendingDown, AlertCircle, Check,
  RefreshCcw, XCircle, DollarSign, ArrowUpRight, ArrowDownRight,
} from "lucide-react";

const summary = {
  mrr: 47830,
  arr: 573960,
  activeSubs: 7245,
  trialing: 184,
  churnRate: 3.2,
  netNewMrr: 5280,
  upgrades: 142,
  downgrades: 38,
  cancellations: 67,
};

const recentEvents = [
  { type: "success", kind: "charge", amount: "€2,480", org: "TechCorp SRL", time: "3m ago", stripeId: "ch_3Oabc..." },
  { type: "success", kind: "charge", amount: "€432", user: "maria.p@gmail.com", time: "8m ago", stripeId: "ch_3Obde..." },
  { type: "info", kind: "upgrade", from: "Starter", to: "Pro", user: "dan.i@yahoo.com", time: "15m ago", stripeId: "sub_1Ocfg..." },
  { type: "warning", kind: "payment_failed", amount: "€612", org: "InnoLabs SA", time: "1h ago", stripeId: "ch_3Oehi..." },
  { type: "error", kind: "canceled", plan: "Pro", user: "j.smith@acme.com", time: "2h ago", stripeId: "sub_1Ojkl..." },
  { type: "success", kind: "charge", amount: "€6,200", org: "Universitatea BBU", time: "3h ago", stripeId: "ch_3Omno..." },
  { type: "info", kind: "refund", amount: "€30", user: "chris@example.com", time: "5h ago", stripeId: "re_1Opqr..." },
];

const eventIcons: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  charge: { icon: Check, color: "text-green-500" },
  upgrade: { icon: ArrowUpRight, color: "text-primary" },
  downgrade: { icon: ArrowDownRight, color: "text-amber-500" },
  payment_failed: { icon: AlertCircle, color: "text-orange-500" },
  canceled: { icon: XCircle, color: "text-red-500" },
  refund: { icon: RefreshCcw, color: "text-blue-400" },
};

export default function AdminSubscriptionsPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="mt-1 text-sm text-muted-foreground">Stripe events and billing overview</p>
        </div>
        <Badge className="bg-green-500/20 text-green-500"><span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />Stripe connected</Badge>
      </div>

      {/* MRR / ARR */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/30">
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center justify-between">
              <DollarSign className="h-6 w-6 text-primary" />
              <Badge className="bg-green-500/20 text-green-500 text-xs"><TrendingUp className="mr-1 h-3 w-3" />+12.4%</Badge>
            </div>
            <p className="text-3xl font-bold">€{summary.mrr.toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted-foreground">MRR</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <DollarSign className="mb-2 h-6 w-6 text-muted-foreground" />
            <p className="text-3xl font-bold">€{(summary.arr / 1000).toFixed(0)}k</p>
            <p className="mt-1 text-xs text-muted-foreground">ARR</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CreditCard className="mb-2 h-6 w-6 text-primary" />
            <p className="text-3xl font-bold">{summary.activeSubs.toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted-foreground">Active subs · {summary.trialing} trialing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="mb-2 flex items-center justify-between">
              <TrendingDown className="h-6 w-6 text-red-500" />
              <Badge className="bg-red-500/20 text-red-400 text-xs">-{summary.churnRate}%</Badge>
            </div>
            <p className="text-3xl font-bold">{summary.churnRate}%</p>
            <p className="mt-1 text-xs text-muted-foreground">Monthly churn</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Movement */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 font-semibold">Net New MRR (This Month)</h3>
            <p className="text-3xl font-bold text-green-500">+€{summary.netNewMrr.toLocaleString()}</p>
            <div className="mt-4 space-y-3 border-t border-border/50 pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><ArrowUpRight className="h-3.5 w-3.5 text-primary" />Upgrades</span>
                <span className="font-semibold">{summary.upgrades}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><ArrowDownRight className="h-3.5 w-3.5 text-amber-500" />Downgrades</span>
                <span className="font-semibold">{summary.downgrades}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><XCircle className="h-3.5 w-3.5 text-red-500" />Cancellations</span>
                <span className="font-semibold">{summary.cancellations}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stripe Events */}
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <h3 className="mb-4 font-semibold">Recent Stripe Events</h3>
            <div className="divide-y divide-border/50">
              {recentEvents.map((e, i) => {
                const style = eventIcons[e.kind];
                if (!style) return null;
                const Icon = style.icon;
                return (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <Icon className={`h-4 w-4 shrink-0 ${style.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium capitalize">{e.kind.replace("_", " ")}</span>
                        {e.amount && <span className="ml-2 text-muted-foreground">{e.amount}</span>}
                        {e.from && e.to && <span className="ml-2 text-muted-foreground">{e.from} → {e.to}</span>}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {e.org || e.user} · <span className="font-mono">{e.stripeId}</span>
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{e.time}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
