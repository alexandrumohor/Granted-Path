"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Plus, Calendar, Clock, Check, Trophy } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  type: string;
  targetDate: string | null;
  progress: number;
  status: "ACTIVE" | "COMPLETED" | "ABANDONED";
}

export default function GoalsPage() {
  const t = useTranslations("goals");
  const tc = useTranslations("common");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("SKILL");
  const [newDeadline, setNewDeadline] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch("/api/user/goals")
      .then(r => r.ok ? r.json() : [])
      .then(setGoals)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function createGoal() {
    if (!newTitle.trim() || creating) return;
    setCreating(true);
    try {
      const res = await fetch("/api/user/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim(), type: newType, targetDate: newDeadline || undefined }),
      });
      if (res.ok) {
        const goal = await res.json();
        setGoals(prev => [goal, ...prev]);
        setNewTitle("");
        setNewDeadline("");
        setShowAdd(false);
      }
    } catch {}
    setCreating(false);
  }

  const active = goals.filter(g => g.status === "ACTIVE");
  const completed = goals.filter(g => g.status === "COMPLETED");

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-3xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-32 bg-muted rounded-xl" />
          <div className="h-32 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  function daysLeft(date: string | null): number | null {
    if (!date) return null;
    const diff = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Target className="h-6 w-6 text-primary" />{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)}><Plus className="mr-2 h-4 w-4" />{t("addGoal")}</Button>
      </div>

      {/* Add Goal Form */}
      {showAdd && (
        <Card className="mb-6 border-primary/20">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2"><Label>{t("goalTitle")}</Label><Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder={t("goalPlaceholder")} /></div>
            <div className="space-y-2">
              <Label>{t("goalType")}</Label>
              <div className="flex gap-2">{["EXAM", "SKILL", "CAREER", "CURIOSITY"].map(type => (
                <button key={type} onClick={() => setNewType(type)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${newType === type ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{type.charAt(0) + type.slice(1).toLowerCase()}</button>
              ))}</div>
            </div>
            <div className="space-y-2"><Label>{t("deadline")}</Label><Input type="date" value={newDeadline} onChange={e => setNewDeadline(e.target.value)} /></div>
            <div className="flex gap-2">
              <Button onClick={createGoal} disabled={creating || !newTitle.trim()}>{t("createGoal")}</Button>
              <Button variant="outline" onClick={() => setShowAdd(false)}>{tc("cancel")}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {goals.length === 0 && !showAdd ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Target className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">{t("noGoals")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("noGoalsDesc")}</p>
            <Button className="mt-4" onClick={() => setShowAdd(true)}><Plus className="mr-2 h-4 w-4" />{t("addGoal")}</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Active Goals */}
          {active.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">{tc("active")} ({active.length})</h2>
              <div className="space-y-4">
                {active.map(goal => {
                  const dl = daysLeft(goal.targetDate);
                  const urgent = dl !== null && dl < 14 && goal.progress < 50;
                  return (
                    <Card key={goal.id} className={urgent ? "border-orange-500/30" : ""}>
                      <CardContent className="py-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{goal.title}</h3>
                              <Badge variant="outline" className="text-xs">{goal.type}</Badge>
                            </div>
                            {goal.targetDate && (
                              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{goal.targetDate}</span>
                                {dl !== null && (
                                  <span className={`flex items-center gap-1 ${dl < 14 ? "text-orange-500 font-medium" : ""}`}>
                                    <Clock className="h-3 w-3" />{dl} {t("daysLeft")}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="text-lg font-bold">{goal.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${goal.progress}%` }} />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">{tc("completed")} <Trophy className="h-4 w-4 text-primary" /></h2>
              <div className="space-y-3">
                {completed.map(goal => (
                  <Card key={goal.id} className="border-green-500/20 opacity-80">
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10"><Check className="h-5 w-5 text-green-500" /></div>
                      <div className="flex-1">
                        <p className="font-medium">{goal.title}</p>
                        <p className="text-xs text-muted-foreground">{tc("completed")}</p>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-500/30">{tc("completed")}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
