"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Plus, Search, ArrowRight, Target, TrendingUp } from "lucide-react";

const teams = [
  { id: "eng", name: "Engineering", members: 48, avgProgress: 74, lead: "Sarah Chen", activePaths: 5, department: "Technology" },
  { id: "sales", name: "Sales", members: 32, avgProgress: 61, lead: "Mike Brown", activePaths: 3, department: "Revenue" },
  { id: "ops", name: "Operations", members: 28, avgProgress: 82, lead: "Ana Popescu", activePaths: 4, department: "Operations" },
  { id: "hr", name: "Human Resources", members: 12, avgProgress: 55, lead: "James K.", activePaths: 2, department: "People" },
  { id: "mkt", name: "Marketing", members: 18, avgProgress: 69, lead: "Laura P.", activePaths: 3, department: "Revenue" },
  { id: "fin", name: "Finance", members: 14, avgProgress: 78, lead: "Robert S.", activePaths: 2, department: "Operations" },
];

export default function BizTeamsPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [q, setQ] = useState("");
  const filtered = teams.filter(t => t.name.toLowerCase().includes(q.toLowerCase()) || t.lead.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Teams</h1>
          <p className="mt-1 text-sm text-muted-foreground">{teams.length} teams · {teams.reduce((s, t) => s + t.members, 0)} total members</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Create Team</Button>
      </div>

      <div className="mb-6 flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search teams or leads..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(t => (
          <Link key={t.id} href={`/biz/teams/${t.id}`}>
            <Card className="h-full transition-all hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">{t.department}</Badge>
                </div>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Lead: {t.lead}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/50 pt-4 text-xs">
                  <div><p className="text-muted-foreground">Members</p><p className="mt-1 font-semibold">{t.members}</p></div>
                  <div><p className="text-muted-foreground">Active Paths</p><p className="mt-1 font-semibold">{t.activePaths}</p></div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Avg Progress</span>
                    <span className="font-semibold">{t.avgProgress}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div className="h-1.5 rounded-full bg-primary" style={{ width: `${t.avgProgress}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end text-xs text-primary">
                  View team <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
