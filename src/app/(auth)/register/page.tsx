"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [showPw,setShowPw]=useState(false); const [terms,setTerms]=useState(false); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  const checks = { len:password.length>=8, upper:/[A-Z]/.test(password), num:/[0-9]/.test(password), special:/[^A-Za-z0-9]/.test(password) };
  const pwValid = Object.values(checks).every(Boolean);

  async function onSubmit(e:React.FormEvent) {
    e.preventDefault(); setError("");
    if(!terms){setError("You must agree to Terms");return;} if(!pwValid){setError(t("passwordMin"));return;}
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,password})});
      const data = await res.json();
      if(!res.ok){setError(data.error);return;}
      const r = await signIn("credentials",{email,password,redirect:false});
      if(r?.error) router.push("/login"); else { router.push("/onboarding"); router.refresh(); }
    } catch { setError(t("somethingWrong")); } finally { setLoading(false); }
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card p-8">
      <div className="mb-6 text-center"><h1 className="text-2xl font-bold">{t("registerTitle")}</h1><p className="mt-1 text-sm text-muted-foreground">{t("registerSubtitle")}</p></div>
      <div className="space-y-3">
        <Button variant="outline" className="w-full" onClick={()=>signIn("google",{callbackUrl:"/onboarding"})}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>{t("continueGoogle")}</Button>
        <Button variant="outline" className="w-full" onClick={()=>signIn("github",{callbackUrl:"/onboarding"})}>
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>{t("continueGithub")}</Button>
      </div>
      <div className="my-6 flex items-center gap-3"><Separator className="flex-1"/><span className="text-xs text-muted-foreground">{tc("or")}</span><Separator className="flex-1"/></div>
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
        <div className="space-y-2"><Label htmlFor="name">{t("name")}</Label><Input id="name" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)} required autoComplete="name"/></div>
        <div className="space-y-2"><Label htmlFor="email">{t("email")}</Label><Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/></div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("password")}</Label>
          <div className="relative"><Input id="password" type={showPw?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="new-password"/><button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPw?<EyeOff className="h-4 w-4"/>:<Eye className="h-4 w-4"/>}</button></div>
          {password.length>0 && <div className="mt-2 space-y-1">
            <PwC label="8+ caractere" ok={checks.len}/><PwC label="Litera mare" ok={checks.upper}/><PwC label="Numar" ok={checks.num}/><PwC label="Caracter special" ok={checks.special}/>
          </div>}
        </div>
        <div className="flex items-start gap-2"><Checkbox id="terms" checked={terms} onCheckedChange={c=>setTerms(c===true)} className="mt-0.5"/><label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">Sunt de acord cu <Link href="/legal/terms" className="text-primary hover:underline">Termenii</Link> si <Link href="/legal/privacy" className="text-primary hover:underline">Politica de Confidentialitate</Link></label></div>
        <Button type="submit" className="w-full glow-amber" disabled={loading||!pwValid||!terms}>{loading?<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>{t("creatingAccount")}</>:tc("register")}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">{t("hasAccount")} <Link href="/login" className="font-medium text-primary hover:underline">{tc("login")}</Link></p>
    </div>
  );
}
function PwC({label,ok}:{label:string;ok:boolean}){return<div className="flex items-center gap-2 text-xs">{ok?<Check className="h-3 w-3 text-green-500"/>:<X className="h-3 w-3 text-muted-foreground/50"/>}<span className={ok?"text-green-500":"text-muted-foreground/70"}>{label}</span></div>;}
