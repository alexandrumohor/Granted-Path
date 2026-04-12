"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Layers, GraduationCap, Zap, Brain, ArrowRight, Check, X, RotateCcw, Trophy } from "lucide-react";

// Mock exercises
const EXERCISES = [
  { id: "1", type: "MULTIPLE_CHOICE", topic: "Python", difficulty: 3, question: "What is the output of: print(type(3.14))?", options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'double'>"], correct: 1, explanation: "3.14 is a decimal number, so Python classifies it as float. Python doesn't have a 'double' type." },
  { id: "2", type: "TRUE_FALSE", topic: "Python", difficulty: 2, question: "In Python, indentation is optional and only for readability.", options: ["True", "False"], correct: 1, explanation: "False! Python uses indentation to define code blocks. It's mandatory, not optional. Wrong indentation causes IndentationError." },
  { id: "3", type: "MULTIPLE_CHOICE", topic: "Marketing", difficulty: 2, question: "What does SEO stand for?", options: ["Social Engine Optimization", "Search Engine Optimization", "Search Email Outreach", "Site Enhancement Operations"], correct: 1, explanation: "SEO = Search Engine Optimization — the practice of optimizing websites to rank higher in search results." },
  { id: "4", type: "MULTIPLE_CHOICE", topic: "Python", difficulty: 4, question: "What will this print?\n\nx = [1, 2, 3]\ny = x\ny.append(4)\nprint(len(x))", options: ["3", "4", "Error", "None"], correct: 1, explanation: "y = x doesn't copy the list — both variables point to the same list in memory. So appending to y also affects x. len(x) is 4." },
  { id: "5", type: "TRUE_FALSE", topic: "Marketing", difficulty: 3, question: "PPC (Pay-Per-Click) means you pay every time your ad is displayed.", options: ["True", "False"], correct: 1, explanation: "False! PPC means you pay when someone CLICKS your ad, not when it's displayed. Paying per display is called CPM (Cost Per Mille)." },
  { id: "6", type: "MULTIPLE_CHOICE", topic: "JavaScript", difficulty: 3, question: "What is the difference between == and === in JavaScript?", options: ["No difference", "=== checks type too", "== is for strings only", "=== is deprecated"], correct: 1, explanation: "== does type coercion (\"5\" == 5 is true), while === checks both value AND type (\"5\" === 5 is false). Always prefer ===." },
];

export default function PracticePage() {
  const t = useTranslations("learn");
  const tc = useTranslations("common");
  const [mode, setMode] = useState<"menu" | "practice" | "results">("menu");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; exerciseId: string }[]>([]);
  const [exercises] = useState(EXERCISES);

  function startPractice() {
    setMode("practice"); setCurrentQ(0); setAnswers([]); setSelected(null); setSubmitted(false);
  }

  function handleSubmit() {
    if (selected === null) return;
    const ex = exercises[currentQ]!;
    const correct = selected === ex.correct;
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

  // Menu
  if (mode === "menu") return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold">{tc("practice") || "Practice"}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sharpen your skills with exercises, quizzes, and flashcards.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PracticeCard icon={<Dumbbell className="h-6 w-6" />} title="Quick Practice" desc="Mixed exercises from your topics. Adaptive difficulty." badge={`${exercises.length} exercises`} onClick={startPractice} />
        <PracticeCard icon={<Zap className="h-6 w-6" />} title="Daily Challenge" desc="5 exercises picked for your weak spots. Bonus XP!" badge="50 XP bonus" onClick={startPractice} />
        <PracticeCard icon={<Brain className="h-6 w-6" />} title="Weak Spots" desc="Focus on topics where you scored lowest." badge="AI Selected" onClick={startPractice} />
        <Link href="/practice/flashcards"><PracticeCard icon={<Layers className="h-6 w-6" />} title="Flashcard Review" desc="Spaced repetition — review before you forget." badge="8 due" /></Link>
        <Link href="/practice/exam-sim"><PracticeCard icon={<GraduationCap className="h-6 w-6" />} title="Exam Simulator" desc="Simulate real exam conditions with timer." badge="3 exams" /></Link>
        <PracticeCard icon={<Trophy className="h-6 w-6" />} title="Timed Challenge" desc="How many can you answer in 5 minutes?" badge="Leaderboard" onClick={startPractice} />
      </div>
    </div>
  );

  // Results
  if (mode === "results") return (
    <div className="p-6 lg:p-8 max-w-lg mx-auto text-center">
      <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${score >= exercises.length * 0.7 ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
        <Trophy className={`h-10 w-10 ${score >= exercises.length * 0.7 ? "text-green-500" : "text-yellow-500"}`} />
      </div>
      <h1 className="text-2xl font-bold">Practice Complete!</h1>
      <p className="mt-2 text-4xl font-bold text-primary">{score}/{exercises.length}</p>
      <p className="text-muted-foreground">correct answers</p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {answers.map((a, i) => (
          <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${a.correct ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
            {a.correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-primary/5 border border-primary/20 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-primary mb-1">AI Analysis</p>
        {score === exercises.length ? "Perfect score! You've mastered these topics." :
         score >= exercises.length * 0.7 ? "Good job! Review the questions you missed — they reveal small gaps." :
         "You need more practice on these topics. I recommend revisiting the lessons before trying again."}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Button variant="outline" onClick={() => setMode("menu")}><ArrowRight className="mr-2 h-4 w-4 rotate-180" />Back</Button>
        <Button onClick={startPractice} className="glow-amber"><RotateCcw className="mr-2 h-4 w-4" />Practice Again</Button>
      </div>
    </div>
  );

  // Practice mode
  const ex = exercises[currentQ]!;
  const isCorrect = selected === ex.correct;

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Question {currentQ + 1} of {exercises.length}</span>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{ex.topic}</Badge>
          <Badge variant="secondary" className="text-xs">Difficulty {ex.difficulty}/5</Badge>
        </div>
      </div>
      <div className="mb-8 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${((currentQ + (submitted ? 1 : 0)) / exercises.length) * 100}%` }} /></div>

      {/* Question */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-base font-semibold whitespace-pre-line mb-4">{ex.question}</p>

          <div className="space-y-2">
            {ex.options.map((opt, i) => {
              let style = "border-border/50 hover:border-primary/30";
              if (submitted && i === ex.correct) style = "border-green-500 bg-green-500/10";
              else if (submitted && i === selected && !isCorrect) style = "border-red-500 bg-red-500/10";
              else if (!submitted && i === selected) style = "border-primary bg-primary/10";

              return (
                <button key={i} onClick={() => !submitted && setSelected(i)} disabled={submitted}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm transition-all ${style}`}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">{ex.type === "TRUE_FALSE" ? opt.charAt(0) : String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{opt}</span>
                  {submitted && i === ex.correct && <Check className="h-4 w-4 text-green-500" />}
                  {submitted && i === selected && !isCorrect && <X className="h-4 w-4 text-red-500" />}
                </button>
              );
            })}
          </div>

          {submitted && (
            <div className={`mt-4 rounded-lg p-4 text-sm ${isCorrect ? "bg-green-500/10" : "bg-red-500/10"}`}>
              <p className={`font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>{isCorrect ? "Correct!" : "Not quite."}</p>
              <p className="mt-1 text-muted-foreground">{ex.explanation}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {!submitted ? (
              <Button onClick={handleSubmit} disabled={selected === null}>Check Answer</Button>
            ) : (
              <Button onClick={handleNext} className="glow-amber">
                {currentQ < exercises.length - 1 ? "Next Question" : "See Results"}<ArrowRight className="ml-2 h-4 w-4" />
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
