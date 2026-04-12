"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Flame, BookOpen, Brain, Target, Zap, Star, Clock, Users, Award, Lock } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY";
  unlocked: boolean;
  unlockedAt?: string;
  progress?: { current: number; target: number };
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "1", name: "First Steps", description: "Complete your first lesson", icon: <BookOpen className="h-5 w-5" />, rarity: "COMMON", unlocked: true, unlockedAt: "2 days ago" },
  { id: "2", name: "Streak Starter", description: "Maintain a 7-day streak", icon: <Flame className="h-5 w-5" />, rarity: "COMMON", unlocked: true, unlockedAt: "Yesterday" },
  { id: "3", name: "Quiz Ace", description: "Score 100% on any quiz", icon: <Star className="h-5 w-5" />, rarity: "UNCOMMON", unlocked: true, unlockedAt: "Today" },
  { id: "4", name: "Knowledge Seeker", description: "Complete 10 lessons", icon: <Brain className="h-5 w-5" />, rarity: "UNCOMMON", unlocked: false, progress: { current: 6, target: 10 } },
  { id: "5", name: "Streak Master", description: "Maintain a 30-day streak", icon: <Flame className="h-5 w-5" />, rarity: "RARE", unlocked: false, progress: { current: 12, target: 30 } },
  { id: "6", name: "Course Champion", description: "Complete your first course", icon: <Trophy className="h-5 w-5" />, rarity: "RARE", unlocked: false, progress: { current: 45, target: 100 } },
  { id: "7", name: "Speed Learner", description: "Complete a lesson in under 5 minutes", icon: <Zap className="h-5 w-5" />, rarity: "UNCOMMON", unlocked: false },
  { id: "8", name: "Night Owl", description: "Study after midnight", icon: <Clock className="h-5 w-5" />, rarity: "COMMON", unlocked: false },
  { id: "9", name: "Goal Crusher", description: "Complete 5 goals", icon: <Target className="h-5 w-5" />, rarity: "EPIC", unlocked: false, progress: { current: 0, target: 5 } },
  { id: "10", name: "Social Butterfly", description: "Join 3 study groups", icon: <Users className="h-5 w-5" />, rarity: "UNCOMMON", unlocked: false, progress: { current: 0, target: 3 } },
  { id: "11", name: "Marathon Learner", description: "Study for 2+ hours in one session", icon: <Clock className="h-5 w-5" />, rarity: "RARE", unlocked: false },
  { id: "12", name: "Polyglot", description: "Study courses in 3 different categories", icon: <Award className="h-5 w-5" />, rarity: "EPIC", unlocked: false, progress: { current: 2, target: 3 } },
  { id: "13", name: "Century", description: "Reach level 100", icon: <Star className="h-5 w-5" />, rarity: "LEGENDARY", unlocked: false, progress: { current: 8, target: 100 } },
  { id: "14", name: "Streak Legend", description: "Maintain a 365-day streak", icon: <Flame className="h-5 w-5" />, rarity: "LEGENDARY", unlocked: false, progress: { current: 12, target: 365 } },
];

const RARITY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  COMMON: { bg: "bg-muted", text: "text-muted-foreground", border: "border-border/50" },
  UNCOMMON: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/30" },
  RARE: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30" },
  EPIC: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/30" },
  LEGENDARY: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/30" },
};

export default function AchievementsPage() {
  const t = useTranslations("achievements");
  const tc = useTranslations("common");
  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked);
  const locked = ACHIEVEMENTS.filter(a => !a.unlocked);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Trophy className="h-6 w-6 text-primary" />{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{unlocked.length}/{ACHIEVEMENTS.length} unlocked</p>
      </div>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">{t("unlocked")}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {unlocked.map(a => <AchievementCard key={a.id} achievement={a} />)}
          </div>
        </div>
      )}

      {/* Locked */}
      <h2 className="text-lg font-semibold mb-4">{t("locked")}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {locked.map(a => <AchievementCard key={a.id} achievement={a} />)}
      </div>
    </div>
  );
}

function AchievementCard({ achievement: a }: { achievement: Achievement }) {
  const style = RARITY_STYLES[a.rarity] ?? RARITY_STYLES.COMMON!;
  return (
    <Card className={`${a.unlocked ? style.border : "border-border/30 opacity-70"} transition-all hover:opacity-100`}>
      <CardContent className="flex items-start gap-4 py-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${a.unlocked ? style.bg : "bg-muted"} ${a.unlocked ? style.text : "text-muted-foreground/50"}`}>
          {a.unlocked ? a.icon : <Lock className="h-5 w-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">{a.name}</p>
            <Badge variant="outline" className={`text-xs ${style.text}`}>{a.rarity.charAt(0) + a.rarity.slice(1).toLowerCase()}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
          {a.unlocked && a.unlockedAt && <p className="text-xs text-primary mt-1">Unlocked {a.unlockedAt}</p>}
          {!a.unlocked && a.progress && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>{a.progress.current}/{a.progress.target}</span></div>
              <div className="h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary/50" style={{ width: `${(a.progress.current / a.progress.target) * 100}%` }} /></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
