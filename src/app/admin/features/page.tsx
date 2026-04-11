"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ToggleRight, Plus, AlertTriangle, Beaker } from "lucide-react";
import { cn } from "@/lib/utils";

type Flag = {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rollout: number;
  environment: "all" | "staging" | "production";
  audience: "all" | "beta" | "internal";
  updated: string;
};

const initialFlags: Flag[] = [
  { key: "voice_tutor_v2", name: "Voice Tutor v2", description: "New voice pipeline with reduced latency", enabled: true, rollout: 100, environment: "all", audience: "all", updated: "2 days ago" },
  { key: "panic_mode", name: "Panic Mode", description: "Emergency exam prep plan generator", enabled: true, rollout: 100, environment: "all", audience: "all", updated: "1 week ago" },
  { key: "ai_coach_weekly", name: "AI Coach Weekly Sessions", description: "Weekly 1-on-1 coaching session feature", enabled: true, rollout: 50, environment: "production", audience: "beta", updated: "Yesterday" },
  { key: "new_exam_predictor", name: "New Exam Predictor UI", description: "Redesigned exam predictor with skill gaps view", enabled: false, rollout: 20, environment: "staging", audience: "internal", updated: "3h ago" },
  { key: "collaborative_flashcards", name: "Collaborative Flashcards", description: "Share and collaborate on flashcard decks", enabled: false, rollout: 0, environment: "staging", audience: "internal", updated: "1 day ago" },
  { key: "mobile_push_v2", name: "Mobile Push Notifications v2", description: "Smarter, less intrusive notifications", enabled: true, rollout: 25, environment: "production", audience: "beta", updated: "4h ago" },
  { key: "xp_leaderboard_global", name: "Global XP Leaderboard", description: "Cross-organization leaderboard visibility", enabled: false, rollout: 0, environment: "all", audience: "all", updated: "2 weeks ago" },
  { key: "stripe_tax", name: "Stripe Tax (EU VAT)", description: "Automatic VAT calculation for EU customers", enabled: true, rollout: 100, environment: "production", audience: "all", updated: "1 month ago" },
];

export default function AdminFeaturesPage() {
  const [flags, setFlags] = useState(initialFlags);
  const [search, setSearch] = useState("");

  const toggle = (key: string) => {
    setFlags(flags.map(f => f.key === key ? { ...f, enabled: !f.enabled } : f));
  };

  const filtered = flags.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.key.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Feature Flags</h1>
          <p className="mt-1 text-sm text-muted-foreground">{flags.filter(f => f.enabled).length} enabled · {flags.length} total</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />New Flag</Button>
      </div>

      {/* Warning */}
      <Card className="mb-6 border-orange-500/30 bg-orange-500/5">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <div className="text-xs text-muted-foreground">
              Changes take effect within 30 seconds. Toggling flags in production affects real users immediately. All actions are logged.
            </div>
          </div>
        </CardContent>
      </Card>

      <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search flags by name or key..." className="mb-4 max-w-md" />

      <div className="space-y-3">
        {filtered.map(f => (
          <Card key={f.key}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggle(f.key)}
                  className={cn(
                    "relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors",
                    f.enabled ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                      f.enabled ? "translate-x-5" : "translate-x-0.5"
                    )}
                  />
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{f.name}</h3>
                    {f.audience === "beta" && <Badge className="bg-blue-500/20 text-blue-400 text-[10px]"><Beaker className="mr-1 h-2.5 w-2.5" />Beta</Badge>}
                    {f.audience === "internal" && <Badge className="bg-purple-500/20 text-purple-400 text-[10px]">Internal</Badge>}
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground">{f.key}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Rollout: </span>
                      <span className="font-semibold">{f.rollout}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Env: </span>
                      <span className="font-semibold capitalize">{f.environment}</span>
                    </div>
                    <div className="text-muted-foreground">
                      Updated {f.updated}
                    </div>
                  </div>

                  {f.rollout < 100 && (
                    <div className="mt-3 h-1 max-w-xs rounded-full bg-muted">
                      <div className="h-1 rounded-full bg-primary" style={{ width: `${f.rollout}%` }} />
                    </div>
                  )}
                </div>

                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
