"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, MessageSquare, Mic, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";

export function MobileBottomNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const items = [
    { href: "/dashboard", label: t("home"), icon: LayoutDashboard },
    { href: "/learn", label: t("learn"), icon: BookOpen },
    { href: "/ai-chat", label: t("aiChat"), icon: MessageSquare },
    { href: "/voice", label: t("voice"), icon: Mic },
    { href: "/settings", label: t("profile"), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-card/95 backdrop-blur-sm lg:hidden">
      <ul className="grid grid-cols-5">
        {items.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "scale-110")} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
