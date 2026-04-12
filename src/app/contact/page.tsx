"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, subject, message }) });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error); }
      setSent(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to send"); } finally { setLoading(false); }
  }

  if (sent) return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold">Message Sent!</h1>
      <p className="mt-2 text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
    </div>
  );

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}? We&apos;re happy to help.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border/50 bg-card p-8">
        {error && <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
        <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} required /></div>
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
        <div className="space-y-2"><Label htmlFor="subject">{t("subject")}</Label><Input id="subject" value={subject} onChange={e => setSubject(e.target.value)} required /></div>
        <div className="space-y-2"><Label htmlFor="message">{t("message")}</Label><textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm min-h-[120px] resize-none" placeholder="Tell us what you need..." /></div>
        <Button type="submit" className="w-full glow-amber" disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : <><Send className="mr-2 h-4 w-4" />{t("send")}</>}</Button>
      </form>
    </div>
  );
}
