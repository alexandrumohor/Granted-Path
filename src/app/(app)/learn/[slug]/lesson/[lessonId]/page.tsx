"use client";
import { useTranslations } from "@/hooks/use-translations";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, ArrowRight, BookOpen, Check, X, Info, AlertTriangle, Lightbulb, MessageSquare, Loader2 } from "lucide-react";

interface ContentBlock {
  type: "text" | "heading" | "callout" | "code" | "quiz_inline";
  content?: string;
  level?: number;
  variant?: "info" | "warning" | "tip";
  language?: string;
  question?: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
}

interface LessonData {
  course: { title: string; slug: string };
  module: { title: string };
  lesson: { id: string; title: string; estimatedMinutes: number; content: ContentBlock[] };
  prevLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
}

export default function LessonPage({ params }: { params: Promise<{ slug: string; lessonId: string }> }) {
  const t = useTranslations("common");
  const tl = useTranslations("lesson");
  const { slug, lessonId } = use(params);
  const [data, setData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetch(`/api/lessons/${slug}/${lessonId}`)
      .then(r => r.ok ? r.json() : null)
      .then(async (d) => {
        if (!d) return;
        setData(d);
        // If content is empty or placeholder, trigger AI generation
        const content = d.lesson.content as unknown[];
        const needsGeneration = !Array.isArray(content) || content.length < 4;
        if (needsGeneration) {
          setGenerating(true);
          try {
            const res = await fetch("/api/lessons/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ lessonId }),
            });
            if (res.ok) {
              const { content: generated } = await res.json();
              setData(prev => prev ? { ...prev, lesson: { ...prev.lesson, content: generated } } : prev);
            }
          } catch {}
          setGenerating(false);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug, lessonId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 lg:p-8 text-center py-20">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
        <h1 className="text-xl font-semibold">{tl("notFound")}</h1>
        <Link href="/learn"><Button variant="outline" className="mt-4">{tl("browseCourses")}</Button></Link>
      </div>
    );
  }

  const { course, lesson, module: mod, prevLesson, nextLesson } = data;

  return (
    <div className="flex">
      <div className="flex-1 p-6 lg:p-8 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/learn" className="hover:text-foreground">{tl("courses")}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/learn/${course.slug}`} className="hover:text-foreground">{course.title}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{lesson.title}</span>
        </div>

        {/* Module & lesson info */}
        <div className="mb-6">
          <Badge variant="secondary" className="mb-2 text-xs">{mod.title}</Badge>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{lesson.estimatedMinutes} min</p>
        </div>

        {/* Lesson content blocks */}
        {generating ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="font-medium">{tl("generatingContent")}</p>
            <p className="text-sm text-muted-foreground mt-1">{tl("generatingDesc")}</p>
          </div>
        ) : (
          <div className="space-y-5">
            {(lesson.content as ContentBlock[]).map((block, i) => (
              <ContentBlockRenderer key={i} block={block} />
            ))}
          </div>
        )}

        {/* AI Companion hint */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-4 py-4">
            <MessageSquare className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm">{tl("askAI")} <Link href="/ai-chat" className="font-medium text-primary hover:underline">{tl("aiTutor")}</Link></p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-6">
          {prevLesson ? (
            <Link href={`/learn/${course.slug}/lesson/${prevLesson.id}`}>
              <Button variant="outline"><ChevronLeft className="mr-2 h-4 w-4" />{tl("previous")}</Button>
            </Link>
          ) : <div />}

          <Button className="glow-amber">{tl("markComplete")}<Check className="ml-2 h-4 w-4" /></Button>

          {nextLesson ? (
            <Link href={`/learn/${course.slug}/lesson/${nextLesson.id}`}>
              <Button>{tl("nextLesson")}<ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          ) : (
            <Link href={`/learn/${course.slug}`}>
              <Button>{tl("backToCourse")}<ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      if (block.level === 1) return <h2 className="text-xl font-bold mt-6">{block.content}</h2>;
      if (block.level === 2) return <h3 className="text-lg font-semibold mt-4">{block.content}</h3>;
      return <h4 className="text-base font-semibold mt-3">{block.content}</h4>;

    case "text":
      return <p className="text-sm leading-relaxed text-muted-foreground">{block.content}</p>;

    case "callout": {
      const styles = {
        info: { icon: <Info className="h-4 w-4" />, border: "border-blue-500/30", bg: "bg-blue-500/5", text: "text-blue-400" },
        warning: { icon: <AlertTriangle className="h-4 w-4" />, border: "border-yellow-500/30", bg: "bg-yellow-500/5", text: "text-yellow-400" },
        tip: { icon: <Lightbulb className="h-4 w-4" />, border: "border-primary/30", bg: "bg-primary/5", text: "text-primary" },
      };
      const s = styles[block.variant ?? "info"];
      return (
        <div className={`rounded-lg border ${s.border} ${s.bg} p-4 flex gap-3`}>
          <div className={`shrink-0 mt-0.5 ${s.text}`}>{s.icon}</div>
          <p className="text-sm leading-relaxed whitespace-pre-line">{block.content}</p>
        </div>
      );
    }

    case "code":
      return (
        <div className="rounded-lg bg-muted overflow-hidden">
          {block.language && <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border/50">{block.language}</div>}
          <pre className="p-4 overflow-x-auto text-sm"><code>{block.content}</code></pre>
        </div>
      );

    case "quiz_inline":
      return <InlineQuiz question={block.question!} options={block.options!} correctIndex={block.correctIndex!} explanation={block.explanation!} />;

    default:
      return null;
  }
}

function InlineQuiz({ question, options, correctIndex, explanation }: { question: string; options: string[]; correctIndex: number; explanation: string }) {
  const tl = useTranslations("lesson");
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
  }

  const isCorrect = selected === correctIndex;

  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6">
        <p className="text-sm font-semibold mb-3">{tl("quickCheck")}: {question}</p>
        <div className="space-y-2">
          {options.map((opt, i) => {
            let style = "border-border/50 hover:border-primary/30";
            if (submitted && i === correctIndex) style = "border-green-500 bg-green-500/10";
            else if (submitted && i === selected && !isCorrect) style = "border-red-500 bg-red-500/10";
            else if (!submitted && i === selected) style = "border-primary bg-primary/10";

            return (
              <button
                key={i}
                onClick={() => !submitted && setSelected(i)}
                disabled={submitted}
                className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm transition-all ${style}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
                {submitted && i === correctIndex && <Check className="ml-auto h-4 w-4 text-green-500" />}
                {submitted && i === selected && !isCorrect && <X className="ml-auto h-4 w-4 text-red-500" />}
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <Button size="sm" className="mt-4" onClick={handleSubmit} disabled={selected === null}>{tl("checkAnswer")}</Button>
        ) : (
          <div className={`mt-4 rounded-lg p-3 text-sm ${isCorrect ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
            <p className="font-medium">{isCorrect ? tl("correct") : tl("notQuite")}</p>
            <p className="mt-1 text-muted-foreground">{explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
