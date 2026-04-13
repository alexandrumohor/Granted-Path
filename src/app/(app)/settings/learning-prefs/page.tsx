"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, BookOpen, LayoutGrid, Code, MessageSquare, Layers, Brain } from "lucide-react";

const STYLES = [
  { id: "reading", label: "Reading", icon: BookOpen },
  { id: "visual", label: "Visual", icon: LayoutGrid },
  { id: "practice", label: "Hands-on", icon: Code },
  { id: "conversation", label: "Conversation", icon: MessageSquare },
  { id: "flashcards", label: "Flashcard-uri", icon: Layers },
  { id: "mix", label: "Mix", icon: Brain },
];

export default function LearningPrefsPage() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [pace, setPace] = useState("NORMAL");
  const [toughLove, setToughLove] = useState("BALANCED");
  const [styles, setStyles] = useState(["mix"]);
  const [saving, setSaving] = useState(false);

  function toggleStyle(id: string) {
    setStyles(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);
  }

  async function onSave() { setSaving(true); await new Promise(r => setTimeout(r, 1000)); setSaving(false); }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Learning Preferences</h1>
      <p className="mt-1 text-sm text-muted-foreground">Customize how the AI teaches you.</p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Learning Pace</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-2">{["SLOW", "NORMAL", "FAST"].map(p => (
              <button key={p} onClick={() => setPace(p)} className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${pace === p ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}>
                {p === "SLOW" ? "Slow & Thorough" : p === "NORMAL" ? "Balanced" : "Fast & Concise"}
              </button>
            ))}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">AI Correction Style</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">How should the AI correct you when you&apos;re wrong?</p>
            <div className="flex gap-2">{["GENTLE", "BALANCED", "STRICT"].map(t => (
              <button key={t} onClick={() => setToughLove(t)} className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${toughLove === t ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}>
                {t === "GENTLE" ? "Gentle" : t === "BALANCED" ? "Balanced" : "Strict"}
              </button>
            ))}</div>
            <div className="mt-3 text-xs text-muted-foreground">
              {toughLove === "GENTLE" && "Warm corrections with encouragement. Best for building confidence."}
              {toughLove === "BALANCED" && "Direct but respectful. Clear about what's wrong and why."}
              {toughLove === "STRICT" && "Blunt and no sugar-coating. Like a demanding professor."}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Preferred Learning Style</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">{STYLES.map(s => {
              const sel = styles.includes(s.id); const Icon = s.icon;
              return <button key={s.id} onClick={() => toggleStyle(s.id)} className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${sel ? "border-primary bg-primary/10 text-primary" : "border-border/50 hover:border-primary/30"}`}><Icon className="h-5 w-5" /><span className="text-xs font-medium">{s.label}</span></button>;
            })}</div>
          </CardContent>
        </Card>

        <div className="flex justify-end"><Button onClick={onSave} disabled={saving}>{saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Preferences"}</Button></div>
      </div>
    </div>
  );
}
