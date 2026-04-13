"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Layers, GraduationCap, Zap, Brain, ArrowRight, Check, X, RotateCcw, Trophy, Loader2 } from "lucide-react";

interface Exercise {
  id: string;
  type: string;
  question: string;
  options: string[] | null;
  correctAnswer: number | string;
  explanation: string;
  difficulty: number;
  topic: string;
}

export default function PracticePage() {
  const t = useTranslations("practice");
  const tc = useTranslations("common");
  const [mode, setMode] = useState<"menu" | "practice" | "results">("menu");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; exerciseId: string }[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/exercises")
      .then(r => r.ok ? r.json() : [])
      .then(setExercises)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function startPractice() {
    if (exercises.length === 0) return;
    setMode("practice"); setCurrentQ(0); setAnswers([]); setSelected(null); setSubmitted(false);
  }

  function handleSubmit() {
    if (selected === null) return;
    const ex = exercises[currentQ]!;
    const correctIdx = typeof ex.correctAnswer === "number" ? ex.correctAnswer : parseInt(String(ex.correctAnswer));
    const correct = selected === correctIdx;
    setAnswers(prev => [...prev, { correct, exerciseId: ex.id }]);
    setSubmitted(true);
  }

  function handleNext() {
    if (currentQ < exercises.length - 1) {
      setCurrentQ(prev => prev + 1); setSelected(null); setSubmitted(false);
    } else {
      setMode("results");
    }
  }

  const score = answers.filter(a => a.correct).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (mode === "menu") return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>

      {exercises.length === 0 ? (
        <Card className="mt-8 border-dashed">
          <CardContent className="py-16 text-center">
            <Dumbbell className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">{t("noExercises")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("noExercisesDesc")}</p>
            <Link href="/learn"><Button className="mt-4">{t("startLearning")}</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PracticeCard icon={<Dumbbell className="h-6 w-6" />} title={t("quickPractice")} desc={t("quickPracticeDesc")} badge={`${exercises.length} ${tc("lessons")}`} onClick={startPractice} />
          <PracticeCard icon={<Zap className="h-6 w-6" />} title={t("dailyChallenge")} desc={t("dailyChallengeDesc")} badge="50 XP bonus" onClick={startPractice} />
          <PracticeCard icon={<Brain className="h-6 w-6" />} title={t("weakPoints")} desc={t("weakPointsDesc")} badge={t("aiSelected")} onClick={startPractice} />
          <Link href="/practice/flashcards"><PracticeCard icon={<Layers className="h-6 w-6" />} title={t("flashcardReview")} desc={t("flashcardReviewDesc")} badge={t("dueForReview")} /></Link>
          <Link href="/practice/exam-sim"><PracticeCard icon={<GraduationCap className="h-6 w-6" />} title={t("examSimulator")} desc={t("examSimulatorDesc")} badge={t("exams")} /></Link>
          <PracticeCard icon={<Trophy className="h-6 w-6" />} title={t("timedChallenge")} desc={t("timedChallengeDesc")} badge={t("leaderboard")} onClick={startPractice} />
        </div>
      )}
    </div>
  );

  if (mode === "results") return (
    <div className="p-6 lg:p-8 max-w-lg mx-auto text-center">
      <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${score >= exercises.length * 0.7 ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
        <Trophy className={`h-10 w-10 ${score >= exercises.length * 0.7 ? "text-green-500" : "text-yellow-500"}`} />
      </div>
      <h1 className="text-2xl font-bold">{t("practiceComplete")}</h1>
      <p className="mt-2 text-4xl font-bold text-primary">{score}/{exercises.length}</p>
      <p className="text-muted-foreground">{t("correctAnswers")}</p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {answers.map((a, i) => (
          <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${a.correct ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
            {a.correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Button variant="outline" onClick={() => setMode("menu")}><ArrowRight className="mr-2 h-4 w-4 rotate-180" />{tc("back")}</Button>
        <Button onClick={startPractice} className="glow-amber"><RotateCcw className="mr-2 h-4 w-4" />{t("practiceAgain")}</Button>
      </div>
    </div>
  );

  const ex = exercises[currentQ]!;
  const correctIdx = typeof ex.correctAnswer === "number" ? ex.correctAnswer : parseInt(String(ex.correctAnswer));
  const isCorrect = selected === correctIdx;
  const options = (ex.options as string[]) ?? [];

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{t("question")} {currentQ + 1} / {exercises.length}</span>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{ex.topic}</Badge>
          <Badge variant="secondary" className="text-xs">{t("difficulty")} {ex.difficulty}/10</Badge>
        </div>
      </div>
      <div className="mb-8 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${((currentQ + (submitted ? 1 : 0)) / exercises.length) * 100}%` }} /></div>

      <Card>
        <CardContent className="pt-6">
          <p className="text-base font-semibold whitespace-pre-line mb-4">{ex.question}</p>

          <div className="space-y-2">
            {options.map((opt, i) => {
              let style = "border-border/50 hover:border-primary/30";
              if (submitted && i === correctIdx) style = "border-green-500 bg-green-500/10";
              else if (submitted && i === selected && !isCorrect) style = "border-red-500 bg-red-500/10";
              else if (!submitted && i === selected) style = "border-primary bg-primary/10";

              return (
                <button key={i} onClick={() => !submitted && setSelected(i)} disabled={submitted}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm transition-all ${style}`}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{opt}</span>
                  {submitted && i === correctIdx && <Check className="h-4 w-4 text-green-500" />}
                  {submitted && i === selected && !isCorrect && <X className="h-4 w-4 text-red-500" />}
                </button>
              );
            })}
          </div>

          {submitted && (
            <div className={`mt-4 rounded-lg p-4 text-sm ${isCorrect ? "bg-green-500/10" : "bg-red-500/10"}`}>
              <p className={`font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>{isCorrect ? t("correct") : t("notQuite")}</p>
              <p className="mt-1 text-muted-foreground">{ex.explanation}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {!submitted ? (
              <Button onClick={handleSubmit} disabled={selected === null}>{t("checkAnswer")}</Button>
            ) : (
              <Button onClick={handleNext} className="glow-amber">
                {currentQ < exercises.length - 1 ? t("nextQuestion") : t("seeResults")}<ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PracticeCard({ icon, title, desc, badge, onClick }: { icon: React.ReactNode; title: string; desc: string; badge: string; onClick?: () => void }) {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper onClick={onClick} className="flex flex-col items-start rounded-xl border border-border/50 bg-card p-6 text-left transition-all hover:border-primary/30 hover:bg-primary/5 w-full">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground flex-1">{desc}</p>
      <Badge variant="secondary" className="mt-3 text-xs">{badge}</Badge>
    </Wrapper>
  );
}
