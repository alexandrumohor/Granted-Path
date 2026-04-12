"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, BarChart3, ShieldCheck, Sparkles, Trophy, Clock, BookOpen, MessageSquare, Zap, GraduationCap, Building2, ArrowRight, Check } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function LandingPage() {
  const t = useTranslations("hero");
  const tf = useTranslations("features");
  const tc = useTranslations("common");
  const tp = useTranslations("pricing");

  return (<>
    {/* HERO */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm"><Sparkles className="mr-1.5 h-3.5 w-3.5" />AI-Powered Learning Platform</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">{t("title")}<br /><span className="text-gradient">{t("titleHighlight")}</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl">{t("subtitle")}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/register"><Button size="lg" className="glow-amber text-base px-8 h-12">{tc("getStarted")}<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link href="#how-it-works"><Button variant="outline" size="lg" className="text-base px-8 h-12">{tc("learnMore")}</Button></Link>
          </div>
          <div className="mt-14 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex flex-col items-center"><span className="text-2xl font-bold text-foreground">12+</span><span>Domenii</span></div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center"><span className="text-2xl font-bold text-foreground">24/7</span><span>Tutor AI</span></div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center"><span className="text-2xl font-bold text-foreground">100%</span><span>Personalizat</span></div>
          </div>
        </div>
      </div>
    </section>

    {/* AI DEMO */}
    <section className="border-y border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border/50 bg-muted/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/60" /><div className="h-3 w-3 rounded-full bg-yellow-500/60" /><div className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-muted-foreground">{t("aiDemo")}</span>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex justify-end"><div className="max-w-sm rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">I think lists and tuples are the same thing in Python, right?</div></div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Brain className="h-4 w-4" /></div>
              <div className="max-w-lg rounded-2xl rounded-bl-md bg-muted px-4 py-3 text-sm leading-relaxed">
                <p><strong>Not quite!</strong> They look similar, but there&apos;s a key difference:</p>
                <ul className="mt-2 ml-4 list-disc space-y-1 text-muted-foreground">
                  <li><strong className="text-foreground">Lists</strong> are <strong className="text-foreground">mutable</strong> &mdash; you can change them</li>
                  <li><strong className="text-foreground">Tuples</strong> are <strong className="text-foreground">immutable</strong> &mdash; once created, can&apos;t be modified</li>
                </ul>
                <p className="mt-2 text-muted-foreground">Can you think of a situation where you&apos;d want data that can&apos;t be changed?</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex gap-1"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60" style={{animationDelay:"0ms"}} /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60" style={{animationDelay:"150ms"}} /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60" style={{animationDelay:"300ms"}} /></div>
              <span>{t("aiWaiting")}</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">{t("aiHonest")}</p>
      </div></div>
    </section>

    {/* FEATURES */}
    <section id="features" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{tf("title")} <span className="text-gradient">Granted Path</span>?</h2>
          <p className="mt-4 text-lg text-muted-foreground">{tf("subtitle")}</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FC icon={<Brain className="h-5 w-5" />} title={tf("adaptive")} desc={tf("adaptiveDesc")} />
          <FC icon={<BarChart3 className="h-5 w-5" />} title={tf("tracking")} desc={tf("trackingDesc")} />
          <FC icon={<ShieldCheck className="h-5 w-5" />} title={tf("honest")} desc={tf("honestDesc")} />
          <FC icon={<Zap className="h-5 w-5" />} title={tf("panic")} desc={tf("panicDesc")} />
          <FC icon={<Target className="h-5 w-5" />} title={tf("knowledge")} desc={tf("knowledgeDesc")} />
          <FC icon={<Trophy className="h-5 w-5" />} title={tf("fun")} desc={tf("funDesc")} />
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section id="how-it-works" className="scroll-mt-20 border-y border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-bold sm:text-4xl">{tc("learnMore")}</h2></div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <SC step={1} icon={<MessageSquare className="h-5 w-5" />} title="Spune-ne obiectivul" desc="Examen in 2 zile? Skill nou? Spune AI-ului ce ai nevoie." />
          <SC step={2} icon={<Brain className="h-5 w-5" />} title="AI creeaza planul" desc="Tutorul tau AI construieste un parcurs personalizat." />
          <SC step={3} icon={<BookOpen className="h-5 w-5" />} title="Invata in stilul tau" desc="Lectii, exercitii, flashcard-uri, conversatii AI — adaptate stilului tau." />
          <SC step={4} icon={<Clock className="h-5 w-5" />} title="AI te tine pe drumul cel bun" desc="Memento-uri inteligente si repetitie spatiata." />
        </div>
      </div>
    </section>

    {/* DOMAINS */}
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-bold sm:text-4xl">{t("title")} <span className="text-gradient">Orice</span></h2><p className="mt-4 text-lg text-muted-foreground">12+ domenii si in crestere.</p></div>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {["IT & Programare","Marketing","Business & Management","Limbi Straine","Pregatire Examene","Stiinte","Design & Creativitate","Finante & Contabilitate","Drept & Legislatie","Sanatate & Medicina","Soft Skills","Scoala de Soferi","Subiecte Custom"].map((d) => (<Badge key={d} variant="outline" className="px-4 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">{d}</Badge>))}
      </div>
    </section>

    {/* FOR EVERYONE */}
    <section className="border-y border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-bold sm:text-4xl">Construit pentru Toata Lumea</h2><p className="mt-4 text-lg text-muted-foreground">Persoane fizice, scoli, universitati si companii.</p></div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <AC icon={<Sparkles className="h-6 w-6" />} title="Pentru Persoane Fizice" desc="Un tutor AI personal disponibil 24/7." features={["Parcursuri personalizate","Asistent AI de studiu","Simulatoare de examen","Certificate"]} cta={tc("getStarted")} href="/register" />
          <AC icon={<GraduationCap className="h-6 w-6" />} title="Pentru Educatie" desc="Ofera fiecarui elev un tutor AI personal." features={["Panouri pentru profesori","Sistem de teme","Analize clase","Acces parinti"]} cta="Planuri Educatie" href="/pricing#education" />
          <AC icon={<Building2 className="h-6 w-6" />} title="Pentru Afaceri" desc="Dezvolta echipa cu training AI." features={["Managementul echipelor","Matricea competentelor","Urmarire conformitate","Integrare SSO"]} cta="Planuri Business" href="/pricing#business" />
        </div>
      </div>
    </section>

    {/* PRICING PREVIEW */}
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-bold sm:text-4xl">{tp("title")}</h2><p className="mt-4 text-lg text-muted-foreground">{tp("subtitle")}</p></div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <PC name="Explorer" price={tc("free")} desc="Pentru inceput" features={["2 cursuri active","20 mesaje AI/zi","Analize de baza"]} freePlan ctaLabel={tc("getStarted")} regLabel={tc("register")} />
        <PC name="Starter" price={"\u20AC10"} period={tc("perMonth")} desc="Mai multe cursuri, fara reclame" features={["5 cursuri active","100 mesaje AI/zi","Mod vocal"]} ctaLabel="Aboneaza-te" regLabel={tc("register")} />
        <PC name="Pro" price={"\u20AC30"} period={tc("perMonth")} desc="Nelimitat + AI avansat" features={["Cursuri nelimitate","AI nelimitat","Mod Panica"]} highlighted ctaLabel="Aboneaza-te" regLabel={tc("register")} popLabel={tp("mostPopular")} />
        <PC name="Master" price={"\u20AC60"} period={tc("perMonth")} desc="Tutoring AI 1-la-1" features={["Sesiuni de tutoring AI","Simulator interviuri","Review expert"]} ctaLabel="Aboneaza-te" regLabel={tc("register")} />
      </div>
      <div className="mt-8 text-center"><Link href="/pricing"><Button variant="outline" size="lg">{tp("title")}<ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div>
    </section>

    {/* FINAL CTA */}
    <section className="relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Gata sa inveti <span className="text-gradient">mai destept</span>?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Incepe gratuit, fara card de credit.</p>
          <div className="mt-8"><Link href="/register"><Button size="lg" className="glow-amber text-base px-10 h-12">{tc("getStarted")}<ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div>
        </div>
      </div>
    </section>
  </>);
}

