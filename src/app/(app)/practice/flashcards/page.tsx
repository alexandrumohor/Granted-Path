"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Check, X, ArrowRight, Layers, Trophy } from "lucide-react";

const FLASHCARDS = [
  { id: "1", front: "What is the difference between a list and a tuple in Python?", back: "Lists are mutable (can be changed), tuples are immutable (cannot be changed after creation). Lists use [], tuples use ().", topic: "Python" },
  { id: "2", front: "What does SEO stand for?", back: "Search Engine Optimization — the practice of optimizing websites to rank higher in organic search results.", topic: "Marketing" },
  { id: "3", front: "What is the 'Iron Triangle' in project management?", back: "Scope, Time, and Cost — the three constraints that must be balanced in every project. Changing one affects the others.", topic: "Project Management" },
  { id: "4", front: "What is the difference between == and === in JavaScript?", back: "== compares values with type coercion (\"5\" == 5 is true). === compares both value AND type (\"5\" === 5 is false). Always prefer ===.", topic: "JavaScript" },
  { id: "5", front: "What is an f-string in Python?", back: "A formatted string literal (f\"Hello {name}\") that lets you embed expressions inside strings. Available since Python 3.6.", topic: "Python" },
  { id: "6", front: "What is PPC?", back: "Pay-Per-Click — an advertising model where you pay each time someone clicks your ad. Google Ads and Facebook Ads use PPC.", topic: "Marketing" },
  { id: "7", front: "What is dynamic typing?", back: "A language feature where variable types are determined at runtime, not compile time. Python and JavaScript are dynamically typed. You can reassign x = 5 then x = 'hello'.", topic: "Python" },
  { id: "8", front: "What are the three pillars of SEO?", back: "On-page (content, keywords, meta tags), Off-page (backlinks, authority), and Technical (speed, mobile-friendliness, crawlability).", topic: "Marketing" },
];

export default function FlashcardsPage() {
  const t = useTranslations("learn");
  const tc = useTranslations("common");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<{ id: string; knew: boolean }[]>([]);
  const [done, setDone] = useState(false);

  const card = FLASHCARDS[currentIdx]!;
  const remaining = FLASHCARDS.length - currentIdx;

  function handleResponse(knew: boolean) {
    setResults(prev => [...prev, { id: card.id, knew }]);
    if (currentIdx < FLASHCARDS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setFlipped(false);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setCurrentIdx(0); setFlipped(false); setResults([]); setDone(false);
  }

  if (done) {
    const knew = results.filter(r => r.knew).length;
    return (
      <div className="p-6 lg:p-8 max-w-lg mx-auto text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Trophy className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Review Complete!</h1>
        <p className="mt-2 text-muted-foreground">{knew}/{FLASHCARDS.length} cards you already knew</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {results.map((r, i) => (
            <div key={i} className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${r.knew ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
              {r.knew ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </div>
          ))}
        </div>

        {results.some(r => !r.knew) && (
          <p className="mt-4 text-sm text-muted-foreground">Cards you didn&apos;t know will appear again sooner in your next review.</p>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={restart} className="glow-amber"><RotateCcw className="mr-2 h-4 w-4" />Review Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-lg mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /><h1 className="text-lg font-semibold">Flashcard Review</h1></div>
        <Badge variant="secondary">{remaining} remaining</Badge>
      </div>

      <div className="mb-4 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${(currentIdx / FLASHCARDS.length) * 100}%` }} /></div>

      {/* Card */}
      <button onClick={() => setFlipped(!flipped)} className="w-full text-left">
        <Card className={`min-h-[250px] transition-all ${flipped ? "border-primary/30 bg-primary/5" : "hover:border-primary/20"}`}>
          <CardContent className="flex flex-col justify-center min-h-[250px] pt-6">
            <Badge variant="outline" className="self-start mb-4 text-xs">{card.topic}</Badge>
            {!flipped ? (
              <>
                <p className="text-lg font-medium leading-relaxed">{card.front}</p>
                <p className="mt-4 text-xs text-muted-foreground">Tap to reveal answer</p>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-2">Answer:</p>
                <p className="text-sm leading-relaxed">{card.back}</p>
              </>
            )}
          </CardContent>
        </Card>
      </button>

      {/* Response buttons (only when flipped) */}
      {flipped && (
        <div className="mt-4 flex gap-3">
          <Button variant="outline" className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => handleResponse(false)}>
            <X className="mr-2 h-4 w-4" />Didn&apos;t Know
          </Button>
          <Button className="flex-1" onClick={() => handleResponse(true)}>
            <Check className="mr-2 h-4 w-4" />Knew It
          </Button>
        </div>
      )}
    </div>
  );
}
