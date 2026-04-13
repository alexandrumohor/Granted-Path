"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mic, MicOff, Volume2, Settings2, Languages, Gauge,
  User, Bot, Waves, Sparkles, Play, Pause,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Turn = { speaker: "user" | "ai"; text: string; duration?: number };

const initialTurns: Turn[] = [
  { speaker: "ai", text: "Hi! I'm your voice tutor. What would you like to practice today — we can do conversation, grammar review, or a topic of your choice?", duration: 6 },
  { speaker: "user", text: "Let's talk about dependency injection in Python, I'm struggling with it.", duration: 4 },
  { speaker: "ai", text: "Great pick. Let's start simple — can you tell me, in your own words, why dependency injection exists? Don't worry about being precise, just explain it how you understand it now.", duration: 8 },
];

const voices = [
  { id: "alice", name: "Alice", lang: "Engleza (US)", accent: "Natural" },
  { id: "carlos", name: "Carlos", lang: "Spaniola", accent: "Latino-americana" },
  { id: "sofia", name: "Sofia", lang: "Română", accent: "Standard" },
  { id: "james", name: "James", lang: "Engleza (UK)", accent: "Pronuntie Standard" },
];

export default function VoiceTutorPage() {
  const [recording, setRecording] = useState(false);
  const t = useTranslations("voice");
  const [turns] = useState<Turn[]>(initialTurns);
  const [selectedVoice, setSelectedVoice] = useState("alice");
  const [speed, setSpeed] = useState(1);
  const [bars, setBars] = useState<number[]>(Array(24).fill(10));

  useEffect(() => {
    if (!recording) {
      setBars(Array(24).fill(10));
      return;
    }
    const i = setInterval(() => {
      setBars(Array.from({ length: 24 }, () => Math.floor(Math.random() * 60) + 10));
    }, 120);
    return () => clearInterval(i);
  }, [recording]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Transcript */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Waves className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">{t("title")}</h1>
              <p className="text-xs text-muted-foreground">{t("subtitle")}</p>
            </div>
          </div>
          <Badge className="bg-green-500/20 text-green-500">
            <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            Live
          </Badge>
        </div>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {turns.map((t, i) => (
            <div key={i} className={cn("flex gap-3", t.speaker === "user" ? "flex-row-reverse" : "")}>
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", t.speaker === "user" ? "bg-muted" : "bg-primary/10")}>
                {t.speaker === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
              </div>
              <div className={cn("max-w-[70%] rounded-2xl px-4 py-3", t.speaker === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border/50")}>
                <p className="text-sm leading-relaxed">{t.text}</p>
                <div className={cn("mt-2 flex items-center gap-2 text-xs", t.speaker === "user" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {t.speaker === "ai" && <button className="hover:text-foreground"><Play className="h-3 w-3" /></button>}
                  <Waves className="h-3 w-3" />
                  <span>{t.duration}s</span>
                </div>
              </div>
            </div>
          ))}

          {recording && (
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <User className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-muted/60 px-4 py-3">
                <span className="text-xs text-muted-foreground">{t("listening")}</span>
              </div>
            </div>
          )}
        </div>

        {/* Waveform + Mic */}
        <div className="border-t border-border/50 bg-card/30 p-6">
          <div className="mb-4 flex h-16 items-center justify-center gap-1">
            {bars.map((h, i) => (
              <div
                key={i}
                className={cn("w-1 rounded-full transition-all duration-100", recording ? "bg-primary" : "bg-muted")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <Volume2 className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => setRecording(!recording)}
              size="icon"
              className={cn("h-16 w-16 rounded-full transition-all", recording && "animate-pulse bg-red-500 hover:bg-red-600")}
            >
              {recording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <Pause className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {recording ? t("tapToStop") : t("tapToStart")}
          </p>
        </div>
      </div>

      {/* Settings Panel */}
      <aside className="hidden w-80 flex-col border-l border-border/50 bg-card/30 lg:flex">
        <div className="border-b border-border/50 px-5 py-4">
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            <h2 className="text-sm font-semibold">{t("settings")}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Languages className="h-3.5 w-3.5" />AI Voice
            </label>
            <div className="space-y-2">
              {voices.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVoice(v.id)}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left transition-colors",
                    selectedVoice === v.id ? "border-primary bg-primary/10" : "border-border/50 hover:bg-muted/50"
                  )}
                >
                  <p className="text-sm font-medium">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.lang} · {v.accent}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-2"><Gauge className="h-3.5 w-3.5" />{t("speed")}</span>
              <span className="font-mono">{speed.toFixed(1)}x</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={e => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">{t("proTip")}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("proTipText")}
              </p>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}
