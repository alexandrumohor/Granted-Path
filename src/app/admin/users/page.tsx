"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search, MoreVertical, Shield, Ban, Eye, UserCog,
  Download, Filter, CheckCircle2, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const users = [
  { id: "u1", name: "Maria Popescu", email: "maria.p@gmail.com", plan: "Pro", role: "USER", status: "active", joined: "2026-01-15", country: "RO", lastSeen: "2m ago" },
  { id: "u2", name: "Dan Ionescu", email: "dan.i@yahoo.com", plan: "Starter", role: "USER", status: "active", joined: "2025-11-22", country: "RO", lastSeen: "1h ago" },
  { id: "u3", name: "Alex Varga", email: "alex@techcorp.com", plan: "Business", role: "ORG_ADMIN", status: "active", joined: "2025-09-04", country: "HU", lastSeen: "5m ago" },
  { id: "u4", name: "Sofia Martinez", email: "sofia.m@gmail.com", plan: "Free", role: "USER", status: "active", joined: "2026-03-01", country: "ES", lastSeen: "Yesterday" },
  { id: "u5", name: "John Smith", email: "j.smith@acme.com", plan: "Master", role: "USER", status: "suspended", joined: "2025-06-18", country: "US", lastSeen: "3 days ago" },
  { id: "u6", name: "Anna Kowalska", email: "anna.k@wp.pl", plan: "Pro", role: "TEACHER", status: "active", joined: "2025-12-10", country: "PL", lastSeen: "30m ago" },
  { id: "u7", name: "Chris Mueller", email: "c.mueller@de.edu", plan: "Education", role: "MANAGER", status: "active", joined: "2025-08-22", country: "DE", lastSeen: "2h ago" },
  { id: "u8", name: "Elena Vlasenko", email: "elena.v@gmail.com", plan: "Free", role: "USER", status: "at_risk", joined: "2026-02-14", country: "UA", lastSeen: "8 days ago" },
];

const planColors: Record<string, string> = {
  Free: "bg-muted text-muted-foreground",
  Starter: "bg-blue-500/20 text-blue-400",
  Pro: "bg-primary/20 text-primary",
  Master: "bg-amber-500/20 text-amber-400",
  Education: "bg-purple-500/20 text-purple-400",
  Business: "bg-cyan-500/20 text-cyan-400",
};

export default function AdminUsersPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [q, setQ] = useState("");
  const [plan, setPlan] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = users.filter(u =>
    (q === "" || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())) &&
    (plan === "all" || u.plan === plan) &&
    (status === "all" || u.status === status)
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="mt-1 text-sm text-muted-foreground">{users.length.toLocaleString()} total · {users.filter(u => u.status === "suspended").length} suspended · {users.filter(u => u.status === "at_risk").length} at risk</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Advanced</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name, email, or user ID..." className="pl-9" />
        </div>
        <select value={plan} onChange={e => setPlan(e.target.value)} className="h-10 rounded-md border border-border bg-background px-3 text-sm">
          <option value="all">All plans</option>
          <option value="Free">Free</option>
          <option value="Starter">Starter</option>
          <option value="Pro">Pro</option>
          <option value="Master">Master</option>
          <option value="Education">Education</option>
          <option value="Business">Business</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="h-10 rounded-md border border-border bg-background px-3 text-sm">
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="at_risk">At Risk</option>
        </select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-3 py-3">Plan</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Country</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Last Seen</th>
                <th className="px-3 py-3">Joined</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map(u => (
                <tr key={u.id} className="transition-colors hover:bg-muted/40">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10" />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{u.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <Badge className={cn("text-xs", planColors[u.plan])}>{u.plan}</Badge>
                  </td>
                  <td className="px-3 py-3 text-xs font-mono text-muted-foreground">{u.role}</td>
                  <td className="px-3 py-3 text-xs">{u.country}</td>
                  <td className="px-3 py-3">
                    {u.status === "active" && <Badge className="bg-green-500/20 text-green-500 text-xs"><CheckCircle2 className="mr-1 h-2.5 w-2.5" />Active</Badge>}
                    {u.status === "suspended" && <Badge className="bg-red-500/20 text-red-400 text-xs"><Ban className="mr-1 h-2.5 w-2.5" />Suspended</Badge>}
                    {u.status === "at_risk" && <Badge className="bg-amber-500/20 text-amber-400 text-xs"><AlertTriangle className="mr-1 h-2.5 w-2.5" />At Risk</Badge>}
                  </td>
                  <td className="px-3 py-3 text-xs text-muted-foreground">{u.lastSeen}</td>
                  <td className="px-3 py-3 text-xs text-muted-foreground">{u.joined}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Impersonate"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Edit role"><UserCog className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="More"><MoreVertical className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-sm text-muted-foreground">No users match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {filtered.length} of {users.length}</span>
        <div className="flex items-center gap-2">
          <Shield className="h-3 w-3" />
          <span>All actions are logged to audit trail</span>
        </div>
      </div>
    </div>
  );
}
