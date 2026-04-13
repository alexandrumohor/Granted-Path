import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  const [thisWeekStats, lastWeekStats, profile] = await Promise.all([
    db.dailyStudyStats.findMany({
      where: { userId, date: { gte: startOfWeek } },
    }),
    db.dailyStudyStats.findMany({
      where: { userId, date: { gte: startOfLastWeek, lt: startOfWeek } },
    }),
    db.learnerProfile.findUnique({ where: { userId } }),
  ]);

  const sum = (arr: typeof thisWeekStats, key: keyof typeof thisWeekStats[0]) =>
    arr.reduce((s, d) => s + (typeof d[key] === "number" ? (d[key] as number) : 0), 0);

  const dayNames = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sam", "Dum"];
  const dailyData = dayNames.map((day, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    const stat = thisWeekStats.find(s => {
      const sd = new Date(s.date);
      return sd.getDate() === date.getDate() && sd.getMonth() === date.getMonth();
    });
    return { day, minutes: stat?.totalMinutes ?? 0 };
  });

  return NextResponse.json({
    thisWeek: {
      minutes: sum(thisWeekStats, "totalMinutes"),
      lessons: sum(thisWeekStats, "lessonsCompleted"),
      exercises: sum(thisWeekStats, "exercisesCompleted"),
      xp: sum(thisWeekStats, "xpEarned"),
    },
    lastWeek: {
      minutes: sum(lastWeekStats, "totalMinutes"),
      lessons: sum(lastWeekStats, "lessonsCompleted"),
      exercises: sum(lastWeekStats, "exercisesCompleted"),
      xp: sum(lastWeekStats, "xpEarned"),
    },
    dailyData,
    bestStudyHours: profile?.bestStudyHours ?? [],
  });
}
