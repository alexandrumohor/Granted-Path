"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Loader2, Shield } from "lucide-react";

export default function PrivacySettingsPage() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [publicProfile, setPublicProfile] = useState(true);
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);
  const [showActivity, setShowActivity] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [saving, setSaving] = useState(false);

  async function onExport() { setExporting(true); await new Promise(r => setTimeout(r, 2000)); setExporting(false); }
  async function onSave() { setSaving(true); await new Promise(r => setTimeout(r, 1000)); setSaving(false); }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Privacy</h1>
      <p className="mt-1 text-sm text-muted-foreground">Control your data and visibility.</p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4 text-primary" />Profile Visibility</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3"><Checkbox checked={publicProfile} onCheckedChange={c => setPublicProfile(c === true)} /><div><p className="text-sm font-medium">Public profile</p><p className="text-xs text-muted-foreground">Others can see your name, level, and badges</p></div></div>
            <div className="flex items-start gap-3"><Checkbox checked={showOnLeaderboard} onCheckedChange={c => setShowOnLeaderboard(c === true)} /><div><p className="text-sm font-medium">Show on leaderboards</p><p className="text-xs text-muted-foreground">Appear in global and category rankings</p></div></div>
            <div className="flex items-start gap-3"><Checkbox checked={showActivity} onCheckedChange={c => setShowActivity(c === true)} /><div><p className="text-sm font-medium">Public activity heatmap</p><p className="text-xs text-muted-foreground">Show your study activity on your profile</p></div></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Your Data (GDPR)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">You have the right to download or delete all your data at any time.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onExport} disabled={exporting}>{exporting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Preparing...</> : <><Download className="mr-2 h-4 w-4" />Export My Data</>}</Button>
            </div>
            <p className="text-xs text-muted-foreground">Export includes: profile, learning history, AI conversations, achievements, and all personal data. Delivered as a ZIP file.</p>
          </CardContent>
        </Card>

        <div className="flex justify-end"><Button onClick={onSave} disabled={saving}>{saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Privacy Settings"}</Button></div>
      </div>
    </div>
  );
}
