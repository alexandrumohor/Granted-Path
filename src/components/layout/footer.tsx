"use client";
import Link from "next/link";
import { useTranslations } from "@/hooks/use-translations";

export function Footer() {
  const tc = useTranslations("common");

  return (
    <footer className="border-t border-[#1D4ED8] dark:border-[#1E3A8A] bg-[#2563EB] dark:bg-[#1E3A8A] text-white">
      <div className="mx-auto max-w-[1120px] px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[12px] text-white/70">
            <span>&copy; {new Date().getFullYear()} Granted Training Enterprise SRL</span>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Termeni</Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Confidentialitate</Link>
            <Link href="/legal/gdpr" className="hover:text-white transition-colors">GDPR</Link>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-white/70">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <span>Bucuresti, Romania</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
