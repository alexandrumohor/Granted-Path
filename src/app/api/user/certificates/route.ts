import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const certificates = await db.certificate.findMany({
    where: { userId: session.user.id },
    orderBy: { issuedAt: "desc" },
  });

  return NextResponse.json(certificates.map(c => ({
    id: c.id,
    title: c.title,
    courseId: c.courseId,
    type: c.type,
    score: c.score,
    hoursSpent: c.hoursSpent,
    issuedAt: c.issuedAt.toISOString().split("T")[0],
  })));
}
