"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Clock, BookOpen, Dumbbell, Zap, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface WeekData {
  minutes: number;
  lessons: number;
  exercises: number;
  xp: number;
}

interface StatsData {
  thisWeek: WeekData;
  lastWeek: WeekData;
  dailyData: { day: string; minutes: number }[];
}

export default function StatsPage() {
  const t = useTranslations("stats");
  const tc = useTranslations("common");
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/stats")
      .then(r => r.ok ? r.json() : null)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 bg-muted rounded-xl" />)}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-48 bg-muted rounded-xl" />
            <div className="h-48 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const hasData = data && (data.thisWeek.minutes > 0 || data.lastWeek.minutes > 0);

  if (!hasData) {
    return (
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6 text-primary" />{t("title")}</h1>
        </div>
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">{t("noStats")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("noStatsDesc")}</p>
            <Link href="/learn"><Button className="mt-4">{t("startLearning")}</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const w = data!;
  const maxMin = Math.max(...w.dailyData.map(d => d.minutes), 1);

  function pctChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6 text-primary" />{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Overview cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Clock className="h-5 w-5 text-blue-400" />} label={t("studyTime")} value={`${w.thisWeek.minutes}m`} change={pctChange(w.thisWeek.minutes, w.lastWeek.minutes)} />
        <StatCard icon={<BookOpen className="h-5 w-5 text-primary" />} label={tc("lessons")} value={String(w.thisWeek.lessons)} change={pctChange(w.thisWeek.lessons, w.lastWeek.lessons)} />
        <StatCard icon={<Dumbbell className="h-5 w-5 text-purple-400" />} label={t("exercises")} value={String(w.thisWeek.exercises)} change={pctChange(w.thisWeek.exercises, w.lastWeek.exercises)} />
        <StatCard icon={<Zap className="h-5 w-5 text-primary" />} label="XP" value={String(w.thisWeek.xp)} change={pctChange(w.thisWeek.xp, w.lastWeek.xp)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily study time bar chart */}
        <Card>
          <CardHeader><CardTitle className="text-base">{t("dailyStudy")}</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {w.dailyData.map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{d.minutes}m</span>
                  <div className="w-full rounded-t bg-primary/20 relative" style={{ height: `${(d.minutes / maxMin) * 100}%`, minHeight: d.minutes > 0 ? "4px" : "0" }}>
                    <div className="absolute inset-0 rounded-t bg-primary" style={{ opacity: d.minutes > 0 ? 0.7 : 0 }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Week comparison */}
        <Card>
          <CardHeader><CardTitle className="text-base">{t("weekComparison")}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <CompareRow label={t("studyTime")} current={`${w.thisWeek.minutes}m`} previous={`${w.lastWeek.minutes}m`} better={w.thisWeek.minutes >= w.lastWeek.minutes} />
            <CompareRow label={tc("lessons")} current={String(w.thisWeek.lessons)} previous={String(w.lastWeek.lessons)} better={w.thisWeek.lessons >= w.lastWeek.lessons} />
            <CompareRow label={t("exercises")} current={String(w.thisWeek.exercises)} previous={String(w.lastWeek.exercises)} better={w.thisWeek.exercises >= w.lastWeek.exercises} />
            <CompareRow label="XP" current={String(w.thisWeek.xp)} previous={String(w.lastWeek.xp)} better={w.thisWeek.xp >= w.lastWeek.xp} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change }: { icon: React.ReactNode; label: string; value: string; change: number }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          {icon}
          <Badge variant={change >= 0 ? "default" : "secondary"} className="text-xs flex items-center gap-1">
            {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {change >= 0 ? "+" : ""}{change}%
          </Badge>
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

function CompareRow({ label, current, previous, better }: { label: string; current: string; previous: string; better: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">{previous}</span>
        <span className="text-muted-foreground">&rarr;</span>
        <span className={`text-sm font-semibold ${better ? "text-green-500" : "text-red-400"}`}>{current}</span>
      </div>
    </div>
  );
}
