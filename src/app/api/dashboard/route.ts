import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [profile, enrollments, goals, weekStreaks] = await Promise.all([
    db.learnerProfile.findUnique({ where: { userId } }),
    db.userCourseEnrollment.findMany({
      where: { userId, status: "ACTIVE" },
      include: {
        course: {
          include: {
            modules: {
              orderBy: { order: "asc" },
              include: {
                lessons: { orderBy: { order: "asc" } },
              },
            },
          },
        },
      },
      orderBy: { lastAccessedAt: "desc" },
      take: 5,
    }),
    db.goal.findMany({
      where: { userId, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    db.streak.findMany({
      where: {
        userId,
        date: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      orderBy: { date: "asc" },
    }),
  ]);

  const weekMinutes = weekStreaks.reduce((s, d) => s + d.minutesStudied, 0);
  const weekXp = weekStreaks.reduce((s, d) => s + d.xpEarned, 0);
  const lessonsCompleted = await db.userLessonProgress.count({
    where: { userId, status: "COMPLETED" },
  });

  const activeCourses = enrollments.map(e => {
    const totalLessons = e.course.modules.reduce((s, m) => s + m.lessons.length, 0);
    const nextModule = e.course.modules.find(m =>
      m.lessons.some(l => true)
    );
    const nextLesson = nextModule?.lessons[0];
    return {
      title: e.course.title,
      slug: e.course.slug,
      progress: Math.round(e.progressPercent),
      totalLessons,
      nextModule: nextModule?.title ?? "",
      nextLesson: nextLesson?.title ?? "",
      estimatedMinutes: nextLesson?.estimatedMinutes ?? 0,
    };
  });

  return NextResponse.json({
    profile: profile ? {
      totalXP: profile.totalXP,
      level: profile.level,
      currentStreak: profile.currentStreak,
    } : { totalXP: 0, level: 1, currentStreak: 0 },
    activeCourses,
    goals: goals.map(g => ({
      id: g.id,
      title: g.title,
      targetDate: g.targetDate?.toISOString().split("T")[0] ?? null,
      progress: Math.round(g.progressPercent),
    })),
    weekStats: {
      minutes: weekMinutes,
      xp: weekXp,
      streak: profile?.currentStreak ?? 0,
      lessonsCompleted,
    },
  });
}
