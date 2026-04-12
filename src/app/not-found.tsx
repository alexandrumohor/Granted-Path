"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, Home, MessageSquare, BookOpen } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function NotFound() {
  const t = useTranslations("errors");
  const tc = useTranslations("common");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <SearchX className="h-10 w-10 text-primary" />
        </div>
        <p className="text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold">{t("pageNotFound")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t("pageNotFoundDesc")}</p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href="/dashboard"><Button className="w-full sm:w-auto"><Home className="mr-2 h-4 w-4" />{tc("goToDashboard")}</Button></Link>
          <Link href="/ai-chat"><Button variant="outline" className="w-full sm:w-auto"><MessageSquare className="mr-2 h-4 w-4" />{t("askAI")}</Button></Link>
        </div>
        <div className="mt-10 border-t border-border/50 pt-6 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("popularDestinations")}</p>
          <div className="space-y-2 text-sm">
            <Link href="/learn" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><BookOpen className="h-3.5 w-3.5" />{t("browseCourses")}</Link>
            <Link href="/pricing" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><BookOpen className="h-3.5 w-3.5" />{t("viewPricing")}</Link>
            <Link href="/contact" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><MessageSquare className="h-3.5 w-3.5" />{t("contactSupport")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
