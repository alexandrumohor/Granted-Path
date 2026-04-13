"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguageStore, type Locale } from "@/stores/language-store";
import { cn } from "@/lib/utils";

const languages: { code: Locale; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "ro", flag: "🇷🇴", label: "Română" },
];

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { locale, setLocale } = useLanguageStore();
  const current = languages.find((l) => l.code === locale) ?? languages[0]!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-border bg-card" style={{boxShadow:"var(--shadow-dropdown)"}}>
          <div className="px-3 py-2 border-b border-border/50">
            <p className="text-xs font-medium text-muted-foreground">Change Language</p>
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLocale(lang.code); setOpen(false); }}
              className={cn(
                "flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-muted/50",
                locale === lang.code ? "text-primary bg-primary/5" : "text-foreground"
              )}
            >
              <span className="text-lg leading-none">{lang.flag}</span>
              <span className="flex-1 text-left">{lang.label}</span>
              {locale === lang.code && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
