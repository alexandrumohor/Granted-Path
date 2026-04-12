"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle } from "lucide-react";

export default function AccountSettingsPage() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [email] = useState("user@example.com");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  async function onChangePw(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setCurrentPw(""); setNewPw(""); setConfirmPw(""); setSaving(false);
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your email, password, and account.</p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Email Address</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" value={email} disabled /><p className="text-xs text-muted-foreground">Contact support to change your email.</p></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Change Password</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={onChangePw} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="current">Current Password</Label><Input id="current" type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} required /></div>
              <div className="space-y-2"><Label htmlFor="new">New Password</Label><Input id="new" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} required /></div>
              <div className="space-y-2"><Label htmlFor="confirm">Confirm New Password</Label><Input id="confirm" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} required /></div>
              <Button type="submit" disabled={saving || !currentPw || !newPw || newPw !== confirmPw}>{saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Updating...</> : "Update Password"}</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader><CardTitle className="text-base text-destructive flex items-center gap-2"><AlertTriangle className="h-4 w-4" />Danger Zone</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all data. This cannot be undone.</p>
            {!showDelete ? (
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => setShowDelete(true)}>Delete Account</Button>
            ) : (
              <div className="space-y-3 rounded-lg bg-destructive/5 p-4">
                <p className="text-sm font-medium text-destructive">Are you absolutely sure?</p>
                <p className="text-xs text-muted-foreground">Type &quot;DELETE&quot; to confirm.</p>
                <Input placeholder='Type "DELETE"' className="max-w-xs" />
                <div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => setShowDelete(false)}>Cancel</Button><Button variant="destructive" size="sm">Delete Forever</Button></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
