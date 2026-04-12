"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/hooks/use-translations";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  const sections = [
    {
      title: t("product"),
      items: [
        { label: t("forEducation"), href: "/pricing#education" },
        { label: t("forBusiness"), href: "/pricing#business" },
      ],
    },
    {
      title: t("company"),
      items: [
        { label: t("about"), href: "/about" },
        { label: t("blog"), href: "/blog" },
        { label: t("contact"), href: "/contact" },
      ],
    },
    {
      title: t("legal"),
      items: [
        { label: t("terms"), href: "/legal/terms" },
        { label: t("privacy"), href: "/legal/privacy" },
        { label: t("gdpr"), href: "/legal/gdpr" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image src="/GrantedPathLogo.png" alt="Granted Path" width={120} height={35} className="h-9 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">{tc("tagline")}</p>
            <p className="mt-4 text-xs text-muted-foreground/70">Granted Training Enterprise SRL</p>
          </div>
          {sections.map((sec) => (
            <div key={sec.title}>
              <h3 className="text-sm font-semibold">{sec.title}</h3>
              <ul className="mt-3 space-y-2">{sec.items.map((l) => (<li key={l.href}><Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link></li>))}</ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border/50 pt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Granted Path — Granted Training Enterprise SRL. {tc("allRightsReserved")}
        </div>
      </div>
    </footer>
  );
}
