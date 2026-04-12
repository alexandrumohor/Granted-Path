"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useTranslations } from "@/hooks/use-translations";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const loggedIn = status === "authenticated" && !!session?.user;
  const tc = useTranslations("common");
  const tn = useTranslations("nav");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <nav className="mx-auto flex h-14 max-w-[1120px] items-center px-6">
        {/* Logo — NOT a link */}
        <div className="flex items-center gap-2.5 mr-8">
          <Image src="/icon.png" alt="" width={24} height={24} className="h-6 w-6" />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">Granted Path</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex flex-1">
          <Link href="/" className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{tn("home")}</Link>
          {loggedIn && (
            <>
              <Link href="/dashboard" className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{tc("dashboard")}</Link>
              <Link href="/learn" className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{tn("learn")}</Link>
              <Link href="/ai-chat" className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{tn("aiChat")}</Link>
            </>
          )}
          {!loggedIn && (
            <>
              <Link href="#product" className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{tn("features")}</Link>
              <Link href="#pricing" className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{tn("pricing")}</Link>
            </>
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-1 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="ml-1 mr-2 h-4 w-px bg-border" />
          {loggedIn ? (
            <>
              <Link href="/settings" className="flex items-center gap-2 rounded-md px-2 py-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                {session?.user?.image ? (
                  <Image src={session?.user?.image} alt="" width={20} height={20} className="h-5 w-5 rounded-full" />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
                <span className="max-w-[100px] truncate">{session?.user?.name}</span>
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors">{tc("login")}</Link>
              <Link href="/register"><Button size="sm" className="h-8 text-[13px] px-4 ml-1">{tc("getStarted")}</Button></Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden ml-auto">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="p-2 text-muted-foreground"><Menu className="h-5 w-5" /></SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {loggedIn && session?.user && (
                  <>
                    <div className="flex items-center gap-3 px-3 py-3 mb-2">
                      {session.user.image ? <Image src={session.user.image} alt="" width={32} height={32} className="h-8 w-8 rounded-full" /> : <div className="h-8 w-8 rounded-full bg-muted" />}
                      <div><p className="text-sm font-medium">{session.user.name}</p><p className="text-xs text-muted-foreground">{session.user.email}</p></div>
                    </div>
                    <div className="h-px bg-border mb-1" />
                  </>
                )}
                <Link href="/" onClick={()=>setIsOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">{tn("home")}</Link>
                {loggedIn ? (
                  <>
                    <Link href="/dashboard" onClick={()=>setIsOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">{tc("dashboard")}</Link>
                    <Link href="/learn" onClick={()=>setIsOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">{tn("learn")}</Link>
                    <Link href="/ai-chat" onClick={()=>setIsOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">{tn("aiChat")}</Link>
                    <Link href="/settings" onClick={()=>setIsOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">{tc("settings")}</Link>
                    <div className="h-px bg-border my-1" />
                    <div className="px-3"><LanguageSwitcher /></div>
                    <button onClick={()=>{setIsOpen(false);signOut({callbackUrl:"/"});}} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground text-left rounded-md hover:bg-muted flex items-center gap-2"><LogOut className="h-3.5 w-3.5"/>{tc("logout")}</button>
                  </>
                ) : (
                  <>
                    <Link href="#product" onClick={()=>setIsOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">{tn("features")}</Link>
                    <Link href="#pricing" onClick={()=>setIsOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">{tn("pricing")}</Link>
                    <div className="h-px bg-border my-1" />
                    <div className="px-3"><LanguageSwitcher /></div>
                    <div className="mt-2 space-y-2 px-3">
                      <Link href="/login" onClick={()=>setIsOpen(false)}><Button variant="outline" className="w-full">{tc("login")}</Button></Link>
                      <Link href="/register" onClick={()=>setIsOpen(false)}><Button className="w-full">{tc("getStarted")}</Button></Link>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
