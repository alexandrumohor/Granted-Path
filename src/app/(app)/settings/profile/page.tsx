"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Camera, Loader2 } from "lucide-react";

export default function ProfileSettingsPage() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [name, setName] = useState("User");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    await new Promise(r => setTimeout(r, 1000)); // TODO: API call
    setSaving(false);
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">Your public profile information.</p>

      <form onSubmit={onSave} className="mt-8 space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Avatar</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <User className="h-8 w-8" />
            </div>
            <Button type="button" variant="outline" size="sm"><Camera className="mr-2 h-4 w-4" />Upload Photo</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="bio">Bio</Label><textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm min-h-[80px] resize-none" placeholder="Tell us about yourself..." /></div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>{saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Changes"}</Button>
        </div>
      </form>
    </div>
  );
}
