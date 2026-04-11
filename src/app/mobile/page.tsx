import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Apple, Smartphone, Bell, Wifi, Mic, Brain,
  Star, Download, QrCode, Zap, Shield, Cloud,
} from "lucide-react";

const features = [
  { icon: Brain, title: "AI Tutor in your pocket", description: "Ask anything, get explanations tailored to what you already know. Works offline for saved lessons." },
  { icon: Mic, title: "Voice conversations", description: "Practice pronunciation and speaking naturally with your AI tutor — anywhere, anytime." },
  { icon: Wifi, title: "Works offline", description: "Download lessons and flashcards. Your progress syncs automatically when you're back online." },
  { icon: Bell, title: "Smart notifications", description: "Personalized reminders based on your peak learning hours — not nagging schedule spam." },
  { icon: Zap, title: "2-minute micro-sessions", description: "Learn in the gaps: waiting in line, on the bus, between meetings. Every minute counts." },
  { icon: Cloud, title: "Seamless sync", description: "Start on mobile, continue on desktop. Your AI tutor remembers every conversation." },
];

const testimonials = [
  { name: "Maria P.", role: "Medical student", text: "I prep for exams on the metro. The AI coach actually challenges me instead of just giving answers.", rating: 5 },
  { name: "Dan I.", role: "Engineer", text: "Voice mode is genuinely useful for practicing technical interviews. Way better than I expected.", rating: 5 },
  { name: "Elena C.", role: "Language learner", text: "Finally an app where the AI gives feedback like a real tutor would. Pronunciation scoring is no joke.", rating: 5 },
];

export default function MobileLandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-6 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge className="mb-4 bg-primary/20 text-primary">
                <Smartphone className="mr-1.5 h-3 w-3" />Mobile App
              </Badge>
              <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
                Your AI tutor,<br />
                <span className="text-gradient">now in your pocket</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                The full Granted Path experience on iOS and Android. Voice conversations, offline lessons, smart reminders, and genuine AI coaching — everywhere you go.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="h-14 gap-3 px-6">
                  <Apple className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-[10px] opacity-80">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Button>
                <Button size="lg" variant="outline" className="h-14 gap-3 px-6">
                  <Download className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-[10px] opacity-80">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">4.9 · 12,400 reviews</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-2xl font-bold">250k+</p>
                  <p className="text-xs text-muted-foreground">Active learners</p>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[9/19] rounded-[2.5rem] border-[10px] border-foreground/80 bg-gradient-to-b from-background to-card shadow-2xl">
                <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-foreground/80" />
                <div className="h-full w-full rounded-[1.8rem] bg-card p-6 pt-10">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm font-semibold">Today</p>
                    <Badge className="bg-primary/20 text-primary text-xs">Day 12 🔥</Badge>
                  </div>
                  <div className="mb-4 rounded-xl bg-primary/10 p-4">
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <Brain className="h-3 w-3" />
                      <span className="font-semibold">AI Coach</span>
                    </div>
                    <p className="mt-2 text-sm">Ready for a 15-min async practice session?</p>
                  </div>
                  <div className="space-y-2">
                    {["Cloud Fundamentals · 8 min", "Flashcards · 12 cards", "Voice practice · 5 min"].map((t, i) => (
                      <div key={i} className="rounded-lg border border-border/50 p-3 text-xs">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 top-20 hidden lg:block">
                <Card className="w-56 border-primary/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-xs">
                      <Mic className="h-3 w-3 text-primary" />
                      <span className="font-semibold">Voice Mode</span>
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">Natural speaking practice with real-time feedback</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold lg:text-4xl">Built for how you actually learn</h2>
          <p className="mt-4 text-muted-foreground">
            Every feature is designed around one principle: respect your time and push you forward.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* QR Code */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-6 py-16">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border/50 bg-card p-8 text-center">
            <QrCode className="mx-auto mb-4 h-32 w-32 text-primary" />
            <h3 className="text-xl font-bold">Scan to download</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Point your phone camera at the QR code and tap the link. Auto-detects iOS or Android.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">Loved by learners everywhere</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 border-t border-border/50 pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-20">
        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="py-16 text-center">
            <Shield className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Free to start. No credit card.</h2>
            <p className="mt-4 text-muted-foreground">Install the app and start your first lesson in under 60 seconds.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="h-12 gap-2 px-6"><Apple className="h-5 w-5" />App Store</Button>
              <Button size="lg" variant="outline" className="h-12 gap-2 px-6"><Download className="h-5 w-5" />Google Play</Button>
              <Link href="/register"><Button size="lg" variant="ghost" className="h-12">Start on web</Button></Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
