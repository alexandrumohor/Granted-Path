"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const NOTIF_SETTINGS = [
  { id: "study_reminders", label: "Study reminders", desc: "Daily reminders at your preferred study time" },
  { id: "streak_alerts", label: "Streak alerts", desc: "Warning when your streak is at risk" },
  { id: "goal_deadlines", label: "Goal deadline reminders", desc: "Alerts when exams/deadlines are approaching" },
  { id: "review_due", label: "Review due", desc: "When flashcards or topics need reviewing" },
  { id: "achievements", label: "Achievement unlocked", desc: "When you earn a new badge" },
  { id: "weekly_report", label: "Weekly progress report", desc: "Summary of your week every Sunday" },
  { id: "ai_insights", label: "AI insights", desc: "Personalized learning tips from your AI tutor" },
];

export default function NotificationSettingsPage() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [prefs, setPrefs] = useState<Record<string, { email: boolean; push: boolean }>>(
    Object.fromEntries(NOTIF_SETTINGS.map(n => [n.id, { email: true, push: true }]))
  );
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("08:00");
  const [saving, setSaving] = useState(false);

  function toggle(id: string, channel: "email" | "push") {
    setPrefs(p => ({ ...p, [id]: { ...p[id]!, [channel]: !p[id]![channel] } }));
  }

  async function onSave() {
    setSaving(true); await new Promise(r => setTimeout(r, 1000)); setSaving(false);
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <p className="mt-1 text-sm text-muted-foreground">Choose what notifications you receive.</p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Notification Channels</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-[1fr,60px,60px] gap-2 text-xs font-medium text-muted-foreground">
                <span></span><span className="text-center">Email</span><span className="text-center">Push</span>
              </div>
              {NOTIF_SETTINGS.map(n => (
                <div key={n.id} className="grid grid-cols-[1fr,60px,60px] items-center gap-2">
                  <div><p className="text-sm font-medium">{n.label}</p><p className="text-xs text-muted-foreground">{n.desc}</p></div>
                  <div className="flex justify-center"><Checkbox checked={prefs[n.id]?.email} onCheckedChange={() => toggle(n.id, "email")} /></div>
                  <div className="flex justify-center"><Checkbox checked={prefs[n.id]?.push} onCheckedChange={() => toggle(n.id, "push")} /></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Quiet Hours</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">No push notifications during these hours.</p>
            <div className="flex items-center gap-3">
              <div className="space-y-1"><Label className="text-xs">From</Label><input type="time" value={quietStart} onChange={e => setQuietStart(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" /></div>
              <span className="mt-5 text-muted-foreground">to</span>
              <div className="space-y-1"><Label className="text-xs">Until</Label><input type="time" value={quietEnd} onChange={e => setQuietEnd(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" /></div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end"><Button onClick={onSave} disabled={saving}>{saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Preferences"}</Button></div>
      </div>
    </div>
  );
}
