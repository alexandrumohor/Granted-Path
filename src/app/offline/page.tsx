"use client";
import Link from "next/link";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { WifiOff, RefreshCw, BookOpen } from "lucide-react";

export default function OfflinePage() {
  const t = useTranslations("errors");
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <WifiOff className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">{t("offline")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("offlineDesc")}
        </p>

        <div className="mt-6 rounded-lg border border-border/50 bg-card/50 p-4 text-left">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <BookOpen className="h-3 w-3" />Still available offline
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>· Downloaded lessons and flashcards</li>
            <li>· Your notes and highlights</li>
            <li>· Recent AI chat conversations</li>
          </ul>
        </div>

        <Link href="/dashboard">
          <Button className="mt-6"><RefreshCw className="mr-2 h-4 w-4" />{t("tryAgain") || "Try again"}</Button>
        </Link>
      </div>
    </div>
  );
}
