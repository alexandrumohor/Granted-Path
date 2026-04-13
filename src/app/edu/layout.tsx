"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, BarChart3, FileText, Settings, CreditCard, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/edu/dashboard", label: "Panou Principal", icon: LayoutDashboard },
  { href: "/edu/classes", label: "Clase", icon: Users },
  { href: "/edu/assignments", label: "Teme", icon: FileText },
  { href: "/edu/analytics", label: "Analize", icon: BarChart3 },
  { href: "/edu/content", label: "Continut", icon: BookOpen },
  { href: "/edu/settings", label: "Setari", icon: Settings },
  { href: "/edu/billing", label: "Facturare", icon: CreditCard },
];

export default function EduLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const pathname = usePathname();
  return (
    <div className="flex">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 flex-col border-r border-border/50 bg-card/50 lg:flex">
        <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><GraduationCap className="h-4 w-4 text-primary" /></div>
          <div><p className="text-sm font-semibold">Portal Educatie</p><p className="text-xs text-muted-foreground">Panou Profesor</p></div>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map(item => { const Icon = item.icon; const active = pathname === item.href || pathname.startsWith(item.href + "/"); return (
              <li key={item.href}><Link href={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}><Icon className="h-4 w-4 shrink-0" /><span>{item.label}</span></Link></li>
            ); })}
          </ul>
        </nav>
      </aside>
      <div className="flex-1 overflow-x-hidden">
        <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs font-medium text-amber-600 dark:text-amber-400">
          Date demonstrative — Datele de pe aceasta pagina sunt fictive si vor fi inlocuite cu date reale
        </div>
        {children}
      </div>
    </div>
  );
}
