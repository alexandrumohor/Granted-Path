"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, BookOpen, Dumbbell, Clock, AlertTriangle, Check, ChevronRight } from "lucide-react";
import Link from "next/link";

interface KnowledgeNode {
  id: string;
  topic: string;
  category: string;
  mastery: number; // 0-100
  status: "NOT_STARTED" | "LEARNING" | "REVIEWING" | "MASTERED";
  lastReviewed: string | null;
  nextReviewDue: string | null;
  forgettingRisk: number; // 0-100, how likely to forget
  relatedTopics: string[];
}

const MOCK_NODES: KnowledgeNode[] = [
  { id: "py-variables", topic: "Python Variables", category: "Python", mastery: 85, status: "REVIEWING", lastReviewed: "2 days ago", nextReviewDue: "Tomorrow", forgettingRisk: 20, relatedTopics: ["py-datatypes", "py-strings"] },
  { id: "py-datatypes", topic: "Data Types", category: "Python", mastery: 72, status: "LEARNING", lastReviewed: "4 days ago", nextReviewDue: "Today", forgettingRisk: 45, relatedTopics: ["py-variables", "py-lists"] },
  { id: "py-strings", topic: "String Operations", category: "Python", mastery: 60, status: "LEARNING", lastReviewed: "5 days ago", nextReviewDue: "Overdue", forgettingRisk: 60, relatedTopics: ["py-variables"] },
  { id: "py-conditionals", topic: "If / Elif / Else", category: "Python", mastery: 90, status: "MASTERED", lastReviewed: "1 day ago", nextReviewDue: "In 7 days", forgettingRisk: 10, relatedTopics: ["py-loops"] },
  { id: "py-loops", topic: "For & While Loops", category: "Python", mastery: 45, status: "LEARNING", lastReviewed: "6 days ago", nextReviewDue: "Overdue", forgettingRisk: 70, relatedTopics: ["py-conditionals", "py-lists"] },
  { id: "py-lists", topic: "Lists & Tuples", category: "Python", mastery: 30, status: "LEARNING", lastReviewed: "1 week ago", nextReviewDue: "Overdue", forgettingRisk: 80, relatedTopics: ["py-datatypes", "py-loops"] },
  { id: "py-functions", topic: "Functions", category: "Python", mastery: 0, status: "NOT_STARTED", lastReviewed: null, nextReviewDue: null, forgettingRisk: 0, relatedTopics: ["py-variables", "py-conditionals"] },
  { id: "seo-basics", topic: "SEO Basics", category: "Marketing", mastery: 55, status: "LEARNING", lastReviewed: "3 days ago", nextReviewDue: "Tomorrow", forgettingRisk: 35, relatedTopics: ["seo-keywords"] },
  { id: "seo-keywords", topic: "Keyword Research", category: "Marketing", mastery: 25, status: "LEARNING", lastReviewed: "1 week ago", nextReviewDue: "Overdue", forgettingRisk: 75, relatedTopics: ["seo-basics"] },
  { id: "en-opinions", topic: "Expressing Opinions", category: "English", mastery: 68, status: "REVIEWING", lastReviewed: "2 days ago", nextReviewDue: "In 3 days", forgettingRisk: 25, relatedTopics: [] },
];

const CATEGORIES = ["All", "Python", "Marketing", "English"];

function getMasteryColor(mastery: number): string {
  if (mastery === 0) return "bg-muted";
  if (mastery < 30) return "bg-red-500/70";
  if (mastery < 50) return "bg-orange-500/70";
  if (mastery < 70) return "bg-yellow-500/70";
  if (mastery < 90) return "bg-primary/70";
  return "bg-green-500/70";
}

function getMasteryBorder(mastery: number): string {
  if (mastery === 0) return "border-muted-foreground/20";
  if (mastery < 30) return "border-red-500/40";
  if (mastery < 50) return "border-orange-500/40";
  if (mastery < 70) return "border-yellow-500/40";
  if (mastery < 90) return "border-primary/40";
  return "border-green-500/40";
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "NOT_STARTED": return "Not Started";
    case "LEARNING": return "Learning";
    case "REVIEWING": return "Reviewing";
    case "MASTERED": return "Mastered";
    default: return status;
  }
}

