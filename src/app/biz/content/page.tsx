"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Upload, Sparkles, FileText, Video, Image as ImageIcon, File,
  Search, Download, Eye, Trash2,
} from "lucide-react";

const content = [
  { id: "c1", name: "Employee Handbook 2026.pdf", type: "pdf", size: "4.2 MB", uploaded: "2 days ago", used: 247 },
  { id: "c2", name: "Onboarding Video.mp4", type: "video", size: "128 MB", uploaded: "1 week ago", used: 89 },
  { id: "c3", name: "Brand Guidelines.pdf", type: "pdf", size: "8.1 MB", uploaded: "3 weeks ago", used: 156 },
  { id: "c4", name: "Security Protocol.docx", type: "doc", size: "1.3 MB", uploaded: "1 month ago", used: 247 },
  { id: "c5", name: "Product Training Slides.pptx", type: "ppt", size: "22 MB", uploaded: "2 months ago", used: 45 },
  { id: "c6", name: "Q1 Results Dashboard.png", type: "image", size: "2.4 MB", uploaded: "3 days ago", used: 18 },
];

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText, video: Video, doc: FileText, ppt: FileText, image: ImageIcon,
};

export default function BizContentPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [q, setQ] = useState("");
  const filtered = content.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">{content.length} items · Upload or AI-generate training content</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Upload className="mr-2 h-4 w-4" />Upload</Button>
          <Button><Sparkles className="mr-2 h-4 w-4" />AI Generate</Button>
        </div>
      </div>

      {/* Upload Zone */}
      <Card className="mb-6 border-dashed">
        <CardContent className="pt-6 flex flex-col items-center justify-center py-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <p className="mt-4 text-sm font-medium">Drop files here or click to upload</p>
          <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX, PPTX, MP4, PNG, JPG up to 500 MB</p>
          <p className="mt-4 text-xs text-muted-foreground">Uploaded content is automatically analyzed by AI to extract key concepts and generate quizzes, flashcards, and summaries.</p>
        </CardContent>
      </Card>

      {/* AI Generate */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold">Generate training from a prompt</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Describe the training you need (topic, audience, depth). AI will produce a full course outline, lesson content, quizzes, and flashcards — ready to assign.
              </p>
              <div className="mt-3 flex gap-2">
                <Input placeholder="e.g., 'GDPR basics for non-technical staff, 45 minutes'" className="flex-1" />
                <Button>Generate</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search content..." className="pl-9" />
      </div>

      {/* Content List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {filtered.map(c => {
              const Icon = typeIcon[c.type] || File;
              return (
                <div key={c.id} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.size} · Uploaded {c.uploaded}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{c.used} uses</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
