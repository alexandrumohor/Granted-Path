"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Route, Users, Clock, Sparkles, ArrowRight } from "lucide-react";

const paths = [
  { id: "p1", name: "Cloud Architecture Fundamentals", teams: ["Engineering"], enrolled: 48, completion: 71, duration: "12h", category: "Technical", aiGenerated: false },
  { id: "p2", name: "GDPR & Data Privacy", teams: ["All"], enrolled: 247, completion: 89, duration: "3h", category: "Compliance", aiGenerated: false },
  { id: "p3", name: "Consultative Selling", teams: ["Sales"], enrolled: 32, completion: 56, duration: "8h", category: "Soft Skills", aiGenerated: true },
  { id: "p4", name: "Security Awareness 2026", teams: ["All"], enrolled: 247, completion: 94, duration: "2h", category: "Compliance", aiGenerated: false },
  { id: "p5", name: "AI/ML for Engineers", teams: ["Engineering"], enrolled: 25, completion: 48, duration: "20h", category: "Technical", aiGenerated: true },
  { id: "p6", name: "Leadership Fundamentals", teams: ["Management"], enrolled: 18, completion: 62, duration: "15h", category: "Leadership", aiGenerated: false },
];

export default function BizPathsPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const cats = ["all", ...Array.from(new Set(paths.map(p => p.category)))];
  const filtered = paths.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) && (cat === "all" || p.category === cat));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Learning Paths</h1>
          <p className="mt-1 text-sm text-muted-foreground">{paths.length} paths · {paths.reduce((s, p) => s + p.enrolled, 0)} total enrollments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Sparkles className="mr-2 h-4 w-4" />AI Generate</Button>
          <Button><Plus className="mr-2 h-4 w-4" />Create Path</Button>
        </div>
      </div>

      {/* AI Generate Card */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Generate a learning path with AI</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Describe your goal (e.g., "Prepare our sales team for enterprise deals") and Claude will build a complete path with modules, exercises, assessments, and a recommended schedule.
              </p>
              <div className="mt-3 flex gap-2">
                <Input placeholder="Describe the learning goal..." className="flex-1" />
                <Button>Generate</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search paths..." className="pl-9" />
        </div>
        <select value={cat} onChange={e => setCat(e.target.value)} className="h-10 rounded-md border border-border bg-background px-3 text-sm">
          {cats.map(c => <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (
          <Link key={p.id} href={`/biz/paths/${p.id}`}>
            <Card className="h-full transition-all hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Route className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary" className="text-xs">{p.category}</Badge>
                    {p.aiGenerated && <Badge className="bg-primary/20 text-primary text-[10px]"><Sparkles className="mr-1 h-2.5 w-2.5" />AI</Badge>}
                  </div>
                </div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.teams.join(", ")}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/50 pt-4 text-xs">
                  <div className="flex items-center gap-2"><Users className="h-3 w-3 text-muted-foreground" /><span>{p.enrolled} enrolled</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-3 w-3 text-muted-foreground" /><span>{p.duration}</span></div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-semibold">{p.completion}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div className="h-1.5 rounded-full bg-primary" style={{ width: `${p.completion}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
