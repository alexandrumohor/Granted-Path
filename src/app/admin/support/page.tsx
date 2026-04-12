"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  LifeBuoy, Search, Clock, AlertTriangle, CheckCircle2,
  MessageCircle, User, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tickets = [
  { id: "#8412", subject: "Billing: can't update payment method", user: "hr@techcorp.com", org: "TechCorp SRL", priority: "urgent", status: "open", replies: 3, opened: "45m ago", category: "Billing" },
  { id: "#8411", subject: "Voice tutor not working on Safari iOS", user: "maria.p@gmail.com", priority: "high", status: "in_progress", replies: 2, opened: "2h ago", category: "Technical" },
  { id: "#8410", subject: "Request to delete my account (GDPR)", user: "anna.k@wp.pl", priority: "high", status: "open", replies: 0, opened: "3h ago", category: "Privacy" },
  { id: "#8409", subject: "Invoice missing VAT number", user: "rectorat@ubbcluj.ro", org: "Universitatea BBU", priority: "medium", status: "in_progress", replies: 4, opened: "5h ago", category: "Billing" },
  { id: "#8408", subject: "AI generated incorrect Python code", user: "dan.i@yahoo.com", priority: "low", status: "open", replies: 1, opened: "8h ago", category: "AI Quality" },
  { id: "#8407", subject: "Course progress not syncing between devices", user: "alex@techcorp.com", org: "TechCorp SRL", priority: "medium", status: "resolved", replies: 6, opened: "Yesterday", category: "Technical" },
  { id: "#8406", subject: "Can I get a refund for this month?", user: "sofia.m@gmail.com", priority: "medium", status: "waiting", replies: 2, opened: "Yesterday", category: "Billing" },
];

const priorityStyles: Record<string, string> = {
  urgent: "bg-red-500/20 text-red-400",
  high: "bg-orange-500/20 text-orange-400",
  medium: "bg-amber-500/20 text-amber-400",
  low: "bg-blue-500/20 text-blue-400",
};

const statusStyles: Record<string, { label: string; color: string }> = {
  open: { label: "Open", color: "bg-red-500/10 text-red-400" },
  in_progress: { label: "In Progress", color: "bg-blue-500/10 text-blue-400" },
  waiting: { label: "Waiting User", color: "bg-amber-500/10 text-amber-400" },
  resolved: { label: "Resolved", color: "bg-green-500/10 text-green-500" },
};

export default function AdminSupportPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "in_progress" | "urgent">("all");

  const filtered = tickets.filter(t => {
    if (q && !t.subject.toLowerCase().includes(q.toLowerCase()) && !t.user.toLowerCase().includes(q.toLowerCase())) return false;
    if (filter === "urgent") return t.priority === "urgent";
    if (filter === "open") return t.status === "open";
    if (filter === "in_progress") return t.status === "in_progress";
    return true;
  });

  const counts = {
    open: tickets.filter(t => t.status === "open").length,
    inProgress: tickets.filter(t => t.status === "in_progress").length,
    urgent: tickets.filter(t => t.priority === "urgent").length,
    avgResponse: "2.4h",
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <p className="mt-1 text-sm text-muted-foreground">Customer support queue and response tracking</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <LifeBuoy className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{counts.open}</p>
                <p className="text-xs text-muted-foreground">Open</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold">{counts.inProgress}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{counts.urgent}</p>
                <p className="text-xs text-muted-foreground">Urgent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{counts.avgResponse}</p>
                <p className="text-xs text-muted-foreground">Avg first response</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search tickets..." className="pl-9" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border/50 p-1">
          {(["all", "open", "in_progress", "urgent"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded px-3 py-1 text-xs font-medium transition-colors capitalize",
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {filtered.map(t => (
              <div key={t.id} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/40">
                <div className="w-20 font-mono text-xs text-muted-foreground">{t.id}</div>
                <Badge className={cn("text-[10px] capitalize", priorityStyles[t.priority])}>{t.priority}</Badge>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{t.subject}</p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground truncate">
                    <User className="h-3 w-3 shrink-0" />
                    <span className="truncate">{t.user}</span>
                    {t.org && <><span>·</span><span>{t.org}</span></>}
                    <span>·</span>
                    <span>{t.category}</span>
                  </p>
                </div>
                <Badge className={statusStyles[t.status]!.color}>{statusStyles[t.status]!.label}</Badge>
                <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground w-16">
                  <MessageCircle className="h-3 w-3" />
                  <span>{t.replies}</span>
                </div>
                <span className="text-xs text-muted-foreground w-24 text-right">{t.opened}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7"><ArrowRight className="h-3.5 w-3.5" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
