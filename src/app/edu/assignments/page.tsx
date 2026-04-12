"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Plus, Calendar, Users, Check, Clock, Brain } from "lucide-react";

const ASSIGNMENTS = [
  { id: "1", title: "Python Variables Quiz", class: "Clasa a 10-a A", due: "Apr 12, 2026", submitted: 22, total: 28, avgScore: 78, status: "active" },
  { id: "2", title: "Loops Practice Set", class: "Clasa a 10-a A", due: "Apr 15, 2026", submitted: 15, total: 28, avgScore: null, status: "active" },
  { id: "3", title: "SEO Basics Quiz", class: "Clasa a 11-a A", due: "Apr 18, 2026", submitted: 0, total: 30, avgScore: null, status: "active" },
  { id: "4", title: "Module 1 Final Test", class: "Clasa a 10-a A", due: "Apr 20, 2026", submitted: 0, total: 28, avgScore: null, status: "upcoming" },
  { id: "5", title: "Math Basics Review", class: "Clasa a 10-a B", due: "Apr 5, 2026", submitted: 26, total: 26, avgScore: 82, status: "completed" },
];

export default function AssignmentsPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? ASSIGNMENTS : ASSIGNMENTS.filter(a => a.status === filter);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Assignments</h1><p className="mt-1 text-sm text-muted-foreground">Create, track, and grade student work.</p></div>
        <Button onClick={() => setShowCreate(!showCreate)}><Plus className="mr-2 h-4 w-4" />New Assignment</Button>
      </div>

      {showCreate && (
        <Card className="mb-6 border-primary/20">
          <CardContent className="pt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Title</Label><Input placeholder="e.g., Python Quiz Module 3" /></div>
              <div className="space-y-2"><Label>Class</Label><select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>Clasa a 10-a A</option><option>Clasa a 10-a B</option><option>Clasa a 11-a A</option></select></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Type</Label><select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>Quiz</option><option>Exercise Set</option><option>Lesson</option><option>Course</option></select></div>
              <div className="space-y-2"><Label>Due Date</Label><Input type="date" /></div>
            </div>
            <div className="rounded-lg bg-primary/5 border border-primary/10 p-3 flex items-start gap-2">
              <Brain className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">Tip: You can also type a topic and AI will auto-generate a quiz with questions tailored to your curriculum.</p>
            </div>
            <div className="flex gap-2"><Button className="glow-amber">Create Assignment</Button><Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button></div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {["all", "active", "upcoming", "completed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Assignments list */}
      <div className="space-y-3">
        {filtered.map(a => (
          <Card key={a.id} className={a.status === "completed" ? "opacity-70" : ""}>
            <CardContent className="flex items-center gap-4 py-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${a.status === "completed" ? "bg-green-500/10" : "bg-primary/10"}`}>
                {a.status === "completed" ? <Check className="h-5 w-5 text-green-500" /> : <FileText className="h-5 w-5 text-primary" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{a.title}</h3>
                  <Badge variant={a.status === "active" ? "default" : a.status === "completed" ? "secondary" : "outline"} className="text-xs">{a.status}</Badge>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{a.class}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{a.due}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{a.submitted}/{a.total}</p>
                <p className="text-xs text-muted-foreground">submitted</p>
                {a.avgScore && <Badge variant="secondary" className="mt-1 text-xs">Avg: {a.avgScore}%</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
