import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const group = await db.studyGroup.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, name: true, image: true },
            },
        },
        orderBy: { joinedAt: "asc" },
      },
      messages: {
        orderBy: { createdAt: "asc" },
        take: 50,
        include: {
          user: { select: { id: true, name: true } },
        },
      },
      challenges: {
        where: { endsAt: { gte: new Date() } },
        take: 1,
        orderBy: { endsAt: "asc" },
      },
    },
  });

  if (!group) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: group.id,
    name: group.name,
    description: group.description,
    memberCount: group.members.length,
    members: group.members.map(m => ({
      id: m.user.id,
      name: m.user.name ?? "User",
      role: m.role,
      image: m.user.image,
    })),
    messages: group.messages.map(m => ({
      id: m.id,
      userId: m.userId,
      userName: m.user.name ?? "User",
      content: m.content,
      type: m.type,
      createdAt: m.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    })),
    activeChallenge: group.challenges[0] ? {
      title: group.challenges[0].title,
      description: group.challenges[0].description,
      endsAt: group.challenges[0].endsAt.toISOString(),
    } : null,
  });
}