function FC({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (<div className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>);
}
function SC({ step, icon, title, desc }: { step: number; icon: React.ReactNode; title: string; desc: string }) {
  return (<div className="relative text-center">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</div>
    <div className="absolute -top-2 left-1/2 ml-5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{step}</div>
    <h3 className="text-base font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>);
}
function AC({ icon, title, desc, features, cta, href }: { icon: React.ReactNode; title: string; desc: string; features: string[]; cta: string; href: string }) {
  return (<div className="flex flex-col rounded-xl border border-border/50 bg-card p-6">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    <ul className="mt-4 flex-1 space-y-2">{features.map((f) => (<li key={f} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>))}</ul>
    <Link href={href} className="mt-6"><Button variant="outline" className="w-full">{cta}<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
  </div>);
}
function PC({ name, price, period, desc, features, highlighted, freePlan, ctaLabel, regLabel, popLabel }: { name: string; price: string; period?: string; desc: string; features: string[]; highlighted?: boolean; freePlan?: boolean; ctaLabel: string; regLabel: string; popLabel?: string }) {
  return (<div className={`relative flex flex-col rounded-xl border p-6 ${highlighted ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10" : "border-border/50 bg-card"}`}>
    {highlighted && popLabel && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{popLabel}</Badge>}
    <h3 className="text-lg font-semibold">{name}</h3>
    <div className="mt-2 flex items-baseline"><span className="text-3xl font-bold">{price}</span>{period && <span className="ml-1 text-sm text-muted-foreground">{period}</span>}</div>
    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    <ul className="mt-4 flex-1 space-y-2">{features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm"><Check className="h-3.5 w-3.5 text-primary" />{f}</li>))}</ul>
    <Link href="/register" className="mt-6"><Button variant={highlighted ? "default" : "outline"} className={`w-full ${highlighted ? "glow-amber" : ""}`}>{freePlan ? ctaLabel : ctaLabel}</Button></Link>
  </div>);
}
