"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileCheck, Flag, AlertTriangle, CheckCircle2, XCircle,
  Eye, Sparkles, MessageSquare, BookOpen, Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const flagged = [
  { id: "f1", type: "ai_output", source: "AI Chat", content: "The answer contains a mathematical error in the Pythagorean theorem explanation.", reportedBy: "user:maria.p@gmail.com", severity: "high", flagged: "2h ago", category: "Accuracy" },
  { id: "f2", type: "user_content", source: "Study Group #42", content: "User shared external link that may be a phishing attempt.", reportedBy: "user:dan.i@yahoo.com", severity: "urgent", flagged: "3h ago", category: "Security" },
  { id: "f3", type: "ai_output", source: "Lesson Tutor", content: "AI response was incomplete and missed key concept about async/await.", reportedBy: "user:alex@techcorp.com", severity: "medium", flagged: "5h ago", category: "Quality" },
  { id: "f4", type: "user_content", source: "Group Chat", content: "Inappropriate language in peer discussion.", reportedBy: "system:auto", severity: "medium", flagged: "6h ago", category: "Moderation" },
  { id: "f5", type: "ai_output", source: "Exam Predictor", content: "Prediction listed incorrect curriculum topic for 2026 updated exam.", reportedBy: "user:chris@de.edu", severity: "high", flagged: "1 day ago", category: "Accuracy" },
];

const aiGenerated = [
  { id: "g1", title: "GDPR Training for Non-Technical Staff", creator: "TechCorp SRL (admin)", wordCount: 4820, lessons: 8, status: "pending_review", created: "1h ago" },
  { id: "g2", title: "Advanced Python Async Patterns", creator: "Universitatea BBU (teacher)", wordCount: 8140, lessons: 12, status: "pending_review", created: "3h ago" },
  { id: "g3", title: "Retail Sales Fundamentals 2026", creator: "Acme Corp (admin)", wordCount: 6420, lessons: 10, status: "approved", created: "Yesterday" },
  { id: "g4", title: "Kubernetes for Non-DevOps", creator: "StartupX GmbH (admin)", wordCount: 7240, lessons: 14, status: "rejected", created: "2 days ago" },
];

const severityStyles: Record<string, string> = {
  urgent: "bg-red-500/20 text-red-400",
  high: "bg-orange-500/20 text-orange-400",
  medium: "bg-amber-500/20 text-amber-400",
  low: "bg-blue-500/20 text-blue-400",
};

export default function AdminContentPage() {
  const [tab, setTab] = useState<"flagged" | "ai">("flagged");

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content Review</h1>
          <p className="mt-1 text-sm text-muted-foreground">Moderation queue and AI-generated content review</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Flag className="h-8 w-8 text-red-500" /><div><p className="text-2xl font-bold">{flagged.filter(f => f.severity === "urgent").length}</p><p className="text-xs text-muted-foreground">Urgent flags</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><AlertTriangle className="h-8 w-8 text-orange-500" /><div><p className="text-2xl font-bold">{flagged.length}</p><p className="text-xs text-muted-foreground">Open flags</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><Sparkles className="h-8 w-8 text-primary" /><div><p className="text-2xl font-bold">{aiGenerated.filter(g => g.status === "pending_review").length}</p><p className="text-xs text-muted-foreground">Pending AI review</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><CheckCircle2 className="h-8 w-8 text-green-500" /><div><p className="text-2xl font-bold">84%</p><p className="text-xs text-muted-foreground">Auto-approve rate</p></div></div></CardContent></Card>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg border border-border/50 p-1 w-fit">
        <button
          onClick={() => setTab("flagged")}
          className={cn(
            "rounded px-4 py-1.5 text-sm font-medium transition-colors",
            tab === "flagged" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Flagged Content ({flagged.length})
        </button>
        <button
          onClick={() => setTab("ai")}
          className={cn(
            "rounded px-4 py-1.5 text-sm font-medium transition-colors",
            tab === "ai" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          AI-Generated ({aiGenerated.length})
        </button>
      </div>

      {/* Flagged */}
      {tab === "flagged" && (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {flagged.map(f => {
                const Icon = f.type === "ai_output" ? Sparkles : MessageSquare;
                return (
                  <div key={f.id} className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge className={cn("text-[10px] capitalize", severityStyles[f.severity])}>{f.severity}</Badge>
                          <Badge variant="outline" className="text-[10px]">{f.category}</Badge>
                          <span className="text-xs text-muted-foreground">{f.source}</span>
                        </div>
                        <p className="text-sm">{f.content}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Reported by {f.reportedBy} · {f.flagged}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-green-500"><CheckCircle2 className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><XCircle className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Generated */}
      {tab === "ai" && (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {aiGenerated.map(g => (
                <div key={g.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{g.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">
                      By {g.creator} · {g.lessons} lessons · {g.wordCount.toLocaleString()} words · {g.created}
                    </p>
                  </div>
                  {g.status === "pending_review" && <Badge className="bg-amber-500/20 text-amber-400">Pending</Badge>}
                  {g.status === "approved" && <Badge className="bg-green-500/20 text-green-500">Approved</Badge>}
                  {g.status === "rejected" && <Badge className="bg-red-500/20 text-red-400">Rejected</Badge>}
                  <Button variant="outline" size="sm">Review</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
