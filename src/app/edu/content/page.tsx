"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Upload, Brain, FileText, Plus, Sparkles } from "lucide-react";

const CONTENT = [
  { id: "1", title: "Introduction to Algebra", type: "Lesson", source: "Uploaded", status: "Published", usedBy: 2 },
  { id: "2", title: "Chemical Reactions Quiz", type: "Quiz", source: "AI Generated", status: "Published", usedBy: 3 },
  { id: "3", title: "English Grammar Basics", type: "Lesson", source: "Uploaded", status: "Draft", usedBy: 0 },
  { id: "4", title: "Geography Module 1", type: "Course", source: "AI Generated", status: "Published", usedBy: 1 },
];

export default function EduContentPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Content Library</h1><p className="mt-1 text-sm text-muted-foreground">Upload materials or let AI create interactive lessons.</p></div>
        <div className="flex gap-2">
          <Button variant="outline"><Upload className="mr-2 h-4 w-4" />Upload Material</Button>
          <Button><Sparkles className="mr-2 h-4 w-4" />AI Generate</Button>
        </div>
      </div>

      {/* AI hint */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 pt-6">
          <Brain className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-medium text-primary">AI Content Creation</p>
            <p className="text-sm text-muted-foreground mt-1">Upload a PDF, DOCX, or PPTX and our AI will transform it into an interactive lesson with quizzes, flashcards, and exercises.</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {CONTENT.map(c => (
          <Card key={c.id}>
            <CardContent className="flex items-center gap-4 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                {c.type === "Quiz" ? <FileText className="h-5 w-5 text-primary" /> : <BookOpen className="h-5 w-5 text-primary" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{c.title}</h3>
                  <Badge variant="outline" className="text-xs">{c.type}</Badge>
                  <Badge variant={c.source === "AI Generated" ? "default" : "secondary"} className="text-xs">{c.source}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Used in {c.usedBy} {c.usedBy === 1 ? "class" : "classes"}</p>
              </div>
              <Badge variant={c.status === "Published" ? "default" : "secondary"}>{c.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
