"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { FileText, Shield, Scale } from "lucide-react";

const legalNav = [
  { href: "/legal/terms", label: "Terms of Service", icon: FileText },
  { href: "/legal/privacy", label: "Privacy Policy", icon: Shield },
  { href: "/legal/gdpr", label: "GDPR", icon: Scale },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
      <div className="mb-8 flex flex-wrap gap-2">
        {legalNav.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
      <article className="prose prose-invert max-w-none prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-xl prose-h2:mt-8 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
        {children}
      </article>
    </div>
  );
}
