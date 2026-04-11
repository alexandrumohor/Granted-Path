"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Shield, CreditCard, Bell, BookOpen, Globe, Lock, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsNav = [
  { href: "/settings/profile", label: "Profile", icon: User, desc: "Name, avatar, bio" },
  { href: "/settings/account", label: "Account", icon: Shield, desc: "Email, password, delete account" },
  { href: "/settings/security", label: "Security", icon: KeyRound, desc: "2FA, sessions, login history" },
  { href: "/settings/subscription", label: "Subscription", icon: CreditCard, desc: "Plan, billing, invoices" },
  { href: "/settings/notifications", label: "Notifications", icon: Bell, desc: "Email, push, quiet hours" },
  { href: "/settings/learning-prefs", label: "Learning Preferences", icon: BookOpen, desc: "Style, pace, tough love level" },
  { href: "/settings/language", label: "Language", icon: Globe, desc: "App & content language" },
  { href: "/settings/privacy", label: "Privacy", icon: Lock, desc: "Data export, GDPR controls" },
];

export default function SettingsPage() {
  const pathname = usePathname();
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your account and preferences.</p>
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
