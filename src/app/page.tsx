"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, BarChart3, Shield, BookOpen } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

type Stats = { users: number; courses: number; lessons: number; achievements: number };

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const tc = useTranslations("common");

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  return (
    <div className="w-full px-5 sm:px-8 lg:px-16 xl:px-24 pt-4">
      <div className="grid lg:grid-cols-[1fr_1px_1fr] items-start gap-0">

        {/* ── LEFT ── */}
        <div className="flex flex-col pr-0 lg:pr-12">
          <h1 className="anim-right delay-2 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] lg:whitespace-nowrap">
            Sistemul tau de invatare, <span className="text-primary">bazat pe AI</span>
          </h1>

          <p className="anim-right delay-3 mt-5 max-w-[480px] text-[16px] leading-[1.7] text-muted-foreground">
            Un AI care analizeaza cum performezi, detecteaza ce uiti
            si te corecteaza cand gresesti. Nu un chatbot — un tutor real.
          </p>

          <div className="anim-right delay-4 mt-7 flex items-center gap-5">
            <Link href="/register">
              <Button className="h-11 px-6 text-[15px]">
                {tc("getStarted")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/learn" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors">
              Exploreaza cursuri →
            </Link>
          </div>

          {stats && (
            <div className="anim-right delay-5 mt-6 flex items-center gap-5 text-[14px] text-muted-foreground">
              <span><strong className="text-foreground">{stats.courses}</strong> cursuri</span>
              <span className="h-4 w-px bg-border" />
              <span><strong className="text-foreground">{stats.lessons}</strong> lectii</span>
              <span className="h-4 w-px bg-border" />
              <span><strong className="text-foreground">{stats.achievements}</strong> realizari</span>
              <span className="h-4 w-px bg-border" />
              <span><strong className="text-foreground">{stats.users}</strong> utilizatori activi</span>
            </div>
          )}

          {/* AI Preview */}
          <div className="anim-up delay-6 mt-6 rounded-xl border border-border bg-card overflow-hidden" style={{boxShadow:"var(--shadow-card)"}}>
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/15" />
              </div>
              <span className="ml-2 text-[12px] text-muted-foreground">Granted Path — Sesiune AI</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-end">
                <div className="rounded-xl rounded-br-sm bg-primary/10 border border-primary/20 px-4 py-2 max-w-[260px]">
                  <p className="text-[13px]">Cred ca listele si tuplele sunt acelasi lucru in Python</p>
                </div>
              </div>
              <div>
                <p className="text-[12px] text-primary font-medium mb-2">Granted Path AI</p>
                <div className="text-[13px] leading-[1.7] text-muted-foreground space-y-2">
                  <p><strong className="text-foreground">Nu chiar.</strong> Diferenta e fundamentala:</p>
                  <div className="rounded-lg border border-border bg-muted/50 p-3 text-[12px] space-y-1">
                    <p><strong className="text-foreground">List</strong> = mutabil</p>
                    <p><strong className="text-foreground">Tuple</strong> = imutabil</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-primary/[0.05] border border-primary/10 px-3 py-2">
                <p className="text-[12px] text-muted-foreground"><span className="text-primary font-medium">Nota:</span> AI-ul corecteaza presupuneri gresite.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="hidden lg:block w-px bg-border self-stretch my-8" />

        {/* ── RIGHT — pushed down ── */}
        <div className="flex flex-col pl-0 lg:pl-12 mt-10 lg:mt-16 bg-secondary/50 dark:bg-transparent rounded-2xl p-6 lg:p-8 -m-2 lg:m-0">
          <h2 className="anim-left delay-2 text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] lg:whitespace-nowrap">
            Un tutor care preda, nu doar raspunde
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Brain, title: "Adaptive learning", desc: "Ajusteaza dificultatea si formatul bazat pe performanta ta reala." },
              { icon: BarChart3, title: "Monitorizare continua", desc: "Fiecare sesiune si raspuns analizat pentru a-ti optimiza parcursul." },
              { icon: Shield, title: "Feedback onest", desc: "Te corecteaza cand gresesti. Nu te aproba fals." },
              { icon: BookOpen, title: "Continut structurat", desc: stats ? `${stats.courses} cursuri cu ${stats.lessons} lectii.` : "Cursuri si lectii create de experti si AI." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className={`anim-scale delay-${i + 4} rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-[transform,border-color,box-shadow] duration-200 hover:translate-y-[-2px]`} style={{boxShadow:"var(--shadow-card)"}} onMouseEnter={e=>(e.currentTarget.style.boxShadow="var(--shadow-card-hover)")} onMouseLeave={e=>(e.currentTarget.style.boxShadow="var(--shadow-card)")}>
                  <Icon className="h-5 w-5 text-primary mb-3 transition-none" />
                  <h3 className="text-[15px] font-semibold transition-none">{f.title}</h3>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-[1.6] transition-none">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
