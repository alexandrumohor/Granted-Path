import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const goals = await db.goal.findMany({
    where: { userId: session.user.id },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(goals.map(g => ({
    id: g.id,
    title: g.title,
    type: g.type,
    description: g.description,
    targetDate: g.targetDate?.toISOString().split("T")[0] ?? null,
    progress: Math.round(g.progressPercent),
    status: g.status,
  })));
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, type, targetDate } = body as { title: string; type: string; targetDate?: string };

  if (!title) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }

  const goal = await db.goal.create({
    data: {
      userId: session.user.id,
      title,
      type: (type as "EXAM" | "SKILL" | "CAREER" | "CURIOSITY" | "CUSTOM") || "CURIOSITY",
      targetDate: targetDate ? new Date(targetDate) : null,
    },
  });

  return NextResponse.json({
    id: goal.id,
    title: goal.title,
    type: goal.type,
    targetDate: goal.targetDate?.toISOString().split("T")[0] ?? null,
    progress: 0,
    status: goal.status,
  });
}
