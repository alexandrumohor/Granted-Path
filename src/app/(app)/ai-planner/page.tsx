"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, Brain, Calendar, Target, BookOpen, Loader2,
} from "lucide-react";

export default function AIPlannerPage() {
  const t = useTranslations("aiPlanner");
  const tc = useTranslations("common");
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/user/goals").then(r => r.ok ? r.json() : []),
      fetch("/api/dashboard").then(r => r.ok ? r.json() : null),
    ])
      .then(([goals, dashboard]) => {
        setHasData(goals.length > 0 || (dashboard && dashboard.activeCourses.length > 0));
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
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">{t("noPlan")}</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{t("noPlanDesc")}</p>

            <div className="mt-8 grid gap-4 max-w-lg mx-auto sm:grid-cols-2">
              <Card className="border-primary/20">
                <CardContent className="pt-6 text-center">
                  <Target className="mx-auto h-8 w-8 text-primary mb-3" />
                  <p className="text-sm font-medium">{t("needGoals")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("needGoalsDesc")}</p>
                  <Link href="/goals"><Button variant="outline" size="sm" className="mt-3">{t("addGoal")}</Button></Link>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="pt-6 text-center">
                  <BookOpen className="mx-auto h-8 w-8 text-primary mb-3" />
                  <p className="text-sm font-medium">{t("needCourses")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t("needCoursesDesc")}</p>
                  <Link href="/learn"><Button variant="outline" size="sm" className="mt-3">{t("browseCourses")}</Button></Link>
                </CardContent>
              </Card>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">{t("planUnlock")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-12 text-center">
          <Brain className="mx-auto h-10 w-10 text-primary mb-4" />
          <p className="font-medium">{t("plannerReady")}</p>
          <p className="text-sm text-muted-foreground mt-2">{t("plannerReadyDesc")}</p>
          <Badge variant="secondary" className="mt-4">{t("comingSoon")}</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
