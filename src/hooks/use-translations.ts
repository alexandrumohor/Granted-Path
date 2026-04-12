"use client";
import { useLanguageStore } from "@/stores/language-store";
import en from "@/i18n/messages/en.json";
import ro from "@/i18n/messages/ro.json";

const messages: Record<string, Record<string, Record<string, string>>> = { en, ro };

export function useTranslations(namespace: string = "common") {
  const locale = useLanguageStore((s) => s.locale);
  const dict = messages[locale]?.[namespace] ?? messages["en"]?.[namespace] ?? {};
  return (key: string) => dict[key] ?? key;
}

export function useLocale() {
  return useLanguageStore((s) => s.locale);
}
