"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Dumbbell, MessageSquare, Target, BarChart3, Network, Users, Trophy, Award, Settings, ChevronLeft, ChevronRight, Flame, Zap, Mic, Sparkles, Calendar, Waves } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: Dumbbell },
  { href: "/ai-chat", label: "AI Chat", icon: MessageSquare },
  { href: "/voice", label: "Voice Tutor", icon: Waves },
  { href: "/pronunciation", label: "Pronunciation", icon: Mic },
  { href: "/ai-coach", label: "AI Coach", icon: Sparkles },
  { href: "/ai-planner", label: "AI Planner", icon: Calendar },
  { href: "/ai-exam-predictor", label: "Exam Predictor", icon: Target },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/stats", label: "Statistics", icon: BarChart3 },
  { href: "/knowledge-map", label: "Knowledge Map", icon: Network },
  { href: "/groups", label: "Study Groups", icon: Users },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/certificates", label: "Certificates", icon: Award },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={cn("sticky top-16 hidden h-[calc(100vh-4rem)] flex-col border-r border-border/50 bg-card/50 transition-all duration-300 lg:flex", collapsed ? "w-16" : "w-60")}>
      {!collapsed && (
        <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
          <Image src="/icon.png" alt="SP" width={28} height={28} className="h-7 w-7 rounded-md" />
          <div className="flex items-center gap-3 text-sm"><div className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-orange-500" /><span className="font-semibold">12</span></div><div className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" /><span className="font-semibold">1,250</span></div></div>
          <div className="ml-auto text-xs text-muted-foreground">Lv. 8</div>
        </div>
      )}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {items.map((item) => { const Icon = item.icon; const active = pathname === item.href || pathname.startsWith(item.href + "/"); return (
            <li key={item.href}><Link href={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")} title={collapsed ? item.label : undefined}><Icon className="h-4 w-4 shrink-0" />{!collapsed && <span>{item.label}</span>}</Link></li>
          ); })}
        </ul>
      </nav>
      <div className="border-t border-border/50 p-2">
        <Link href="/settings" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground", pathname.startsWith("/settings") && "bg-primary/10 text-primary")}><Settings className="h-4 w-4 shrink-0" />{!collapsed && <span>Settings</span>}</Link>
        <button onClick={() => setCollapsed(!collapsed)} className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
