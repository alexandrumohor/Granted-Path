import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const groups = await db.studyGroup.findMany({
    where: { isPublic: true },
    include: {
      _count: { select: { members: true, messages: true } },
      challenges: {
        where: { endsAt: { gte: new Date() } },
        take: 1,
        orderBy: { endsAt: "asc" },
      },
      members: {
        where: { userId: session.user.id },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(groups.map(g => ({
    id: g.id,
    name: g.name,
    description: g.description,
    topic: g.topicId ?? "",
    memberCount: g._count.members,
    maxMembers: g.maxMembers,
    isPublic: g.isPublic,
    isMember: g.members.length > 0,
    activeChallenge: g.challenges[0]?.title ?? null,
  })));
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, topic } = body as { name: string; description: string; topic: string };

  if (!name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  const group = await db.studyGroup.create({
    data: {
      name,
      description: description || null,
      topicId: topic || null,
      creatorId: session.user.id,
      members: {
        create: { userId: session.user.id, role: "OWNER" },
      },
    },
  });

  return NextResponse.json({ id: group.id, name: group.name });
}
