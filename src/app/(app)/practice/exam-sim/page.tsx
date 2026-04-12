"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Clock, Play, Flag, ChevronLeft, ChevronRight, Check, X, Trophy, ArrowRight, AlertTriangle } from "lucide-react";

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

const EXAMS = [
  {
    id: "permis-ro",
    name: "Permis Auto Romania",
    description: "Simulare examen legislatie rutiera — 26 intrebari, 30 minute",
    questions: 26,
    timeMinutes: 30,
    passingScore: 22,
    country: "RO",
  },
  {
    id: "python-cert",
    name: "Python Fundamentals Cert",
    description: "Test your Python knowledge — 15 questions, 20 minutes",
    questions: 15,
    timeMinutes: 20,
    passingScore: 11,
    country: "EN",
  },
];

const EXAM_QUESTIONS: ExamQuestion[] = [
  { id: "eq1", question: "Ce forma au indicatoarele de avertizare?", options: ["Cerc", "Patrat", "Triunghi cu varf in sus", "Octogon"], correct: 2, explanation: "Indicatoarele de avertizare au forma triunghiulara cu varful in sus si chenar rosu.", category: "Legislatie" },
  { id: "eq2", question: "Care este viteza maxima in localitate?", options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"], correct: 2, explanation: "Viteza maxima admisa in localitate este de 50 km/h, daca nu exista indicatoare care sa specifice altfel.", category: "Legislatie" },
  { id: "eq3", question: "Ce semnifica indicatorul STOP?", options: ["Reducerea vitezei", "Oprire obligatorie", "Prioritate", "Parcare interzisa"], correct: 1, explanation: "Indicatorul STOP impune oprirea obligatorie la intersectie si acordarea prioritatii.", category: "Legislatie" },
  { id: "eq4", question: "Cand este obligatoriu centura de siguranta?", options: ["Doar pe autostrada", "Doar in oras", "Doar pe drumuri nationale", "Intotdeauna"], correct: 3, explanation: "Centura de siguranta este obligatorie in toate situatiile, atat in localitate cat si in afara localitatii.", category: "Legislatie" },
  { id: "eq5", question: "Ce inseamna lumina rosie a semaforului?", options: ["Atentie", "Oprire", "Liber", "Avarie"], correct: 1, explanation: "Lumina rosie a semaforului impune oprirea vehiculului.", category: "Legislatie" },
  { id: "eq6", question: "What is the output of: len('Hello')?", options: ["4", "5", "6", "Error"], correct: 1, explanation: "'Hello' has 5 characters, so len() returns 5.", category: "Python" },
  { id: "eq7", question: "Which keyword defines a function in Python?", options: ["function", "func", "def", "fn"], correct: 2, explanation: "Python uses 'def' to define functions: def my_function():", category: "Python" },
  { id: "eq8", question: "What does 'break' do in a loop?", options: ["Pauses the loop", "Exits the loop", "Skips current iteration", "Restarts the loop"], correct: 1, explanation: "'break' immediately exits the loop entirely. 'continue' skips to the next iteration.", category: "Python" },
  { id: "eq9", question: "Which is immutable?", options: ["list", "dict", "set", "tuple"], correct: 3, explanation: "Tuples are immutable — once created, their elements cannot be changed.", category: "Python" },
  { id: "eq10", question: "What is 2 ** 3?", options: ["5", "6", "8", "9"], correct: 2, explanation: "** is the power operator. 2 ** 3 = 2³ = 8.", category: "Python" },
];

type Phase = "select" | "exam" | "results";

export default function ExamSimPage() {
  const t = useTranslations("learn");
  const tc = useTranslations("common");
  const [phase, setPhase] = useState<Phase>("select");
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [examInfo, setExamInfo] = useState(EXAMS[0]!);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  function startExam(examId: string) {
    const exam = EXAMS.find(e => e.id === examId)!;
    setExamInfo(exam);
    const qs = EXAM_QUESTIONS.slice(0, exam.questions);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setFlagged(new Set());
    setCurrentQ(0);
    setTimeLeft(exam.timeMinutes * 60);
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

  // SELECT
  if (phase === "select") return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2"><GraduationCap className="h-6 w-6 text-primary" />Exam Simulator</h1>
      <p className="mt-1 text-sm text-muted-foreground mb-8">Simulate real exam conditions with timer.</p>
      <div className="space-y-4">
        {EXAMS.map(exam => (
          <Card key={exam.id} className="hover:border-primary/30 transition-all">
            <CardContent className="flex items-center gap-4 py-5">
              <div className="flex-1">
                <h3 className="font-semibold">{exam.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{exam.description}</p>
                <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                  <span>{exam.questions} questions</span>
                  <span>{exam.timeMinutes} min</span>
                  <span>Pass: {exam.passingScore}/{exam.questions}</span>
                </div>
              </div>
              <Button onClick={() => startExam(exam.id)}><Play className="mr-2 h-4 w-4" />Start</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // RESULTS
  if (phase === "results") {
    const score = questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
    const passed = score >= examInfo.passingScore;
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${passed ? "bg-green-500/10" : "bg-red-500/10"}`}>
            <Trophy className={`h-10 w-10 ${passed ? "text-green-500" : "text-red-500"}`} />
          </div>
          <h1 className="text-2xl font-bold">{passed ? "Exam Passed!" : "Exam Failed"}</h1>
          <p className="text-4xl font-bold mt-2">{score}/{questions.length}</p>
          <p className="text-muted-foreground">Pass mark: {examInfo.passingScore}/{questions.length}</p>
          <Badge className="mt-2" variant={passed ? "default" : "destructive"}>{passed ? "PASSED" : "FAILED"}</Badge>
        </div>

        {/* Question review */}
        <h2 className="text-lg font-semibold mb-4">Review Answers</h2>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correct;
            return (
              <Card key={q.id} className={correct ? "border-green-500/20" : "border-red-500/20"}>
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${correct ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                      {correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{q.question}</p>
                      {!correct && <p className="text-xs text-muted-foreground mt-1">Your answer: {q.options[answers[i] ?? 0]} | Correct: {q.options[q.correct]}</p>}
                      <p className="text-xs text-muted-foreground mt-1">{q.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={() => setPhase("select")}>Back to Exams</Button>
          <Button onClick={() => startExam(examInfo.id)} className="glow-amber">Retry<ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </div>
    );
  }

  // EXAM
  const q = questions[currentQ]!;
  const answered = answers.filter(a => a !== null).length;

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold">{examInfo.name}</h2>
        <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-mono font-bold ${timeLeft < 300 ? "bg-red-500/10 text-red-400" : "bg-muted text-foreground"}`}>
          <Clock className="h-4 w-4" />
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
      </div>

      {/* Question nav grid */}
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

      {/* Question */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">Question {currentQ + 1}/{questions.length}</Badge>
            <button onClick={toggleFlag} className={`flex items-center gap-1 text-sm transition-colors ${flagged.has(currentQ) ? "text-yellow-500" : "text-muted-foreground hover:text-foreground"}`}>
              <Flag className="h-4 w-4" />{flagged.has(currentQ) ? "Flagged" : "Flag"}
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

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" disabled={currentQ === 0} onClick={() => setCurrentQ(currentQ - 1)}><ChevronLeft className="mr-1 h-4 w-4" />Prev</Button>
            <span className="text-sm text-muted-foreground">{answered}/{questions.length} answered</span>
            {currentQ < questions.length - 1 ? (
              <Button onClick={() => setCurrentQ(currentQ + 1)}>Next<ChevronRight className="ml-1 h-4 w-4" /></Button>
            ) : (
              <Button onClick={submitExam} className="glow-amber">Submit Exam</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit warning */}
      {answered < questions.length && (
        <div className="mt-4 flex items-center gap-2 text-sm text-yellow-500">
          <AlertTriangle className="h-4 w-4" />
          <span>{questions.length - answered} questions unanswered</span>
        </div>
      )}
    </div>
  );
}
