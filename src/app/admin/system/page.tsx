"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Server, Database, Zap, Brain, CreditCard, Mail, Globe,
  Activity, AlertTriangle, CheckCircle2, XCircle, Power,
  FileText, Clock, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { name: "Next.js App (Vercel)", status: "operational", latency: "142ms", uptime: "99.99%", icon: Globe },
  { name: "PostgreSQL (Neon)", status: "operational", latency: "8ms", uptime: "99.98%", icon: Database },
  { name: "Redis (Upstash)", status: "operational", latency: "3ms", uptime: "100%", icon: Zap },
  { name: "Anthropic API", status: "operational", latency: "1.2s", uptime: "99.94%", icon: Brain },
  { name: "Stripe API", status: "operational", latency: "184ms", uptime: "99.99%", icon: CreditCard },
  { name: "Resend Email", status: "degraded", latency: "2.8s", uptime: "98.12%", icon: Mail },
];

const auditLog = [
  { actor: "admin:claudiu@grantedpath.com", action: "Toggled feature flag", target: "new_exam_predictor → disabled", time: "3h ago", ip: "82.76.12.4" },
  { actor: "admin:claudiu@grantedpath.com", action: "Impersonated user", target: "u_8123 (maria.p@gmail.com)", time: "5h ago", ip: "82.76.12.4" },
  { actor: "system", action: "Database backup completed", target: "grantedpath-prod-2026-04-11-0300", time: "9h ago", ip: "-" },
  { actor: "admin:claudiu@grantedpath.com", action: "Approved AI content", target: "Advanced Python Async Patterns (g2)", time: "11h ago", ip: "82.76.12.4" },
  { actor: "admin:andreea@grantedpath.com", action: "Updated user role", target: "u_4521 USER → TEACHER", time: "1d ago", ip: "92.14.88.1" },
  { actor: "system", action: "Deployment successful", target: "commit 8a3f2c1 to production", time: "1d ago", ip: "-" },
];

const statusStyles: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  operational: { color: "text-green-500", icon: CheckCircle2 },
  degraded: { color: "text-amber-500", icon: AlertTriangle },
  down: { color: "text-red-500", icon: XCircle },
};

export default function AdminSystemPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Health</h1>
        <p className="mt-1 text-sm text-muted-foreground">Infrastructure status, maintenance controls, and audit log</p>
      </div>

      {/* Maintenance */}
      <Card className={cn("mb-6", maintenance ? "border-red-500/30 bg-red-500/5" : "border-border/50")}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", maintenance ? "bg-red-500/20" : "bg-muted")}>
              <Power className={cn("h-5 w-5", maintenance ? "text-red-500" : "text-muted-foreground")} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Maintenance Mode</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {maintenance
                  ? "⚠️ ALL users are currently blocked from accessing the platform. Only admins can log in."
                  : "Platform is fully accessible. Enable this to block all non-admin access during deployments or incidents."}
              </p>
            </div>
            <Button
              variant={maintenance ? "default" : "outline"}
              onClick={() => setMaintenance(!maintenance)}
              className={maintenance ? "bg-red-500 hover:bg-red-600" : ""}
            >
              {maintenance ? "Disable Maintenance" : "Enable Maintenance"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <div className="mb-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Server className="h-5 w-5 text-primary" />Services</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            const style = statusStyles[s.status]!;
            const StatusIcon = style.icon;
            return (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="mb-3 flex items-start justify-between">
                    <Icon className="h-6 w-6 text-primary" />
                    <StatusIcon className={cn("h-5 w-5", style.color)} />
                  </div>
                  <p className="font-semibold">{s.name}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Latency: <span className="font-mono text-foreground">{s.latency}</span></span>
                    <span>Uptime: <span className="font-mono text-foreground">{s.uptime}</span></span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Audit Log */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><FileText className="h-5 w-5 text-primary" />Audit Log</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {auditLog.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-6 py-3">
                  <Shield className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-mono text-xs text-primary">{a.actor}</span>
                      <span className="ml-2 text-muted-foreground">{a.action}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">{a.target}</p>
                  </div>
                  <div className="flex flex-col items-end text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{a.time}</span>
                    <span className="mt-0.5 font-mono text-[10px]">{a.ip}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
