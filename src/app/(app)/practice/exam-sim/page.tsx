"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Clock, Play, Flag, ChevronLeft, ChevronRight, Check, X, Trophy, ArrowRight, AlertTriangle, Loader2 } from "lucide-react";

interface ExamQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface ExamTemplate {
  id: string;
  name: string;
  description: string | null;
  totalQuestions: number;
  timeLimitMin: number | null;
  passingScore: number;
  country: string | null;
  questions: ExamQuestion[];
}

type Phase = "select" | "exam" | "results";

export default function ExamSimPage() {
  const t = useTranslations("examSim");
  const tc = useTranslations("common");
  const [exams, setExams] = useState<ExamTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>("select");
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [examInfo, setExamInfo] = useState<ExamTemplate | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/exams")
      .then(r => r.ok ? r.json() : [])
      .then(setExams)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (phase !== "exam" || timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current!); setPhase("results"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, timeLeft]);

  function startExam(exam: ExamTemplate) {
    setExamInfo(exam);
    const qs = (exam.questions as ExamQuestion[]).slice(0, exam.totalQuestions);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setFlagged(new Set());
    setCurrentQ(0);
    setTimeLeft((exam.timeLimitMin ?? 30) * 60);
    setPhase("exam");
  }

  function selectAnswer(idx: number) {
    setAnswers(prev => { const n = [...prev]; n[currentQ] = idx; return n; });
  }

  function toggleFlag() {
    setFlagged(prev => { const n = new Set(prev); if (n.has(currentQ)) n.delete(currentQ); else n.add(currentQ); return n; });
  }

  function submitExam() {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("results");
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // SELECT
  if (phase === "select") return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2"><GraduationCap className="h-6 w-6 text-primary" />{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground mb-8">{t("subtitle")}</p>

      {exams.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">{t("noExams")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("noExamsDesc")}</p>
            <Link href="/learn"><Button className="mt-4">{t("startLearning")}</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {exams.map(exam => (
            <Card key={exam.id} className="hover:border-primary/30 transition-all">
              <CardContent className="flex items-center gap-4 py-5">
                <div className="flex-1">
                  <h3 className="font-semibold">{exam.name}</h3>
                  {exam.description && <p className="text-sm text-muted-foreground mt-1">{exam.description}</p>}
                  <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                    <span>{exam.totalQuestions} {t("questions")}</span>
                    {exam.timeLimitMin && <span>{exam.timeLimitMin} min</span>}
                    <span>{t("passmark")}: {exam.passingScore}/{exam.totalQuestions}</span>
                  </div>
                </div>
                <Button onClick={() => startExam(exam)}><Play className="mr-2 h-4 w-4" />{t("start")}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  // RESULTS
  if (phase === "results" && examInfo) {
    const score = questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
    const passed = score >= examInfo.passingScore;
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${passed ? "bg-green-500/10" : "bg-red-500/10"}`}>
            <Trophy className={`h-10 w-10 ${passed ? "text-green-500" : "text-red-500"}`} />
          </div>
          <h1 className="text-2xl font-bold">{passed ? t("passed") : t("failed")}</h1>
          <p className="text-4xl font-bold mt-2">{score}/{questions.length}</p>
          <p className="text-muted-foreground">{t("passmark")}: {examInfo.passingScore}/{questions.length}</p>
          <Badge className="mt-2" variant={passed ? "default" : "destructive"}>{passed ? t("passedBadge") : t("failedBadge")}</Badge>
        </div>

        <h2 className="text-lg font-semibold mb-4">{t("reviewAnswers")}</h2>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correct;
            return (
              <Card key={i} className={correct ? "border-green-500/20" : "border-red-500/20"}>
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${correct ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                      {correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{q.question}</p>
                      {!correct && <p className="text-xs text-muted-foreground mt-1">{t("yourAnswer")}: {q.options[answers[i] ?? 0]} | {t("correctAnswer")}: {q.options[q.correct]}</p>}
                      <p className="text-xs text-muted-foreground mt-1">{q.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={() => setPhase("select")}>{t("backToExams")}</Button>
          <Button onClick={() => startExam(examInfo)} className="glow-amber">{t("retry")}<ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </div>
    );
  }

  // EXAM
  const q = questions[currentQ]!;
  const answered = answers.filter(a => a !== null).length;

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold">{examInfo?.name}</h2>
        <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-mono font-bold ${timeLeft < 300 ? "bg-red-500/10 text-red-400" : "bg-muted text-foreground"}`}>
          <Clock className="h-4 w-4" />
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {questions.map((_, i) => (
          <button key={i} onClick={() => setCurrentQ(i)}
            className={`h-8 w-8 rounded text-xs font-medium transition-all ${
              i === currentQ ? "bg-primary text-primary-foreground" :
              answers[i] !== null ? "bg-primary/20 text-primary" :
              flagged.has(i) ? "bg-yellow-500/20 text-yellow-500" :
              "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}>
            {i + 1}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">{t("question")} {currentQ + 1}/{questions.length}</Badge>
            <button onClick={toggleFlag} className={`flex items-center gap-1 text-sm transition-colors ${flagged.has(currentQ) ? "text-yellow-500" : "text-muted-foreground hover:text-foreground"}`}>
              <Flag className="h-4 w-4" />{flagged.has(currentQ) ? t("flagged") : t("flag")}
            </button>
          </div>

          <p className="text-base font-medium mb-4">{q.question}</p>

          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => selectAnswer(i)}
                className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm transition-all ${answers[currentQ] === i ? "border-primary bg-primary/10" : "border-border/50 hover:border-primary/30"}`}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
                {answers[currentQ] === i && <Check className="ml-auto h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" disabled={currentQ === 0} onClick={() => setCurrentQ(currentQ - 1)}><ChevronLeft className="mr-1 h-4 w-4" />{t("prev")}</Button>
            <span className="text-sm text-muted-foreground">{answered}/{questions.length} {t("answered")}</span>
            {currentQ < questions.length - 1 ? (
              <Button onClick={() => setCurrentQ(currentQ + 1)}>{t("next")}<ChevronRight className="ml-1 h-4 w-4" /></Button>
            ) : (
              <Button onClick={submitExam} className="glow-amber">{t("submitExam")}</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {answered < questions.length && (
        <div className="mt-4 flex items-center gap-2 text-sm text-yellow-500">
          <AlertTriangle className="h-4 w-4" />
          <span>{questions.length - answered} {t("unanswered")}</span>
        </div>
      )}
    </div>
  );
}
