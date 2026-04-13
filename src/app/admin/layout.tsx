"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Building2, CreditCard, LifeBuoy,
  Brain, FileCheck, ToggleRight, Activity, Shield, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Panou Principal", icon: LayoutDashboard },
  { href: "/admin/users", label: "Utilizatori", icon: Users },
  { href: "/admin/organizations", label: "Organizatii", icon: Building2 },
  { href: "/admin/subscriptions", label: "Abonamente", icon: CreditCard },
  { href: "/admin/support", label: "Suport", icon: LifeBuoy },
  { href: "/admin/ai-monitoring", label: "Monitorizare AI", icon: Brain },
  { href: "/admin/content", label: "Revizuire Continut", icon: FileCheck },
  { href: "/admin/features", label: "Feature Flags", icon: ToggleRight },
  { href: "/admin/system", label: "Sanatate Sistem", icon: Activity },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const pathname = usePathname();
  return (
    <div className="flex">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 flex-col border-r border-red-500/20 bg-card/50 lg:flex">
        <div className="flex items-center gap-3 border-b border-red-500/20 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
            <Shield className="h-4 w-4 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-semibold">Panou Admin</p>
            <p className="text-xs text-muted-foreground">Control Platforma</p>
          </div>
        </div>

        <div className="border-b border-red-500/20 px-3 py-2">
          <div className="flex items-center gap-2 rounded-md bg-red-500/10 px-2 py-1.5">
            <AlertTriangle className="h-3 w-3 text-red-500" />
            <p className="text-[10px] font-medium text-red-500">Restrictionat · Logat</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-red-500/10 text-red-500"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}
