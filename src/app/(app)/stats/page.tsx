"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Clock, BookOpen, Dumbbell, Flame, Zap, TrendingUp, TrendingDown, Calendar } from "lucide-react";

const DAILY_DATA = [
  { day: "Mon", minutes: 45 }, { day: "Tue", minutes: 30 }, { day: "Wed", minutes: 0 },
  { day: "Thu", minutes: 60 }, { day: "Fri", minutes: 25 }, { day: "Sat", minutes: 90 },
  { day: "Sun", minutes: 40 },
];
const maxMin = Math.max(...DAILY_DATA.map(d => d.minutes));

const WEEKLY_STATS = {
  thisWeek: { minutes: 290, lessons: 12, exercises: 45, xp: 680 },
  lastWeek: { minutes: 220, lessons: 8, exercises: 32, xp: 480 },
};

const TOPIC_TIME = [
  { topic: "Python", minutes: 120, pct: 42 },
  { topic: "Marketing", minutes: 85, pct: 29 },
  { topic: "English", minutes: 55, pct: 19 },
  { topic: "Project Mgmt", minutes: 30, pct: 10 },
];

const BEST_HOURS = [
  { hour: "6-9", pct: 5 }, { hour: "9-12", pct: 15 }, { hour: "12-15", pct: 10 },
  { hour: "15-18", pct: 20 }, { hour: "18-21", pct: 35 }, { hour: "21-24", pct: 15 },
];
const maxHour = Math.max(...BEST_HOURS.map(h => h.pct));

export default function StatsPage() {
  const w = WEEKLY_STATS;
  const minDiff = w.thisWeek.minutes - w.lastWeek.minutes;
  const minPct = Math.round((minDiff / w.lastWeek.minutes) * 100);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="h-6 w-6 text-primary" />Statistics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your learning analytics and progress insights.</p>
      </div>

      {/* Overview cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Clock className="h-5 w-5 text-blue-400" />} label="Study Time" value={`${w.thisWeek.minutes}m`} change={minPct} />
        <StatCard icon={<BookOpen className="h-5 w-5 text-primary" />} label="Lessons" value={String(w.thisWeek.lessons)} change={Math.round(((w.thisWeek.lessons - w.lastWeek.lessons) / w.lastWeek.lessons) * 100)} />
        <StatCard icon={<Dumbbell className="h-5 w-5 text-purple-400" />} label="Exercises" value={String(w.thisWeek.exercises)} change={Math.round(((w.thisWeek.exercises - w.lastWeek.exercises) / w.lastWeek.exercises) * 100)} />
        <StatCard icon={<Zap className="h-5 w-5 text-primary" />} label="XP Earned" value={String(w.thisWeek.xp)} change={Math.round(((w.thisWeek.xp - w.lastWeek.xp) / w.lastWeek.xp) * 100)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily study time bar chart */}
        <Card>
          <CardHeader><CardTitle className="text-base">Daily Study Time</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {DAILY_DATA.map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{d.minutes}m</span>
                  <div className="w-full rounded-t bg-primary/20 relative" style={{ height: `${maxMin > 0 ? (d.minutes / maxMin) * 100 : 0}%`, minHeight: d.minutes > 0 ? "4px" : "0" }}>
                    <div className="absolute inset-0 rounded-t bg-primary" style={{ opacity: d.minutes > 0 ? 0.7 : 0 }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Topic distribution */}
        <Card>
          <CardHeader><CardTitle className="text-base">Time per Topic</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {TOPIC_TIME.map(t => (
              <div key={t.topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t.topic}</span>
                  <span className="text-muted-foreground">{t.minutes}m ({t.pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Best study time */}
        <Card>
          <CardHeader><CardTitle className="text-base">Best Study Time</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-32">
              {BEST_HOURS.map(h => (
                <div key={h.hour} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{h.pct}%</span>
                  <div className="w-full rounded-t bg-primary transition-all" style={{ height: `${(h.pct / maxHour) * 100}%`, opacity: h.pct === maxHour ? 1 : 0.4 }} />
                  <span className="text-xs text-muted-foreground leading-tight text-center">{h.hour}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center">You learn best between <span className="font-medium text-primary">18:00 - 21:00</span></p>
          </CardContent>
        </Card>

        {/* Week comparison */}
        <Card>
          <CardHeader><CardTitle className="text-base">This Week vs Last Week</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <CompareRow label="Study time" current={`${w.thisWeek.minutes}m`} previous={`${w.lastWeek.minutes}m`} better={w.thisWeek.minutes >= w.lastWeek.minutes} />
            <CompareRow label="Lessons" current={String(w.thisWeek.lessons)} previous={String(w.lastWeek.lessons)} better={w.thisWeek.lessons >= w.lastWeek.lessons} />
            <CompareRow label="Exercises" current={String(w.thisWeek.exercises)} previous={String(w.lastWeek.exercises)} better={w.thisWeek.exercises >= w.lastWeek.exercises} />
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
        <p className="text-xs text-muted-foreground">{label} this week</p>
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
