import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const exercises = await db.exercise.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
    include: {
      lesson: {
        select: {
          module: {
            select: {
              course: { select: { title: true, category: true } },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(exercises.map(e => ({
    id: e.id,
    type: e.type,
    question: e.question,
    options: e.options,
    correctAnswer: e.correctAnswer,
    explanation: e.explanation,
    difficulty: e.difficulty,
    hints: e.hints,
    topic: e.lesson?.module?.course?.title ?? "",
  })));
}
