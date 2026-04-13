"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    prev.current = to;
    if (from === to) return;

    const duration = 400;
    const start = performance.now();

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * ease));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);

  return <>{display}</>;
}

export default function PricingPage() {
  const t = useTranslations("pricing");
  const tc = useTranslations("common");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [faq, setFaq] = useState<number | null>(null);

  const plans = [
    {
      name: "Free",
      monthly: 0, yearly: 0,
      desc: "Pentru explorare",
      features: ["2 cursuri active", "20 mesaje AI / zi", "Analize de baza", "Acces comunitate"],
      cta: tc("getStarted"),
      href: "/register",
      primary: false,
    },
    {
      name: "Pro",
      monthly: 30, yearly: 300,
      desc: "Invatare seriosa",
      features: ["Cursuri nelimitate", "AI nelimitat", "Tutor vocal", "Mod Panica examene", "Certificate", "Analize avansate", "Support prioritar"],
      cta: "Incepe Pro",
      href: "/register",
      primary: true,
    },
    {
      name: "Business",
      monthly: 9, yearly: 90,
      period: "/loc",
      desc: "Pentru echipe si companii",
      features: ["Tot din Pro", "Portal management echipa", "Analize progres grupuri", "Integrare SSO", "Support dedicat", "Facturare custom", "SLA garantat"],
      cta: "Contacteaza-ne",
      href: "/contact",
      primary: false,
    },
  ];

  const faqs = [
    { q: "Pot incerca gratuit inainte sa platesc?", a: "Da. Planul Free este gratuit pe viata si include acces la 2 cursuri si 20 mesaje AI pe zi. Nu e nevoie de card." },
    { q: "Pot schimba planul oricand?", a: "Da. Poti face upgrade sau downgrade oricand din Setari. Daca faci downgrade, ai acces la planul curent pana la sfarsitul perioadei platite." },
    { q: "Ce metode de plata acceptati?", a: "Visa, Mastercard, American Express prin Stripe. Facturare enterprise disponibila pentru planul Business." },
    { q: "Exista discount pentru plata anuala?", a: "Da. Economisesti echivalentul a 2 luni la plata anuala pe toate planurile." },
    { q: "Ce se intampla cu datele mele daca anulez?", a: "Datele sunt pastrate 30 de zile dupa anulare pentru reinactivare. Dupa aceea, sunt sterse permanent conform GDPR." },
    { q: "Planul Business include factura?", a: "Da. Emitem factura fiscala automata pentru fiecare plata. Pentru facturare custom sau PO, contacteaza-ne." },
  ];

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-16 lg:py-24 min-h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="text-center max-w-[480px] mx-auto mb-12">
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.025em]">{t("title")}</h1>
        <p className="mt-3 text-[15px] text-muted-foreground">{t("subtitle")}</p>

        {/* Billing toggle */}
        <div className="mt-6 inline-flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-md px-4 py-1.5 text-[13px] font-medium transition-colors ${billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tc("monthly")}
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`rounded-md px-4 py-1.5 text-[13px] font-medium transition-colors ${billing === "yearly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tc("yearly")} <span className="text-[11px] opacity-80">(-17%)</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div key={billing} className="grid gap-5 lg:grid-cols-3 mb-24" style={{ animation: "pricing-fade 0.4s ease-out" }}>
        {plans.map((p, i) => {
          const price = billing === "yearly" ? p.yearly : p.monthly;
          const period = p.period ? p.period + (billing === "yearly" ? "/an" : `/${tc("monthly").toLowerCase().slice(0,2)}`) : (billing === "yearly" ? "/an" : `/${tc("monthly").toLowerCase().slice(0,2)}`);
          return (
            <div key={i} className={`flex flex-col rounded-xl border p-7 transition-all duration-300 hover:translate-y-[-2px] ${p.primary ? "border-primary ring-1 ring-primary/20 bg-primary/[0.02]" : "border-border bg-card"}`} style={{ animationDelay: `${i * 0.08}s`, boxShadow: "var(--shadow-card)" }}>
              {p.primary && <p className="text-[11px] font-medium text-primary mb-3 uppercase tracking-wide">{t("mostPopular")}</p>}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-0.5">
                <span className="text-[36px] font-bold tracking-tight">&euro;<AnimatedPrice value={price} /></span>
                <span className="text-[13px] text-muted-foreground transition-opacity duration-300">{price > 0 ? period : ""}</span>
              </div>
              <p className="mt-1 text-[13px] text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px]">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={p.href} className="mt-8">
                <Button variant={p.primary ? "default" : "outline"} className="w-full h-10 text-[13px]">{p.cta}</Button>
              </Link>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="max-w-[640px] mx-auto">
        <h2 className="text-xl font-semibold text-center mb-8">{t("faq")}</h2>
        <div className="divide-y divide-border">
          {faqs.map((item, i) => (
            <div key={i}>
              <button onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between py-4 text-left">
                <span className="text-[14px] font-medium pr-4">{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${faq === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-200 ${faq === i ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="text-[13px] text-muted-foreground leading-[1.6]">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
