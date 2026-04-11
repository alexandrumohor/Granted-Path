"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search, Building2, GraduationCap, Users, TrendingUp,
  Download, MoreVertical, DollarSign,
} from "lucide-react";

const orgs = [
  { id: "o1", name: "Liceul Teoretic Iasi", type: "Education", plan: "Education", seats: { used: 82, total: 100 }, mrr: 490, joined: "2025-09-01", contact: "director@lt-iasi.ro", country: "RO", status: "active" },
  { id: "o2", name: "TechCorp SRL", type: "Business", plan: "Business Growth", seats: { used: 48, total: 60 }, mrr: 432, joined: "2025-11-15", contact: "hr@techcorp.com", country: "RO", status: "active" },
  { id: "o3", name: "Acme Corp", type: "Business", plan: "Business Enterprise", seats: { used: 247, total: 300 }, mrr: 1482, joined: "2024-08-22", contact: "learning@acme.com", country: "DE", status: "active" },
  { id: "o4", name: "Universitatea Babes-Bolyai", type: "Education", plan: "Education", seats: { used: 1240, total: 1500 }, mrr: 6200, joined: "2024-09-15", contact: "rectorat@ubbcluj.ro", country: "RO", status: "active" },
  { id: "o5", name: "StartupX GmbH", type: "Business", plan: "Business Starter", seats: { used: 18, total: 25 }, mrr: 216, joined: "2026-02-10", contact: "ops@startupx.de", country: "DE", status: "trial" },
  { id: "o6", name: "Colegiul National Sfantul Sava", type: "Education", plan: "Education", seats: { used: 145, total: 200 }, mrr: 725, joined: "2025-10-01", contact: "sfsava@edu.ro", country: "RO", status: "active" },
  { id: "o7", name: "InnoLabs SA", type: "Business", plan: "Business Growth", seats: { used: 68, total: 80 }, mrr: 612, joined: "2025-12-03", contact: "people@innolabs.fr", country: "FR", status: "overdue" },
];

export default function AdminOrgsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | "Education" | "Business">("all");

  const filtered = orgs.filter(o =>
    (q === "" || o.name.toLowerCase().includes(q.toLowerCase())) &&
    (type === "all" || o.type === type)
  );

  const totalMrr = orgs.reduce((s, o) => s + o.mrr, 0);
  const totalSeats = orgs.reduce((s, o) => s + o.seats.used, 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Organizations</h1>
          <p className="mt-1 text-sm text-muted-foreground">{orgs.length} orgs · {totalSeats.toLocaleString()} seats · €{totalMrr.toLocaleString()}/mo</p>
        </div>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" />Export</Button>
      </div>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold">{orgs.filter(o => o.type === "Education").length}</p>
                <p className="text-xs text-muted-foreground">Education</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{orgs.filter(o => o.type === "Business").length}</p>
                <p className="text-xs text-muted-foreground">Business</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold">{totalSeats.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Seats</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">€{(totalMrr / 1000).toFixed(1)}k</p>
                <p className="text-xs text-muted-foreground">Orgs MRR</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search organizations..." className="pl-9" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border/50 p-1">
          {(["all", "Education", "Business"] as const).map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={
                "rounded px-3 py-1 text-xs font-medium transition-colors " +
                (type === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")
              }
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Orgs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {filtered.map(o => {
              const utilization = Math.round((o.seats.used / o.seats.total) * 100);
              const Icon = o.type === "Education" ? GraduationCap : Building2;
              return (
                <div key={o.id} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/40">
                  <div className={"flex h-10 w-10 items-center justify-center rounded-lg " + (o.type === "Education" ? "bg-purple-500/10" : "bg-primary/10")}>
                    <Icon className={"h-5 w-5 " + (o.type === "Education" ? "text-purple-400" : "text-primary")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{o.name}</p>
                      <Badge variant="secondary" className="text-xs">{o.country}</Badge>
                      {o.status === "trial" && <Badge className="bg-blue-500/20 text-blue-400 text-[10px]">Trial</Badge>}
                      {o.status === "overdue" && <Badge className="bg-red-500/20 text-red-400 text-[10px]">Overdue</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{o.contact} · {o.plan}</p>
                  </div>
                  <div className="hidden md:block w-40">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Seats</span>
                      <span className="font-semibold">{o.seats.used} / {o.seats.total}</span>
                    </div>
                    <div className="mt-1 h-1 rounded-full bg-muted">
                      <div className={"h-1 rounded-full " + (utilization > 90 ? "bg-amber-500" : "bg-primary")} style={{ width: `${utilization}%` }} />
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <p className="text-sm font-semibold">€{o.mrr.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
