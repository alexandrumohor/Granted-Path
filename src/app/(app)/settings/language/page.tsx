"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Check } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ro", label: "Romana", flag: "🇷🇴" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Francais", flag: "🇫🇷" },
  { code: "es", label: "Espanol", flag: "🇪🇸" },
];

export default function LanguageSettingsPage() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [appLang, setAppLang] = useState("en");
  const [contentLang, setContentLang] = useState("en");
  const [saving, setSaving] = useState(false);

  async function onSave() { setSaving(true); await new Promise(r => setTimeout(r, 1000)); setSaving(false); }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Language</h1>
      <p className="mt-1 text-sm text-muted-foreground">Choose your interface and content language.</p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Interface Language</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setAppLang(l.code)} className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 transition-all ${appLang === l.code ? "border-primary bg-primary/10" : "border-border/50 hover:border-primary/30"}`}>
                <span className="text-lg">{l.flag}</span><span className="text-sm font-medium">{l.label}</span>{appLang === l.code && <Check className="ml-auto h-4 w-4 text-primary" />}
              </button>
            ))}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Content Language</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">The AI will generate lessons and respond in this language.</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setContentLang(l.code)} className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 transition-all ${contentLang === l.code ? "border-primary bg-primary/10" : "border-border/50 hover:border-primary/30"}`}>
                <span className="text-lg">{l.flag}</span><span className="text-sm font-medium">{l.label}</span>{contentLang === l.code && <Check className="ml-auto h-4 w-4 text-primary" />}
              </button>
            ))}</div>
          </CardContent>
        </Card>

        <div className="flex justify-end"><Button onClick={onSave} disabled={saving}>{saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Language"}</Button></div>
      </div>
    </div>
  );
}
