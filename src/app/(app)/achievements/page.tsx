"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Flame, BookOpen, Brain, Target, Zap, Star, Clock, Users, Award, Lock } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  rarity: "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY";
  unlocked: boolean;
  unlockedAt: string | null;
}

const RARITY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  COMMON: { bg: "bg-muted", text: "text-muted-foreground", border: "border-border/50" },
  UNCOMMON: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/30" },
  RARE: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30" },
  EPIC: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/30" },
  LEGENDARY: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/30" },
};

const RARITY_LABELS: Record<string, Record<string, string>> = {
  ro: { COMMON: "Comun", UNCOMMON: "Neobisnuit", RARE: "Rar", EPIC: "Epic", LEGENDARY: "Legendar" },
  en: { COMMON: "Common", UNCOMMON: "Uncommon", RARE: "Rare", EPIC: "Epic", LEGENDARY: "Legendary" },
};

const ICON_MAP: Record<string, React.ReactNode> = {
  "First Steps": <BookOpen className="h-5 w-5" />,
  "Streak Starter": <Flame className="h-5 w-5" />,
  "Quiz Ace": <Star className="h-5 w-5" />,
  "Knowledge Seeker": <Brain className="h-5 w-5" />,
  "Streak Master": <Flame className="h-5 w-5" />,
  "Course Champion": <Trophy className="h-5 w-5" />,
  "Speed Learner": <Zap className="h-5 w-5" />,
  "Night Owl": <Clock className="h-5 w-5" />,
  "Goal Crusher": <Target className="h-5 w-5" />,
  "Social Butterfly": <Users className="h-5 w-5" />,
  "Marathon Learner": <Clock className="h-5 w-5" />,
  "Polyglot": <Award className="h-5 w-5" />,
  "Century": <Star className="h-5 w-5" />,
  "Streak Legend": <Flame className="h-5 w-5" />,
};

export default function AchievementsPage() {
  const t = useTranslations("achievements");
  const tc = useTranslations("common");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/achievements")
      .then(r => r.ok ? r.json() : [])
      .then(setAchievements)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const unlocked = achievements.filter(a => a.unlocked);
  const locked = achievements.filter(a => !a.unlocked);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-24 bg-muted rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2"><Trophy className="h-6 w-6 text-primary" />{t("title")}</h1>
        </div>
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">{t("noAchievements")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("noAchievementsDesc")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Trophy className="h-6 w-6 text-primary" />{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{unlocked.length}/{achievements.length} {t("unlockedCount")}</p>
      </div>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">{t("unlocked")}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {unlocked.map(a => <AchievementCard key={a.id} achievement={a} t={t} />)}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-4">{t("locked")}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {locked.map(a => <AchievementCard key={a.id} achievement={a} t={t} />)}
          </div>
        </>
      )}
    </div>
  );
}

function AchievementCard({ achievement: a, t }: { achievement: Achievement; t: (key: string) => string }) {
  const style = RARITY_STYLES[a.rarity] ?? RARITY_STYLES.COMMON!;
  const icon = ICON_MAP[a.name] ?? <Award className="h-5 w-5" />;

  return (
    <Card className={`${a.unlocked ? style.border : "border-border/30 opacity-70"} transition-all hover:opacity-100`}>
      <CardContent className="flex items-start gap-4 py-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${a.unlocked ? style.bg : "bg-muted"} ${a.unlocked ? style.text : "text-muted-foreground/50"}`}>
          {a.unlocked ? icon : <Lock className="h-5 w-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">{a.name}</p>
            <Badge variant="outline" className={`text-xs ${style.text}`}>{a.rarity.charAt(0) + a.rarity.slice(1).toLowerCase()}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
          {a.unlocked && a.unlockedAt && (
            <p className="text-xs text-primary mt-1">{t("unlockedOn")} {new Date(a.unlockedAt).toLocaleDateString()}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
