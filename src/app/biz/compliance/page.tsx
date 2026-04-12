"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck, AlertTriangle, Clock, CheckCircle2, Plus,
  FileText, Users, Calendar,
} from "lucide-react";

const requiredTrainings = [
  { name: "GDPR & Data Privacy", required: 247, completed: 238, expiring: 4, overdue: 5, dueDate: "Annual" },
  { name: "Security Awareness 2026", required: 247, completed: 233, expiring: 9, overdue: 5, dueDate: "Annual" },
  { name: "Anti-Harassment Training", required: 247, completed: 247, expiring: 12, overdue: 0, dueDate: "Annual" },
  { name: "Code of Conduct", required: 247, completed: 245, expiring: 0, overdue: 2, dueDate: "Biennial" },
  { name: "Financial Compliance (SOX)", required: 14, completed: 14, expiring: 0, overdue: 0, dueDate: "Quarterly" },
];

const expiringSoon = [
  { employee: "Maria Popescu", team: "Engineering", training: "GDPR", expiresIn: "3 days" },
  { employee: "Dan Ionescu", team: "Engineering", training: "Security Awareness", expiresIn: "5 days" },
  { employee: "Elena V.", team: "HR", training: "GDPR", expiresIn: "7 days" },
  { employee: "Chris M.", team: "Engineering", training: "Security Awareness", expiresIn: "9 days" },
];

const overdueList = [
  { employee: "Anna B.", team: "Sales", training: "Security Awareness", overdueDays: 12 },
  { employee: "James K.", team: "HR", training: "Code of Conduct", overdueDays: 8 },
  { employee: "Carlos R.", team: "Sales", training: "GDPR", overdueDays: 4 },
];

export default function BizCompliancePage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const total = requiredTrainings.reduce((s, t) => s + t.required, 0);
  const done = requiredTrainings.reduce((s, t) => s + t.completed, 0);
  const rate = Math.round((done / total) * 100);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Compliance</h1>
          <p className="mt-1 text-sm text-muted-foreground">Required training and certification tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><FileText className="mr-2 h-4 w-4" />Export Report</Button>
          <Button><Plus className="mr-2 h-4 w-4" />Add Required Training</Button>
        </div>
      </div>

      {/* Overview */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-green-500" /><div><p className="text-2xl font-bold">{rate}%</p><p className="text-xs text-muted-foreground">Compliance Rate</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><CheckCircle2 className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold">{done}</p><p className="text-xs text-muted-foreground">Completed</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Clock className="h-8 w-8 text-amber-500" /><div><p className="text-2xl font-bold">{expiringSoon.length}</p><p className="text-xs text-muted-foreground">Expiring Soon</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><AlertTriangle className="h-8 w-8 text-red-500" /><div><p className="text-2xl font-bold">{overdueList.length}</p><p className="text-xs text-muted-foreground">Overdue</p></div></div></CardContent></Card>
      </div>

      {/* Required Trainings */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Required Trainings</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {requiredTrainings.map((t, i) => {
                const pct = Math.round((t.completed / t.required) * 100);
                return (
                  <div key={i} className="px-6 py-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{t.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{t.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {t.overdue > 0 && <Badge variant="destructive" className="text-[10px]">{t.overdue} overdue</Badge>}
                        {t.expiring > 0 && <Badge className="bg-amber-500/20 text-amber-500 text-[10px]">{t.expiring} expiring</Badge>}
                        <Badge variant="secondary">{pct}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-muted">
                        <div className={`h-1.5 rounded-full ${pct === 100 ? "bg-green-500" : pct >= 90 ? "bg-primary" : "bg-amber-500"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{t.completed}/{t.required}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Expiring Soon */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5 text-amber-500" />Expiring Soon
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {expiringSoon.map((e, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-3">
                    <div>
                      <p className="text-sm font-medium">{e.employee}</p>
                      <p className="text-xs text-muted-foreground">{e.team} · {e.training}</p>
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-500 text-xs">{e.expiresIn}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overdue */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="h-5 w-5 text-red-500" />Overdue
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {overdueList.map((e, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-3">
                    <div>
                      <p className="text-sm font-medium">{e.employee}</p>
                      <p className="text-xs text-muted-foreground">{e.team} · {e.training}</p>
                    </div>
                    <Badge variant="destructive" className="text-xs">{e.overdueDays}d overdue</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
