"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Check, X, Layers, Trophy, Loader2 } from "lucide-react";

interface Flashcard {
  id: string;
  topic: string;
  front: string;
  back: string;
}

export default function FlashcardsPage() {
  const t = useTranslations("flashcards");
  const tc = useTranslations("common");
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<{ id: string; knew: boolean }[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch("/api/user/knowledge")
      .then(r => r.ok ? r.json() : [])
      .then((nodes: { id: string; topic: string; mastery: number }[]) => {
        const flashcards: Flashcard[] = nodes
          .filter(n => n.mastery < 90)
          .map(n => ({
            id: n.id,
            topic: n.topic,
            front: n.topic,
            back: `${t("masteryLevel")}: ${n.mastery}%`,
          }));
        setCards(flashcards);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [t]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="p-6 lg:p-8 max-w-lg mx-auto text-center">
        <Layers className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-sm text-muted-foreground mt-2">{t("noCards")}</p>
        <p className="text-sm text-muted-foreground mt-1">{t("noCardsDesc")}</p>
        <Link href="/learn"><Button className="mt-4">{t("startLearning")}</Button></Link>
      </div>
    );
  }

  const card = cards[currentIdx]!;
  const remaining = cards.length - currentIdx;

  function handleResponse(knew: boolean) {
    setResults(prev => [...prev, { id: card.id, knew }]);
    if (currentIdx < cards.length - 1) {
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
        <h1 className="text-2xl font-bold">{t("reviewComplete")}</h1>
        <p className="mt-2 text-muted-foreground">{knew}/{cards.length} {t("alreadyKnew")}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {results.map((r, i) => (
            <div key={i} className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${r.knew ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
              {r.knew ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </div>
          ))}
        </div>

        {results.some(r => !r.knew) && (
          <p className="mt-4 text-sm text-muted-foreground">{t("willAppearSooner")}</p>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={restart} className="glow-amber"><RotateCcw className="mr-2 h-4 w-4" />{t("reviewAgain")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-lg mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /><h1 className="text-lg font-semibold">{t("title")}</h1></div>
        <Badge variant="secondary">{remaining} {t("remaining")}</Badge>
      </div>

      <div className="mb-4 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${(currentIdx / cards.length) * 100}%` }} /></div>

      <button onClick={() => setFlipped(!flipped)} className="w-full text-left">
        <Card className={`min-h-[250px] transition-all ${flipped ? "border-primary/30 bg-primary/5" : "hover:border-primary/20"}`}>
          <CardContent className="flex flex-col justify-center min-h-[250px] pt-6">
            <Badge variant="outline" className="self-start mb-4 text-xs">{card.topic}</Badge>
            {!flipped ? (
              <>
                <p className="text-lg font-medium leading-relaxed">{card.front}</p>
                <p className="mt-4 text-xs text-muted-foreground">{t("tapToReveal")}</p>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-2">{t("answer")}:</p>
                <p className="text-sm leading-relaxed">{card.back}</p>
              </>
            )}
          </CardContent>
        </Card>
      </button>

      {flipped && (
        <div className="mt-4 flex gap-3">
          <Button variant="outline" className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => handleResponse(false)}>
            <X className="mr-2 h-4 w-4" />{t("didntKnow")}
          </Button>
          <Button className="flex-1" onClick={() => handleResponse(true)}>
            <Check className="mr-2 h-4 w-4" />{t("knewIt")}
          </Button>
        </div>
      )}
    </div>
  );
}
