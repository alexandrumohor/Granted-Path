"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, Filter, Download, ArrowRight } from "lucide-react";

const employees = [
  { id: "e1", name: "Maria Popescu", email: "maria.p@acme.com", team: "Engineering", role: "Senior Backend", progress: 89, status: "active" },
  { id: "e2", name: "Dan Ionescu", email: "dan.i@acme.com", team: "Engineering", role: "Frontend Dev", progress: 72, status: "active" },
  { id: "e3", name: "Ana Popescu", email: "ana.p@acme.com", team: "Operations", role: "Ops Manager", progress: 94, status: "active" },
  { id: "e4", name: "John D.", email: "john.d@acme.com", team: "Sales", role: "Enterprise AE", progress: 82, status: "active" },
  { id: "e5", name: "Elena V.", email: "elena.v@acme.com", team: "HR", role: "HR Partner", progress: 48, status: "at_risk" },
  { id: "e6", name: "Chris M.", email: "chris.m@acme.com", team: "Engineering", role: "Mobile Dev", progress: 54, status: "active" },
  { id: "e7", name: "Laura P.", email: "laura.p@acme.com", team: "Marketing", role: "Content Lead", progress: 76, status: "active" },
  { id: "e8", name: "Robert S.", email: "robert.s@acme.com", team: "Finance", role: "FP&A Analyst", progress: 80, status: "active" },
  { id: "e9", name: "Anna B.", email: "anna.b@acme.com", team: "Sales", role: "SDR", progress: 28, status: "at_risk" },
  { id: "e10", name: "Alex V.", email: "alex.v@acme.com", team: "Engineering", role: "DevOps Lead", progress: 95, status: "active" },
];

export default function BizEmployeesPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [q, setQ] = useState("");
  const [team, setTeam] = useState("all");
  const [status, setStatus] = useState("all");

  const teams = ["all", ...Array.from(new Set(employees.map(e => e.team)))];

  const filtered = employees.filter(e =>
    (q === "" || e.name.toLowerCase().includes(q.toLowerCase()) || e.email.toLowerCase().includes(q.toLowerCase())) &&
    (team === "all" || e.team === team) &&
    (status === "all" || e.status === status)
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="mt-1 text-sm text-muted-foreground">{employees.length} total · {employees.filter(e => e.status === "at_risk").length} at risk</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" />Export CSV</Button>
          <Button><UserPlus className="mr-2 h-4 w-4" />Invite Employee</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name or email..." className="pl-9" />
        </div>
        <select value={team} onChange={e => setTeam(e.target.value)} className="h-10 rounded-md border border-border bg-background px-3 text-sm">
          {teams.map(t => <option key={t} value={t}>{t === "all" ? "All teams" : t}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="h-10 rounded-md border border-border bg-background px-3 text-sm">
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="at_risk">At Risk</option>
        </select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {filtered.map(e => (
              <Link key={e.id} href={`/biz/employees/${e.id}`} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/40">
                <div className="h-10 w-10 rounded-full bg-primary/10" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{e.name}</p>
                    {e.status === "at_risk" && <Badge variant="destructive" className="text-[10px]">At Risk</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{e.email}</p>
                </div>
                <div className="hidden md:block w-32">
                  <p className="text-sm">{e.team}</p>
                  <p className="text-xs text-muted-foreground">{e.role}</p>
                </div>
                <div className="w-32">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{e.progress}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div className={`h-1.5 rounded-full ${e.status === "at_risk" ? "bg-orange-500" : "bg-primary"}`} style={{ width: `${e.progress}%` }} />
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="p-12 text-center text-sm text-muted-foreground">No employees match your filters.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
