"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, Target, Brain, BookOpen, Loader2,
} from "lucide-react";

export default function ExamPredictorPage() {
  const t = useTranslations("examPredictor");
  const tc = useTranslations("common");
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/user/goals").then(r => r.ok ? r.json() : []),
      fetch("/api/user/knowledge").then(r => r.ok ? r.json() : []),
    ])
      .then(([goals, nodes]) => {
        const examGoals = goals.filter((g: { type: string }) => g.type === "EXAM");
        setHasData(examGoals.length > 0 && nodes.length > 0);
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
      <div className="p-6 lg:p-8">
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
            <p className="text-lg font-medium">{t("noData")}</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{t("noDataDesc")}</p>

            <div className="mt-8 grid gap-4 max-w-lg mx-auto sm:grid-cols-2">
              <Card className="border-primary/20">
                <CardContent className="pt-6 text-center">
                  <Target className="mx-auto h-8 w-8 text-primary mb-3" />
                  <p className="text-sm font-medium">{t("step1")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("step1Desc")}</p>
                  <Link href="/goals"><Button variant="outline" size="sm" className="mt-3">{t("addExamGoal")}</Button></Link>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="pt-6 text-center">
                  <BookOpen className="mx-auto h-8 w-8 text-primary mb-3" />
                  <p className="text-sm font-medium">{t("step2")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("step2Desc")}</p>
                  <Link href="/learn"><Button variant="outline" size="sm" className="mt-3">{t("startLearning")}</Button></Link>
                </CardContent>
              </Card>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">{t("unlockAfter")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          {t("title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-12 text-center">
          <Brain className="mx-auto h-10 w-10 text-primary mb-4" />
          <p className="font-medium">{t("analyzing")}</p>
          <p className="text-sm text-muted-foreground mt-2">{t("analyzingDesc")}</p>
          <Badge variant="secondary" className="mt-4">{t("comingSoon")}</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
