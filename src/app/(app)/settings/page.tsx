"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Shield, CreditCard, Bell, BookOpen, Globe, Lock, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";

export default function SettingsPage() {
  const pathname = usePathname();
  const t = useTranslations("settings");

  const settingsNav = [
    { href: "/settings/profile", label: t("profile"), icon: User, desc: t("profileDesc") },
    { href: "/settings/account", label: t("account"), icon: Shield, desc: t("accountDesc") },
    { href: "/settings/security", label: t("security"), icon: KeyRound, desc: t("securityDesc") },
    { href: "/settings/subscription", label: t("subscription"), icon: CreditCard, desc: t("subscriptionDesc") },
    { href: "/settings/notifications", label: t("notifications"), icon: Bell, desc: t("notificationsDesc") },
    { href: "/settings/learning-prefs", label: t("learningPrefs"), icon: BookOpen, desc: t("learningPrefsDesc") },
    { href: "/settings/language", label: t("language"), icon: Globe, desc: t("languageDesc") },
    { href: "/settings/privacy", label: t("privacySettings"), icon: Lock, desc: t("privacyDesc") },
  ];

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {settingsNav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn("flex items-start gap-4 rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30 hover:bg-primary/5", active && "border-primary/50 bg-primary/5")}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                <div><p className="font-medium">{item.label}</p><p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
