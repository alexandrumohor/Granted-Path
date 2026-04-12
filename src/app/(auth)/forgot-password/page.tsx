"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");
  const [email,setEmail]=useState(""); const [loading,setLoading]=useState(false); const [sent,setSent]=useState(false);
  async function onSubmit(e:React.FormEvent) { e.preventDefault(); setLoading(true); await new Promise(r=>setTimeout(r,1500)); setSent(true); setLoading(false); }

  if(sent) return (
    <div className="rounded-xl border border-border/50 bg-card p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"><Mail className="h-6 w-6"/></div>
      <h1 className="text-2xl font-bold">{t("checkEmail" as string) || "Verifica Email-ul"}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{t("resetLinkSent" as string) || "Am trimis un link de resetare la"} <strong className="text-foreground">{email}</strong>.</p>
      <p className="mt-4 text-xs text-muted-foreground">{t("didntReceive" as string) || "Nu l-ai primit?"} <button onClick={()=>setSent(false)} className="text-primary hover:underline">{t("tryAgain" as string) || "Incearca din nou"}</button></p>
      <Link href="/login" className="mt-6 inline-block"><Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4"/>{t("backToLogin")}</Button></Link>
    </div>
  );

  return (
    <div className="rounded-xl border border-border/50 bg-card p-8">
      <div className="mb-6 text-center"><h1 className="text-2xl font-bold">{t("forgotTitle")}</h1><p className="mt-1 text-sm text-muted-foreground">{t("forgotSubtitle")}</p></div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2"><Label htmlFor="email">{t("email")}</Label><Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <Button type="submit" className="w-full glow-amber" disabled={loading}>{loading?<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>{t("sendResetLink")}...</>:t("sendResetLink")}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">{t("rememberPassword" as string) || "Iti amintesti parola?"} <Link href="/login" className="font-medium text-primary hover:underline">{t("backToLogin")}</Link></p>
    </div>
  );
}
