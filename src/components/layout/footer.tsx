"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/hooks/use-translations";

export function Footer() {
  const tc = useTranslations("common");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/icon.png" alt="" width={20} height={20} className="h-5 w-5" />
              <span className="text-[14px] font-semibold">Granted Path</span>
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed max-w-[200px]">
              Sistemul tău de învățare bazat pe AI.
            </p>
          </div>
          <div>
            <h4 className="text-[13px] font-semibold mb-3">Produs</h4>
            <ul className="space-y-2">
              <li><Link href="#product" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Funcționalități</Link></li>
              <li><Link href="#pricing" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Prețuri</Link></li>
              <li><Link href="/beta" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Beta</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-semibold mb-3">Companie</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/mobile" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Aplicație mobilă</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/legal/terms" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Termeni</Link></li>
              <li><Link href="/legal/privacy" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Confidențialitate</Link></li>
              <li><Link href="/legal/gdpr" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">GDPR</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-muted-foreground">&copy; {new Date().getFullYear()} Granted Training Enterprise SRL</p>
          <p className="text-[12px] text-muted-foreground">București, România</p>
        </div>
      </div>
    </footer>
  );
}
