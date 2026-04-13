import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const nodes = await db.knowledgeNode.findMany({
    where: { userId: session.user.id },
    include: {
      dependents: {
        include: { toNode: { select: { id: true, topicName: true } } },
      },
    },
    orderBy: { topicName: "asc" },
  });

  return NextResponse.json(nodes.map(n => ({
    id: n.id,
    topicId: n.topicId,
    topic: n.topicName,
    mastery: Math.round(n.masteryLevel),
    status: n.status,
    lastReviewed: n.lastReviewed?.toISOString() ?? null,
    nextReviewDue: n.nextReviewDue?.toISOString() ?? null,
    timesReviewed: n.timesReviewed,
    timesCorrect: n.timesCorrect,
    relatedTopics: n.dependents.map(e => ({
      id: e.toNode.id,
      name: e.toNode.topicName,
    })),
  })));
}
