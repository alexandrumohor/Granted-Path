"use client";
import Link from "next/link";
import { useTranslations } from "@/hooks/use-translations";

export function Footer() {
  const tc = useTranslations("common");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[12px] text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} Granted Training Enterprise SRL</span>
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">Termeni</Link>
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">Confidentialitate</Link>
            <Link href="/legal/gdpr" className="hover:text-foreground transition-colors">GDPR</Link>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-muted-foreground">
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <span>Bucuresti, Romania</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
