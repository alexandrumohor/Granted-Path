"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Upload, Loader2 } from "lucide-react";

export default function EduSettingsPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [schoolName, setSchoolName] = useState("Liceul Teoretic Example");
  const [country, setCountry] = useState("Romania");
  const [city, setCity] = useState("Bucharest");
  const [saving, setSaving] = useState(false);

  async function onSave() { setSaving(true); await new Promise(r => setTimeout(r, 1000)); setSaving(false); }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold flex items-center gap-2"><Settings className="h-6 w-6 text-primary" />School Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground mb-8">Configure your institution profile.</p>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">School Logo</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-muted-foreground text-xl font-bold">LT</div>
            <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" />Upload Logo</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Institution Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>School Name</Label><Input value={schoolName} onChange={e => setSchoolName(e.target.value)} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Country</Label><Input value={country} onChange={e => setCountry(e.target.value)} /></div>
              <div className="space-y-2"><Label>City</Label><Input value={city} onChange={e => setCity(e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Student Import</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Bulk import students from a CSV file with columns: name, email, class.</p>
            <Button variant="outline"><Upload className="mr-2 h-4 w-4" />Upload CSV</Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={onSave} disabled={saving}>{saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Settings"}</Button>
        </div>
      </div>
    </div>
  );
}
