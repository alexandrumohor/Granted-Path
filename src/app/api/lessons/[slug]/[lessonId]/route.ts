import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string; lessonId: string }> }) {
  const { slug, lessonId } = await params;

  const course = await db.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  let foundLesson = null;
  let foundModule = null;

  for (const mod of course.modules) {
    const lesson = mod.lessons.find(l => l.id === lessonId);
    if (lesson) {
      foundLesson = lesson;
      foundModule = mod;
      break;
    }
  }

  if (!foundLesson || !foundModule) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const allLessons = course.modules.flatMap(m => m.lessons.map(l => ({ id: l.id, title: l.title })));
  const currentIdx = allLessons.findIndex(l => l.id === lessonId);

  return NextResponse.json({
    course: {
      title: course.title,
      slug: course.slug,
    },
    module: {
      title: foundModule.title,
    },
    lesson: {
      id: foundLesson.id,
      title: foundLesson.title,
      estimatedMinutes: foundLesson.estimatedMinutes,
      content: foundLesson.content,
    },
    prevLesson: currentIdx > 0 ? allLessons[currentIdx - 1] : null,
    nextLesson: currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null,
  });
}