export default function KnowledgeMapPage() {
  const t = useTranslations("knowledgeMap");
  const tc = useTranslations("common");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<KnowledgeNode | null>(null);

  const nodes = filter === "All" ? MOCK_NODES : MOCK_NODES.filter(n => n.category === filter);
  const atRisk = MOCK_NODES.filter(n => n.forgettingRisk >= 50);
  const reviewDue = MOCK_NODES.filter(n => n.nextReviewDue === "Overdue" || n.nextReviewDue === "Today");
  const avgMastery = Math.round(MOCK_NODES.reduce((s, n) => s + n.mastery, 0) / MOCK_NODES.length);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Network className="h-6 w-6 text-primary" />{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">See what you know, what you don&apos;t, and what you&apos;re about to forget.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6 text-center">
          <p className="text-3xl font-bold text-primary">{avgMastery}%</p>
          <p className="text-sm text-muted-foreground">Average Mastery</p>
        </CardContent></Card>
        <Card className={atRisk.length > 0 ? "border-orange-500/30" : ""}><CardContent className="pt-6 text-center">
          <p className="text-3xl font-bold text-orange-500">{atRisk.length}</p>
          <p className="text-sm text-muted-foreground">At Risk of Forgetting</p>
        </CardContent></Card>
        <Card className={reviewDue.length > 0 ? "border-yellow-500/30" : ""}><CardContent className="pt-6 text-center">
          <p className="text-3xl font-bold text-yellow-500">{reviewDue.length}</p>
          <p className="text-sm text-muted-foreground">Reviews Due</p>
        </CardContent></Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => { setFilter(c); setSelected(null); }} className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{c}</button>
        ))}
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="font-medium">Mastery:</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-muted" />Not started</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-red-500/70" />&lt;30%</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-orange-500/70" />30-50%</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-yellow-500/70" />50-70%</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-primary/70" />70-90%</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-green-500/70" />90%+</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Node Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {nodes.map(node => (
              <button key={node.id} onClick={() => setSelected(node)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all hover:scale-105 ${selected?.id === node.id ? "border-primary ring-2 ring-primary/20" : getMasteryBorder(node.mastery)}`}>
                <div className={`h-12 w-12 rounded-full ${getMasteryColor(node.mastery)} flex items-center justify-center text-xs font-bold text-white`}>
                  {node.mastery}%
                </div>
                <span className="text-xs font-medium leading-tight">{node.topic}</span>
                {node.forgettingRisk >= 50 && <AlertTriangle className="h-3 w-3 text-orange-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div>
          {selected ? (
            <Card className="sticky top-20">
              <CardHeader><CardTitle className="text-base">{selected.topic}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="secondary">{selected.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline">{getStatusLabel(selected.status)}</Badge>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Mastery</span><span className="font-semibold">{selected.mastery}%</span></div>
                  <div className="h-2 rounded-full bg-muted"><div className={`h-2 rounded-full ${getMasteryColor(selected.mastery)}`} style={{ width: `${selected.mastery}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Forgetting Risk</span><span className={`font-semibold ${selected.forgettingRisk >= 50 ? "text-orange-500" : "text-muted-foreground"}`}>{selected.forgettingRisk}%</span></div>
                  <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-orange-500/70" style={{ width: `${selected.forgettingRisk}%` }} /></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last reviewed</span>
                  <span>{selected.lastReviewed ?? "Never"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Next review</span>
                  <span className={selected.nextReviewDue === "Overdue" ? "text-red-400 font-medium" : ""}>{selected.nextReviewDue ?? "N/A"}</span>
                </div>

                {selected.relatedTopics.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Related topics</p>
                    <div className="flex flex-wrap gap-1">{selected.relatedTopics.map(t => {
                      const node = MOCK_NODES.find(n => n.id === t);
                      return <Badge key={t} variant="outline" className="text-xs">{node?.topic ?? t}</Badge>;
                    })}</div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Link href="/practice" className="flex-1"><Button size="sm" variant="outline" className="w-full"><Dumbbell className="mr-1.5 h-3.5 w-3.5" />Practice</Button></Link>
                  <Link href="/learn" className="flex-1"><Button size="sm" className="w-full"><BookOpen className="mr-1.5 h-3.5 w-3.5" />Learn</Button></Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center text-muted-foreground">
                <Network className="mx-auto h-8 w-8 mb-3 opacity-40" />
                <p className="text-sm">Click a topic to see details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
