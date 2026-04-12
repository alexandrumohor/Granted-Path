"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, BookOpen, Brain, BarChart3, Shield } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

type Stats = { users: number; courses: number; lessons: number; achievements: number };

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const tc = useTranslations("common");

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  return (
    <div className="snap-y snap-mandatory h-[calc(100vh-3.5rem)] overflow-y-auto">

      {/* ═══════ SCREEN 1 — HERO ═══════ */}
      <section className="snap-start min-h-[calc(100vh-3.5rem)] flex items-center relative">
        <div className="mx-auto w-full max-w-[1120px] px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left — Message */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-[13px] text-muted-foreground mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {stats ? `${stats.users} utilizatori activi` : "Platform activa"}
              </div>

              <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                Sistemul tau de invatare,{" "}
                <span className="text-primary">bazat pe AI</span>
              </h1>

              <p className="mt-5 max-w-[440px] text-[16px] leading-[1.65] text-muted-foreground">
                Un AI care analizeaza cum performezi, detecteaza ce uiti
                si te corecteaza cand gresesti. Nu un chatbot — un tutor real.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Link href="/register">
                  <Button className="h-10 px-5 text-[14px]">
                    {tc("getStarted")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#product" className="text-[14px] text-muted-foreground hover:text-foreground transition-colors">
                  Vezi produsul →
                </Link>
              </div>

              {stats && (
                <div className="mt-12 flex items-center gap-5 text-[13px] text-muted-foreground">
                  <span><strong className="text-foreground">{stats.courses}</strong> cursuri</span>
                  <span className="h-3 w-px bg-border" />
                  <span><strong className="text-foreground">{stats.lessons}</strong> lectii</span>
                  <span className="h-3 w-px bg-border" />
                  <span><strong className="text-foreground">{stats.achievements}</strong> realizari</span>
                </div>
              )}
            </div>

            {/* Right — Real product preview */}
            <div className="hidden lg:block">
              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xl shadow-primary/[0.03]">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/15" />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/15" />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/15" />
                  </div>
                  <span className="ml-2 text-[11px] text-muted-foreground">Granted Path — Sesiune AI</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-end">
                    <div className="rounded-xl rounded-br-sm bg-primary/10 border border-primary/20 px-3.5 py-2 max-w-[280px]">
                      <p className="text-[13px]">Cred ca listele si tuplele sunt acelasi lucru in Python</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] text-primary font-medium mb-1.5">Granted Path AI</p>
                    <div className="text-[13px] leading-[1.7] text-muted-foreground space-y-2">
                      <p><strong className="text-foreground">Nu chiar.</strong> Diferenta e fundamentala:</p>
                      <div className="rounded-md border border-border bg-muted/50 p-3 text-[12px] space-y-1">
                        <p><strong className="text-foreground">List</strong> = mutabil</p>
                        <p><strong className="text-foreground">Tuple</strong> = imutabil</p>
                      </div>
                      <p className="text-[12px]">Cand ai folosi un tuple?</p>
                    </div>
                  </div>
                  <div className="rounded-md bg-primary/[0.05] border border-primary/10 px-3 py-2">
                    <p className="text-[11px] text-muted-foreground"><span className="text-primary font-medium">Nota:</span> AI-ul corecteaza presupuneri gresite, nu le confirma.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SCREEN 2 — PRODUCT ═══════ */}
      <section id="product" className="snap-start min-h-[calc(100vh-3.5rem)] flex items-center border-t border-border">
        <div className="mx-auto w-full max-w-[1120px] px-6 py-16">
          <p className="text-[13px] font-medium text-primary tracking-wide uppercase mb-3">Produsul</p>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] max-w-[420px]">
            Un tutor care preda, nu doar raspunde
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Brain, title: "Adaptive learning", desc: "Ajusteaza dificultatea si formatul bazat pe performanta ta reala." },
              { icon: BarChart3, title: "Monitorizare continua", desc: "Fiecare sesiune si raspuns este analizat pentru a-ti optimiza parcursul." },
              { icon: Shield, title: "Feedback onest", desc: "Te corecteaza cand gresesti. Nu te aproba fals." },
              { icon: BookOpen, title: "Continut structurat", desc: stats ? `${stats.courses} cursuri cu ${stats.lessons} lectii, create de experti si AI.` : "Cursuri si lectii create de experti si AI." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="rounded-lg border border-border bg-card p-5">
                  <Icon className="h-5 w-5 text-primary mb-3" />
                  <h3 className="text-[14px] font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-[13px] text-muted-foreground leading-[1.6]">{f.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Real courses from DB */}
          <div className="mt-10 rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <span className="text-[13px] font-medium">Cursuri disponibile</span>
              <Link href="/learn" className="text-[12px] text-primary hover:underline">Vezi toate →</Link>
            </div>
            <CoursesPreview />
          </div>
        </div>
      </section>

      {/* ═══════ SCREEN 3 — PRICING ═══════ */}
      <section id="pricing" className="snap-start min-h-[calc(100vh-3.5rem)] flex items-center border-t border-border bg-card">
        <div className="mx-auto w-full max-w-[1120px] px-6 py-16">
          <p className="text-[13px] font-medium text-primary tracking-wide uppercase mb-3">Preturi</p>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em]">Simplu. Fara surprize.</h2>
          <p className="mt-2 text-[14px] text-muted-foreground">Incepe gratuit, fara card de credit.</p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              { name: "Free", price: "0", desc: "Pentru explorare", features: ["2 cursuri active", "20 mesaje AI / zi", "Analize de baza"], primary: false },
              { name: "Pro", price: "30", desc: "Invatare seriosa", features: ["Cursuri nelimitate", "AI nelimitat", "Tutor vocal", "Mod Panica", "Certificate"], primary: true },
              { name: "Business", price: "9", period: "/loc", desc: "Pentru echipe", features: ["Tot din Pro", "Portal management", "Analize echipa", "SSO", "Support prioritar"], primary: false },
            ].map((p, i) => (
              <div key={i} className={`flex flex-col rounded-xl border p-6 ${p.primary ? "border-primary ring-1 ring-primary/20 bg-primary/[0.02]" : "border-border"}`}>
                {p.primary && <p className="text-[11px] font-medium text-primary mb-3 uppercase tracking-wide">Recomandat</p>}
                <h3 className="text-base font-semibold">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-0.5">
                  <span className="text-[32px] font-bold tracking-tight">&euro;{p.price}</span>
                  <span className="text-[13px] text-muted-foreground">{p.period || ""}/luna</span>
                </div>
                <p className="mt-1 text-[13px] text-muted-foreground">{p.desc}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[13px]"><Check className="h-3.5 w-3.5 text-primary shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link href={p.name === "Business" ? "/contact" : "/register"} className="mt-6">
                  <Button variant={p.primary ? "default" : "outline"} className="w-full h-9 text-[13px]">
                    {p.name === "Business" ? "Contacteaza-ne" : p.primary ? "Incepe Pro" : tc("getStarted")}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SCREEN 4 — FINAL CTA ═══════ */}
      <section className="snap-start min-h-[calc(100vh-3.5rem)] flex items-center border-t border-border">
        <div className="mx-auto w-full max-w-[1120px] px-6 text-center">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.025em]">
            Gata sa inveti diferit?
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground max-w-[380px] mx-auto">
            Cont gratuit in 30 de secunde. Fara card. Fara obligatii.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/register">
              <Button className="h-11 px-8 text-[15px]">
                Creeaza cont gratuit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {stats && (
            <p className="mt-8 text-[13px] text-muted-foreground">
              Alatura-te celor {stats.users} utilizatori care invata deja cu Granted Path
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function CoursesPreview() {
  const [courses, setCourses] = useState<Array<{id:string;title:string;categoryLabel:string;difficulty:string;estimatedHours:number}>>([]);

  useEffect(() => {
    fetch("/api/courses")
      .then(r => r.json())
      .then(d => setCourses(d.slice(0, 4)))
      .catch(() => {});
  }, []);

  if (courses.length === 0) return <div className="p-5 text-[13px] text-muted-foreground">Se incarca...</div>;

  return (
    <div className="divide-y divide-border">
      {courses.map(c => (
        <Link key={c.id} href={`/learn/${c.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[13px] font-medium">{c.title}</p>
              <p className="text-[11px] text-muted-foreground">{c.categoryLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span>{c.difficulty}</span>
            <span>{c.estimatedHours}h</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
