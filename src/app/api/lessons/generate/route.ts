import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { anthropic, AI_MODEL } from "@/lib/ai/client";

const CACHE_HOURS = 24 * 7; // regenerate after 7 days

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId } = (await req.json()) as { lessonId: string };
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: {
          course: { select: { title: true, category: true, sources: true, language: true } },
        },
      },
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  // Check cache — return existing content if fresh
  const content = lesson.content as unknown[];
  const hasRealContent = Array.isArray(content) && content.length > 3;
  const isFresh = lesson.contentGeneratedAt &&
    (Date.now() - lesson.contentGeneratedAt.getTime()) < CACHE_HOURS * 60 * 60 * 1000;

  if (hasRealContent && isFresh) {
    return NextResponse.json({ content: lesson.content, cached: true });
  }

  // Build source context
  const courseSources = (lesson.module.course.sources as { name: string; url: string }[]) || [];
  const lessonSources = (lesson.sourceUrls as string[]) || [];
  const allSources = [
    ...courseSources.map(s => `${s.name}: ${s.url}`),
    ...lessonSources,
  ];

  const lang = lesson.module.course.language === "ro" ? "romana" : "English";
  const sourceBlock = allSources.length > 0
    ? `\n\nSURSE OFICIALE (citeaza-le in continut):\n${allSources.map((s, i) => `${i + 1}. ${s}`).join("\n")}`
    : "";

  const prompt = `Genereaza o lectie educativa completa in limba ${lang}.

CURS: ${lesson.module.course.title}
MODUL: ${lesson.module.title}
LECTIE: ${lesson.title}
${sourceBlock}

REGULI:
- Continutul TREBUIE sa fie bazat pe documentatia oficiala / surse autoritare
- Citeaza sursa cand explici ceva: "Conform documentatiei oficiale Python..."
- Structura: headings, paragrafe explicative, exemple de cod (daca e programare), callout-uri tip/warning, si un quiz inline la final
- Fii detaliat dar clar — 800-1200 cuvinte
- La final, include sectiunea "Surse si referinte" cu link-urile oficiale

Raspunde STRICT in format JSON — un array de content blocks:
[
  {"type":"heading","content":"...","level":1},
  {"type":"text","content":"..."},
  {"type":"callout","content":"...","variant":"tip"},
  {"type":"code","content":"...","language":"python"},
  {"type":"quiz_inline","question":"...","options":["A","B","C","D"],"correctIndex":0,"explanation":"..."},
  {"type":"heading","content":"Surse si referinte","level":2},
  {"type":"text","content":"1. [Documentatia Oficiala Python](https://docs.python.org/3/)\\n2. ..."}
]

Raspunde DOAR cu array-ul JSON, fara alte comentarii.`;

  try {
    const response = await anthropic.messages.create({
      model: AI_MODEL,
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0]?.type === "text" ? response.content[0].text : "";

    // Parse JSON from response
    let generatedContent;
    try {
      // Find JSON array in response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      generatedContent = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      generatedContent = [
        { type: "heading", content: lesson.title, level: 1 },
        { type: "text", content: text },
      ];
    }

    // Save to DB
    await db.lesson.update({
      where: { id: lessonId },
      data: {
        content: generatedContent,
        contentGeneratedAt: new Date(),
      },
    });

    return NextResponse.json({ content: generatedContent, cached: false });
  } catch (error) {
    console.error("Lesson generation error:", error);
    return NextResponse.json({ error: "Failed to generate lesson content" }, { status: 500 });
  }
}
