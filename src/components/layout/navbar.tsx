"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image src="/GrantedPathLogo.png" alt="Granted Path" width={315} height={90} className="h-[90px] w-auto" priority />
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (<Link key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{l.label}</Link>))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <button className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"><Globe className="h-4 w-4" /><span>EN</span><ChevronDown className="h-3 w-3" /></button>
          <Link href="/login"><Button variant="ghost" size="sm">Log In</Button></Link>
          <Link href="/register"><Button size="sm" className="glow-amber">Start Free</Button></Link>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="mt-8 flex flex-col gap-4">
              {navLinks.map((l) => (<Link key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground">{l.label}</Link>))}
              <div className="my-2 h-px bg-border" />
              <Link href="/login" onClick={() => setIsOpen(false)}><Button variant="ghost" className="w-full justify-start">Log In</Button></Link>
              <Link href="/register" onClick={() => setIsOpen(false)}><Button className="w-full">Start Free</Button></Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
