"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, MessageSquare, Brain, BookOpen, Target, Loader2,
} from "lucide-react";

export default function AICoachPage() {
  const t = useTranslations("aiCoach");
  const tc = useTranslations("common");
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/stats")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        setHasData(data && data.thisWeek.minutes > 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="mx-auto max-w-6xl p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Brain className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">{t("noSessions")}</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{t("noSessionsDesc")}</p>

            <div className="mt-8 grid gap-4 max-w-lg mx-auto sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">{t("howStep1")}</p>
                <p className="text-xs text-muted-foreground mt-1">{t("howStep1Desc")}</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">{t("howStep2")}</p>
                <p className="text-xs text-muted-foreground mt-1">{t("howStep2Desc")}</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">{t("howStep3")}</p>
                <p className="text-xs text-muted-foreground mt-1">{t("howStep3Desc")}</p>
              </div>
            </div>

            <Link href="/learn"><Button className="mt-8">{t("startLearning")}</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button size="lg"><MessageSquare className="mr-2 h-4 w-4" />{t("startSession")}</Button>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-12 text-center">
          <Brain className="mx-auto h-10 w-10 text-primary mb-4" />
          <p className="font-medium">{t("coachReady")}</p>
          <p className="text-sm text-muted-foreground mt-2">{t("coachReadyDesc")}</p>
          <Badge variant="secondary" className="mt-4">{t("comingSoon")}</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
