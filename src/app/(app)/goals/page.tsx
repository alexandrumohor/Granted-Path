"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Plus, Calendar, Clock, Check, Trash2, AlertTriangle, Trophy } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  type: string;
  deadline: string | null;
  progress: number;
  status: "ACTIVE" | "COMPLETED";
  daysLeft: number | null;
  aiTip: string;
}

const MOCK_GOALS: Goal[] = [
  { id: "1", title: "Learn Python basics", type: "SKILL", deadline: "2026-05-15", progress: 45, status: "ACTIVE", daysLeft: 35, aiTip: "You're on track. Focus on loops and functions this week." },
  { id: "2", title: "BAC Matematica", type: "EXAM", deadline: "2026-06-25", progress: 12, status: "ACTIVE", daysLeft: 76, aiTip: "You're behind schedule. Increase daily study to 45 min to catch up." },
  { id: "3", title: "English B2 Certificate", type: "CAREER", deadline: "2026-08-01", progress: 68, status: "ACTIVE", daysLeft: 113, aiTip: "Great progress! Focus on writing exercises to reach proficiency." },
  { id: "4", title: "Permis Auto", type: "EXAM", deadline: "2026-04-20", progress: 100, status: "COMPLETED", daysLeft: null, aiTip: "Completed! Well done." },
];

export default function GoalsPage() {
  const [goals] = useState(MOCK_GOALS);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("SKILL");
  const [newDeadline, setNewDeadline] = useState("");

  const active = goals.filter(g => g.status === "ACTIVE");
  const completed = goals.filter(g => g.status === "COMPLETED");

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Target className="h-6 w-6 text-primary" />Goals</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track your learning objectives. AI creates a plan for each.</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)}><Plus className="mr-2 h-4 w-4" />Add Goal</Button>
      </div>

      {/* Add Goal Form */}
      {showAdd && (
        <Card className="mb-6 border-primary/20">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2"><Label>Goal Title</Label><Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g., Learn Python for data science" /></div>
            <div className="space-y-2">
              <Label>Type</Label>
              <div className="flex gap-2">{["EXAM", "SKILL", "CAREER", "CURIOSITY"].map(t => (
                <button key={t} onClick={() => setNewType(t)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${newType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t.charAt(0) + t.slice(1).toLowerCase()}</button>
              ))}</div>
            </div>
            <div className="space-y-2"><Label>Deadline (optional)</Label><Input type="date" value={newDeadline} onChange={e => setNewDeadline(e.target.value)} /></div>
            <div className="flex gap-2">
              <Button className="glow-amber">Create Goal</Button>
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Goals */}
      {active.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Active ({active.length})</h2>
          <div className="space-y-4">
            {active.map(goal => (
              <Card key={goal.id} className={goal.daysLeft !== null && goal.daysLeft < 14 && goal.progress < 50 ? "border-orange-500/30" : ""}>
                <CardContent className="py-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <Badge variant="outline" className="text-xs">{goal.type}</Badge>
                      </div>
                      {goal.deadline && (
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{goal.deadline}</span>
                          {goal.daysLeft !== null && (
                            <span className={`flex items-center gap-1 ${goal.daysLeft < 14 ? "text-orange-500 font-medium" : ""}`}>
                              <Clock className="h-3 w-3" />{goal.daysLeft} days left
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-lg font-bold">{goal.progress}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-muted mb-3">
                    <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${goal.progress}%` }} />
                  </div>

                  {/* AI Tip */}
                  <div className="rounded-lg bg-primary/5 border border-primary/10 px-3 py-2 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">AI: </span>{goal.aiTip}
                  </div>

                  {goal.daysLeft !== null && goal.daysLeft < 14 && goal.progress < 50 && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-orange-500">
                      <AlertTriangle className="h-3.5 w-3.5" />Deadline approaching — you may need to increase study time.
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">Completed <Trophy className="h-4 w-4 text-primary" /></h2>
          <div className="space-y-3">
            {completed.map(goal => (
              <Card key={goal.id} className="border-green-500/20 opacity-80">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10"><Check className="h-5 w-5 text-green-500" /></div>
                  <div className="flex-1">
                    <p className="font-medium">{goal.title}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500/30">Done</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
