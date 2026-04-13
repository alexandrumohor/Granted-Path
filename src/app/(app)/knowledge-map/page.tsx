"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, BookOpen, Dumbbell, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface KnowledgeNode {
  id: string;
  topicId: string;
  topic: string;
  mastery: number;
  status: "NOT_STARTED" | "LEARNING" | "REVIEWING" | "MASTERED";
  lastReviewed: string | null;
  nextReviewDue: string | null;
  timesReviewed: number;
  timesCorrect: number;
  relatedTopics: { id: string; name: string }[];
}

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

export default function KnowledgeMapPage() {
  const t = useTranslations("knowledgeMap");
  const tc = useTranslations("common");
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<KnowledgeNode | null>(null);

  useEffect(() => {
    fetch("/api/user/knowledge")
      .then(r => r.ok ? r.json() : [])
      .then(setNodes)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="grid gap-4 sm:grid-cols-3"><div className="h-24 bg-muted rounded-xl" /><div className="h-24 bg-muted rounded-xl" /><div className="h-24 bg-muted rounded-xl" /></div>
          <div className="h-64 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2"><Network className="h-6 w-6 text-primary" />{t("title")}</h1>
        </div>
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Network className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">{t("noNodes")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("noNodesDesc")}</p>
            <Link href="/learn"><Button className="mt-4">{t("startLearning")}</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const avgMastery = Math.round(nodes.reduce((s, n) => s + n.mastery, 0) / nodes.length);
  const mastered = nodes.filter(n => n.status === "MASTERED").length;
  const learning = nodes.filter(n => n.status === "LEARNING" || n.status === "REVIEWING").length;

  function formatDate(iso: string | null): string {
    if (!iso) return "—";
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return t("overdue");
    if (diff === 0) return t("today");
    if (diff === 1) return t("tomorrow");
    return `${diff} ${tc("days")}`;
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Network className="h-6 w-6 text-primary" />{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6 text-center">
          <p className="text-3xl font-bold text-primary">{avgMastery}%</p>
          <p className="text-sm text-muted-foreground">{t("avgMastery")}</p>
        </CardContent></Card>
        <Card><CardContent className="pt-6 text-center">
          <p className="text-3xl font-bold text-green-500">{mastered}</p>
          <p className="text-sm text-muted-foreground">{t("mastered")}</p>
        </CardContent></Card>
        <Card><CardContent className="pt-6 text-center">
          <p className="text-3xl font-bold text-primary">{learning}</p>
          <p className="text-sm text-muted-foreground">{t("inProgress")}</p>
        </CardContent></Card>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="font-medium">{t("mastery")}:</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-muted" />{t("notStarted")}</span>
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
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline">{selected.status.replace("_", " ")}</Badge>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">{t("mastery")}</span><span className="font-semibold">{selected.mastery}%</span></div>
                  <div className="h-2 rounded-full bg-muted"><div className={`h-2 rounded-full ${getMasteryColor(selected.mastery)}`} style={{ width: `${selected.mastery}%` }} /></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("lastReviewed")}</span>
                  <span>{selected.lastReviewed ? new Date(selected.lastReviewed).toLocaleDateString() : "—"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("nextReview")}</span>
                  <span>{formatDate(selected.nextReviewDue)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("accuracy")}</span>
                  <span>{selected.timesReviewed > 0 ? Math.round((selected.timesCorrect / selected.timesReviewed) * 100) : 0}%</span>
                </div>

                {selected.relatedTopics.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t("relatedTopics")}</p>
                    <div className="flex flex-wrap gap-1">{selected.relatedTopics.map(rt => (
                      <Badge key={rt.id} variant="outline" className="text-xs">{rt.name}</Badge>
                    ))}</div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Link href="/practice" className="flex-1"><Button size="sm" variant="outline" className="w-full"><Dumbbell className="mr-1.5 h-3.5 w-3.5" />{t("practice")}</Button></Link>
                  <Link href="/learn" className="flex-1"><Button size="sm" className="w-full"><BookOpen className="mr-1.5 h-3.5 w-3.5" />{t("learn")}</Button></Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center text-muted-foreground">
                <Network className="mx-auto h-8 w-8 mb-3 opacity-40" />
                <p className="text-sm">{t("clickTopic")}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
