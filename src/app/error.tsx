"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home, MessageSquare } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errors");
  const tc = useTranslations("common");

  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold">{t("somethingBroke")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("errorDesc")}
        </p>

        {error.digest && (
          <p className="mt-4 font-mono text-xs text-muted-foreground/60">
            {t("errorId")}: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />{tc("tryAgain")}</Button>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full sm:w-auto"><Home className="mr-2 h-4 w-4" />{tc("goToDashboard")}</Button>
          </Link>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6">
          <p className="text-xs text-muted-foreground">
            {t("stillHavingTrouble")}{" "}
            <Link href="/contact" className="inline-flex items-center gap-1 text-primary hover:underline">
              <MessageSquare className="h-3 w-3" />Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
