"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mic, Volume2, SkipForward, SkipBack, CheckCircle2,
  AlertCircle, TrendingUp, Target, Languages, Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const practiceSet = {
  lang: "English",
  level: "Intermediate",
  items: [
    { phrase: "The quick brown fox jumps over the lazy dog.", phonetic: "/ðə kwɪk braʊn fɒks dʒʌmps ˈoʊvər ðə ˈleɪzi dɒɡ/" },
    { phrase: "She sells seashells by the seashore.", phonetic: "/ʃi sɛlz ˈsiːʃɛlz baɪ ðə ˈsiːʃɔːr/" },
    { phrase: "How much wood would a woodchuck chuck?", phonetic: "/haʊ mʌtʃ wʊd wʊd ə ˈwʊdtʃʌk tʃʌk/" },
  ],
};

const lastScore = {
  overall: 84,
  accuracy: 88,
  fluency: 79,
  intonation: 82,
  pace: "Good",
  issues: [
    { word: "quick", problem: "k sound unclear", severity: "minor" },
    { word: "over", problem: "vowel shortened", severity: "minor" },
    { word: "lazy", problem: "z sound missing", severity: "moderate" },
  ],
  strengths: ["Clear articulation of consonants", "Natural rhythm", "Good stress on key words"],
};

export default function PronunciationPage() {
  const [idx, setIdx] = useState(0);
  const t = useTranslations("pronunciation");
  const [recording, setRecording] = useState(false);
  const [showScore, setShowScore] = useState(true);
  const current = practiceSet.items[idx]!;

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
            <Languages className="h-4 w-4" />
            {practiceSet.lang} · {practiceSet.level}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{idx + 1} / {practiceSet.items.length}</Badge>
          <Badge className="bg-primary/20 text-primary"><Trophy className="mr-1 h-3 w-3" />Streak 7</Badge>
        </div>
      </div>

      {/* Practice Card */}
      <Card className="mb-6">
        <CardContent className="pt-8 pb-8">
          <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">{t("repeatAfter")}</p>
          <p className="text-3xl font-bold leading-relaxed">{current.phrase}</p>
          <p className="mt-3 font-mono text-sm text-muted-foreground">{current.phonetic}</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <Volume2 className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => { setRecording(!recording); if (recording) setShowScore(true); }}
              size="icon"
              className={cn("h-16 w-16 rounded-full", recording && "animate-pulse bg-red-500 hover:bg-red-600")}
            >
              <Mic className="h-7 w-7" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <Volume2 className="h-5 w-5 opacity-50" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => setIdx(Math.min(practiceSet.items.length - 1, idx + 1))} disabled={idx === practiceSet.items.length - 1}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            {recording ? t("speakNow") : t("tapToRecord")}
          </p>
        </CardContent>
      </Card>

      {showScore && (
        <>
          {/* Score Overview */}
          <div className="mb-6 grid gap-4 sm:grid-cols-4">
            <Card className="border-primary/30">
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-primary">{lastScore.overall}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("overallScore")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2"><Target className="h-4 w-4 text-primary" /><span className="text-xs text-muted-foreground">{t("accuracy")}</span></div>
                <p className="text-2xl font-bold">{lastScore.accuracy}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2"><TrendingUp className="h-4 w-4 text-blue-400" /><span className="text-xs text-muted-foreground">{t("fluency")}</span></div>
                <p className="text-2xl font-bold">{lastScore.fluency}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2"><Volume2 className="h-4 w-4 text-amber-400" /><span className="text-xs text-muted-foreground">{t("intonation")}</span></div>
                <p className="text-2xl font-bold">{lastScore.intonation}%</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Issues */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  Areas to Improve
                </h3>
                <div className="space-y-3">
                  {lastScore.issues.map((iss, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-border/50 p-3">
                      <div className={cn("h-2 w-2 mt-1.5 rounded-full shrink-0", iss.severity === "moderate" ? "bg-orange-500" : "bg-amber-500")} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">&ldquo;{iss.word}&rdquo;</p>
                        <p className="text-xs text-muted-foreground">{iss.problem}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Volume2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {lastScore.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
