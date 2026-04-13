import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [allAchievements, userAchievements] = await Promise.all([
    db.achievement.findMany({ orderBy: { name: "asc" } }),
    db.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    }),
  ]);

  const unlockedIds = new Set(userAchievements.map(ua => ua.achievementId));

  const achievements = allAchievements.map(a => ({
    id: a.id,
    name: a.name,
    description: a.description,
    rarity: a.rarity,
    unlocked: unlockedIds.has(a.id),
    unlockedAt: userAchievements.find(ua => ua.achievementId === a.id)?.unlockedAt?.toISOString() ?? null,
  }));

  return NextResponse.json(achievements);
}
