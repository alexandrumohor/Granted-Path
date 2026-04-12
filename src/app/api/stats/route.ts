import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const revalidate = 300;

export async function GET() {
  const [userCount, courseCount, lessonCount, achievementCount] = await Promise.all([
    db.user.count(),
    db.course.count({ where: { isPublished: true } }),
    db.lesson.count(),
    db.achievement.count(),
  ]);

  return NextResponse.json({
    users: userCount,
    courses: courseCount,
    lessons: lessonCount,
    achievements: achievementCount,
  });
}
