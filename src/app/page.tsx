"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "@/hooks/use-translations";

export default function Home() {
  const [faq, setFaq] = useState<number | null>(null);
  const tc = useTranslations("common");

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-40%] left-[50%] -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/[0.04] blur-[120px]" />
        </div>

        <div className="mx-auto max-w-[1120px] px-6 pt-32 pb-24 lg:pt-44 lg:pb-32">
          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[13px] text-muted-foreground backdrop-blur-sm mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Beta deschis — locuri limitate
            </div>

            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.025em]">
              Învață orice,<br />
              cu un AI care te<br />
              <span className="text-primary">cunoaște pe tine</span>
            </h1>

            <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-muted-foreground">
              Nu un chatbot. Un sistem de învățare care analizează cum performezi,
              detectează ce uiți, și te corectează când greșești.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Link href="/register">
                <Button className="h-11 px-6 text-[15px] font-medium">
                  Începe gratuit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#product" className="text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Vezi cum funcționează →
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-6 text-[13px] text-muted-foreground">
              <span>2,800+ utilizatori</span>
              <span className="h-3 w-px bg-border" />
              <span>12+ domenii</span>
              <span className="h-3 w-px bg-border" />
              <span>Gratuit pentru totdeauna</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PRODUCT DEMO ═══════ */}
      <section id="product" className="scroll-mt-20 border-t border-border/50">
        <div className="mx-auto max-w-[1120px] px-6 py-24 lg:py-32">
          <p className="text-[13px] font-medium text-primary tracking-wide uppercase mb-4">Produsul</p>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.02em] max-w-[480px]">
            Un tutor care predă, nu doar răspunde
          </h2>

          {/* Live AI conversation demo */}
          <div className="mt-12 rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
              </div>
              <span className="ml-3 text-[12px] text-muted-foreground">Granted Path AI — Sesiune de studiu</span>
            </div>
            <div className="p-6 lg:p-8 space-y-6 max-w-3xl">
              {/* User message */}
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-br-md bg-primary/10 border border-primary/20 px-4 py-2.5 max-w-md">
                  <p className="text-[14px]">Cred că listele și tuplele sunt același lucru în Python, nu?</p>
                </div>
              </div>
              {/* AI response */}
              <div className="space-y-3">
                <p className="text-[12px] text-primary font-medium">Granted Path AI</p>
                <div className="text-[14px] leading-[1.7] text-muted-foreground space-y-3">
                  <p><strong className="text-foreground">Nu chiar.</strong> Arată similar, dar diferența e fundamentală:</p>
                  <div className="rounded-lg border border-border bg-muted/50 p-4 text-[13px] space-y-2">
                    <p><strong className="text-foreground">List</strong> = mutabil → poți modifica după creare</p>
                    <p><strong className="text-foreground">Tuple</strong> = imutabil → odată creat, nu se schimbă</p>
                  </div>
                  <p>Gândește-te la un scenariu în care ai nevoie de date care <em>nu trebuie</em> să se schimbe niciodată. Când ai folosi un tuple în loc de o listă?</p>
                </div>
              </div>
              {/* Key insight */}
              <div className="rounded-lg border border-primary/20 bg-primary/[0.04] px-4 py-3">
                <p className="text-[13px] text-muted-foreground">
                  <span className="text-primary font-medium">De reținut:</span> AI-ul nu confirmă presupuneri greșite. Te corectează și te provoacă să gândești.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-[1120px] px-6 py-24 lg:py-32">
          <p className="text-[13px] font-medium text-primary tracking-wide uppercase mb-4">Cum funcționează</p>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.02em] max-w-[480px]">
            De la obiectiv la rezultat, în trei pași
          </h2>

          <div className="mt-16 grid gap-16 lg:grid-cols-3 lg:gap-12">
            {[
              { n: "01", title: "Definește obiectivul", desc: "Examen, certificare, skill nou — spune AI-ului ce vrei să obții și în cât timp." },
              { n: "02", title: "AI-ul construiește planul", desc: "Analizează nivelul tău, stilul de învățare, și creează un parcurs adaptat ritmului tău." },
              { n: "03", title: "Înveți cu feedback real", desc: "Lecții, exerciții, flashcard-uri — cu un AI care te corectează instant și previne uitarea." },
            ].map((s, i) => (
              <div key={i}>
                <span className="text-[48px] font-bold leading-none text-border">{s.n}</span>
                <h3 className="mt-4 text-[17px] font-semibold">{s.title}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground leading-[1.6]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHY DIFFERENT ═══════ */}
      <section className="border-t border-border/50 bg-card">
        <div className="mx-auto max-w-[1120px] px-6 py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="text-[13px] font-medium text-primary tracking-wide uppercase mb-4">De ce Granted Path</p>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.02em]">
                Construit ca sistem de învățare, nu ca wrapper peste un LLM
              </h2>
              <p className="mt-4 text-[15px] text-muted-foreground leading-[1.6]">
                Majoritatea platformelor pun un chat peste GPT și numesc asta "AI tutoring".
                Noi am construit un sistem care monitorizează, analizează și se adaptează la
                fiecare interacțiune.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { title: "Adaptive learning real", desc: "Ajustează format, dificultate și ritm bazat pe cum performezi — nu pe ce bifezi." },
                { title: "Monitorizare continuă", desc: "Fiecare sesiune, fiecare răspuns — analizat. Detectează tipare și previne uitarea." },
                { title: "Feedback onest", desc: "Te corectează când greșești, indiferent cât insisti. Ca un profesor bun, nu un chatbot servil." },
                { title: "Personalizare profundă", desc: "Nu doar „dificultate ușoară/medie/grea". Stilul de prezentare, ritmul, momentul zilei — totul contează." },
              ].map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-[15px] font-medium">{f.title}</p>
                    <p className="mt-1 text-[14px] text-muted-foreground leading-[1.6]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ NUMBERS ═══════ */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-[1120px] px-6 py-20">
          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row sm:gap-20">
            {[
              { value: "+60%", label: "retenție informații" },
              { value: "2×", label: "viteză de învățare" },
              { value: "24/7", label: "disponibilitate tutor" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-[40px] font-bold tracking-tight">{s.value}</p>
                <p className="mt-1 text-[14px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FOR WHOM ═══════ */}
      <section className="border-t border-border/50 bg-card">
        <div className="mx-auto max-w-[1120px] px-6 py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-8 lg:p-10">
              <p className="text-[13px] font-medium text-primary tracking-wide uppercase mb-4">Pentru persoane fizice</p>
              <h3 className="text-xl font-semibold">Tutorul tău personal, non-stop</h3>
              <p className="mt-3 text-[15px] text-muted-foreground leading-[1.6]">
                Pregătire examene, skill-uri noi, schimbare carieră — cu un AI care se adaptează la tine, nu invers.
              </p>
              <ul className="mt-6 space-y-2.5">
                {["Parcursuri personalizate", "Tutor vocal", "Mod Panica pentru examene", "Certificate de completare"].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px]"><Check className="h-3.5 w-3.5 text-primary shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 block"><Button variant="outline" className="h-10">Începe gratuit <ArrowRight className="ml-2 h-3.5 w-3.5" /></Button></Link>
            </div>
            <div className="rounded-xl border border-border bg-background p-8 lg:p-10">
              <p className="text-[13px] font-medium text-primary tracking-wide uppercase mb-4">Pentru organizații</p>
              <h3 className="text-xl font-semibold">Training AI pentru echipe</h3>
              <p className="mt-3 text-[15px] text-muted-foreground leading-[1.6]">
                Școli, universități, companii — fiecare membru primește un tutor AI personal. Tu primești analytics în timp real.
              </p>
              <ul className="mt-6 space-y-2.5">
                {["Portal management echipă", "Analize progres pe grupuri", "Integrare SSO", "Support dedicat"].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px]"><Check className="h-3.5 w-3.5 text-primary shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/contact" className="mt-8 block"><Button variant="outline" className="h-10">Contactează-ne <ArrowRight className="ml-2 h-3.5 w-3.5" /></Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section id="pricing" className="scroll-mt-20 border-t border-border/50">
        <div className="mx-auto max-w-[1120px] px-6 py-24 lg:py-32">
          <p className="text-[13px] font-medium text-primary tracking-wide uppercase mb-4">Prețuri</p>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.02em]">Simplu. Fără surprize.</h2>
          <p className="mt-3 text-[15px] text-muted-foreground">Începe gratuit, fără card de credit.</p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { name: "Free", price: "€0", period: "", desc: "Pentru explorare", features: ["2 cursuri active", "20 mesaje AI / zi", "Analize de bază"], cta: "Începe gratuit", primary: false },
              { name: "Pro", price: "€30", period: "/lună", desc: "Învățare serioasă", features: ["Cursuri nelimitate", "AI nelimitat", "Tutor vocal", "Mod Panica", "Certificate"], cta: "Începe Pro", primary: true },
              { name: "Business", price: "€9", period: "/loc/lună", desc: "Pentru echipe", features: ["Tot din Pro", "Portal management", "Analize echipă", "SSO", "Support prioritar"], cta: "Contactează-ne", primary: false },
            ].map((p, i) => (
              <div key={i} className={`flex flex-col rounded-xl border p-8 ${p.primary ? "border-primary/40 ring-1 ring-primary/10" : "border-border"}`}>
                {p.primary && <p className="text-[12px] font-medium text-primary mb-4">Recomandat</p>}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[36px] font-bold tracking-tight">{p.price}</span>
                  {p.period && <span className="text-[14px] text-muted-foreground">{p.period}</span>}
                </div>
                <p className="mt-1 text-[14px] text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-[14px]"><Check className="h-3.5 w-3.5 text-primary shrink-0" />{f}</li>
                  ))}
                </ul>
                <Link href={p.name === "Business" ? "/contact" : "/register"} className="mt-8">
                  <Button variant={p.primary ? "default" : "outline"} className="w-full h-10">{p.cta}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="border-t border-border/50 bg-card">
        <div className="mx-auto max-w-[640px] px-6 py-24 lg:py-32">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.02em] text-center">Întrebări frecvente</h2>

          <div className="mt-12 divide-y divide-border">
            {[
              { q: "E gratuit?", a: "Da. Planul Free e gratuit pe viață — 2 cursuri active și 20 mesaje AI pe zi. Upgrade oricând." },
              { q: "Ce limbă vorbește AI-ul?", a: "Română și engleză. Detectează automat sau setezi manual din preferințe." },
              { q: "Funcționează pentru examene?", a: "Da. Modul Panica creează un plan focusat pe lacunele tale. Avem cursuri BAC, permis auto, certificări IT." },
              { q: "Pot folosi pentru echipa mea?", a: "Da. Business include portal management, analize pe echipă, SSO și support dedicat." },
              { q: "Datele mele sunt în siguranță?", a: "Complet GDPR compliant. Date stocate în EU, criptate, nefolosite pentru antrenare AI." },
            ].map((item, i) => (
              <div key={i}>
                <button onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between py-5 text-left">
                  <span className="text-[15px] font-medium pr-4">{item.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${faq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-200 ${faq === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[14px] text-muted-foreground leading-[1.6]">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-[1120px] px-6 py-24 lg:py-32 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.02em]">
            Gata să înveți diferit?
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">Cont gratuit în 30 de secunde. Fără card.</p>
          <div className="mt-8">
            <Link href="/register">
              <Button className="h-11 px-8 text-[15px] font-medium">
                Crează cont gratuit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
