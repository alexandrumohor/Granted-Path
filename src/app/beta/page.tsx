"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sparkles, Check, Clock, Users, Zap, Shield, Gift,
  Rocket, ArrowRight, Brain,
} from "lucide-react";

export default function BetaWaitlistPage() {
  const [email, setEmail] = useState("");
  const t = useTranslations("beta");
  const tc = useTranslations("common");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const perks = [
    { icon: Gift, title: t("halfOff"), detail: t("halfOffDesc") },
    { icon: Zap, title: t("priorityAccess"), detail: t("priorityAccessDesc") },
    { icon: Users, title: t("foundingBadge"), detail: t("foundingBadgeDesc") },
    { icon: Brain, title: t("shapeProduct"), detail: t("shapeProductDesc") },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-6 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/20 text-primary">
              <Sparkles className="mr-1.5 h-3 w-3" />{t("title")}
            </Badge>
            <h1 className="text-4xl font-bold leading-tight lg:text-6xl">
              Be among the first <span className="text-gradient">1,000 learners</span> on Granted Path
            </h1>
            <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
              {t("subtitle")}
            </p>

            {/* Signup form */}
            {!submitted ? (
              <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-lg">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 text-base"
                  />
                  <Button type="submit" size="lg" className="h-12 px-8 whitespace-nowrap">
                    Join Waitlist<ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {t("noSpam")}
                </p>
              </form>
            ) : (
              <Card className="mx-auto mt-10 max-w-lg border-green-500/30 bg-green-500/5">
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="font-semibold">{t("onTheList")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We'll email <span className="font-mono text-foreground">{email}</span> when your invitation is ready. Expected wait: 2–4 weeks.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Counters */}
            <div className="mt-10 flex items-center justify-center gap-8 text-sm">
              <div>
                <p className="text-3xl font-bold text-primary">2,847</p>
                <p className="text-xs text-muted-foreground">{t("onWaitlist")}</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold">1,000</p>
                <p className="text-xs text-muted-foreground">{t("betaSeats")}</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold flex items-center gap-1"><Clock className="h-6 w-6 text-amber-400" />~3wk</p>
                <p className="text-xs text-muted-foreground">{t("untilLaunch")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="container mx-auto px-6 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold">{t("whyJoin")}</h2>
          <p className="mt-4 text-muted-foreground">
            {t("whyJoinSubtitle")}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* What to expect */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-3xl font-bold">{t("whatToExpect")}</h2>
            <div className="space-y-6">
              {[
                { step: "1", title: "You join the list today", detail: "We queue you in order. First in, first served." },
                { step: "2", title: "We email you in 2–4 weeks", detail: "With a unique activation link. Set it up in 60 seconds." },
                { step: "3", title: "Full platform access", detail: "All features unlocked: AI tutor, voice mode, exam predictor, knowledge map, everything." },
                { step: "4", title: "Weekly check-ins", detail: "We genuinely want your feedback. Answer a short survey each week." },
                { step: "5", title: "Founding member forever", detail: "When we go public, your 50% discount and badge stick for life." },
              ].map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-20">
        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="py-16 text-center">
            <Rocket className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("readyToLearn")}</h2>
            <p className="mt-4 text-muted-foreground">{t("readySubtitle")}</p>
            <div className="mt-8">
              <Button size="lg" onClick={() => document.querySelector<HTMLInputElement>("input[type=email]")?.focus()}>
                <Shield className="mr-2 h-4 w-4" />Reserve My Spot
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
