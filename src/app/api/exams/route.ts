import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const templates = await db.examTemplate.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(templates.map(t => ({
    id: t.id,
    name: t.name,
    description: t.description,
    totalQuestions: t.totalQuestions,
    timeLimitMin: t.timeLimitMin,
    passingScore: t.passingScore,
    country: t.country,
    questions: t.questions,
  })));
}
