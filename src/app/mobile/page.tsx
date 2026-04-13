"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Apple, Smartphone, Mic, Brain,
  Download, QrCode, Zap, Shield, Cloud, Bell, Wifi, Clock,
} from "lucide-react";

export default function MobileLandingPage() {
  const t = useTranslations("mobile");
  const tc = useTranslations("common");

  const features = [
    { icon: Brain, title: t("aiPocket"), description: t("aiPocketDesc") },
    { icon: Mic, title: t("voiceConversations"), description: t("voiceDesc") },
    { icon: Wifi, title: t("worksOffline"), description: t("offlineDesc") },
    { icon: Bell, title: t("smartNotifications"), description: t("notifDesc") },
    { icon: Zap, title: t("microSessions"), description: t("microDesc") },
    { icon: Cloud, title: t("seamlessSync"), description: t("syncDesc") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-6 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge className="mb-4 bg-primary/20 text-primary">
                <Smartphone className="mr-1.5 h-3 w-3" />{t("badge")}
              </Badge>
              <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
                {t("title")}<br />
                <span className="text-gradient">{t("titleHighlight")}</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                {t("subtitle")}
              </p>

              <div className="mt-8">
                <Badge variant="outline" className="text-sm px-4 py-2">
                  <Clock className="mr-2 h-4 w-4" />{t("comingSoon")}
                </Badge>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Button size="lg" className="h-14 gap-3 px-6" disabled>
                  <Apple className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-[10px] opacity-80">{t("downloadOn")}</div>
                    <div className="text-sm font-semibold">{t("appStore")}</div>
                  </div>
                </Button>
                <Button size="lg" variant="outline" className="h-14 gap-3 px-6" disabled>
                  <Download className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-[10px] opacity-80">{t("getItOn")}</div>
                    <div className="text-sm font-semibold">{t("googlePlay")}</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[9/19] rounded-[2.5rem] border-[10px] border-foreground/80 bg-gradient-to-b from-background to-card shadow-2xl">
                <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-foreground/80" />
                <div className="h-full w-full rounded-[1.8rem] bg-card p-6 pt-10">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm font-semibold">{t("mockToday")}</p>
                    <Badge className="bg-primary/20 text-primary text-xs">{t("mockStreak")}</Badge>
                  </div>
                  <div className="mb-4 rounded-xl bg-primary/10 p-4">
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <Brain className="h-3 w-3" />
                      <span className="font-semibold">{t("mockCoach")}</span>
                    </div>
                    <p className="mt-2 text-sm">{t("mockCoachMsg")}</p>
                  </div>
                  <div className="space-y-2">
                    {[t("mockLesson1"), t("mockLesson2"), t("mockLesson3")].map((item, i) => (
                      <div key={i} className="rounded-lg border border-border/50 p-3 text-xs">
                        {item}
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
                      <span className="font-semibold">{t("mockVoice")}</span>
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">{t("mockVoiceDesc")}</p>
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
          <h2 className="text-3xl font-bold lg:text-4xl">{t("builtForLearning")}</h2>
          <p className="mt-4 text-muted-foreground">
            {t("builtSubtitle")}
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
            <h3 className="text-xl font-bold">{t("scanDownload")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("scanDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-20">
        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="py-16 text-center">
            <Shield className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("freeToStart")}</h2>
            <p className="mt-4 text-muted-foreground">{t("installApp")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="h-12 gap-2 px-6" disabled><Apple className="h-5 w-5" />{t("appStore")}</Button>
              <Button size="lg" variant="outline" className="h-12 gap-2 px-6" disabled><Download className="h-5 w-5" />{t("googlePlay")}</Button>
              <Link href="/register"><Button size="lg" variant="ghost" className="h-12">{t("startOnWeb")}</Button></Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
