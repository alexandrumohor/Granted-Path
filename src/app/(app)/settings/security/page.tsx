"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  KeyRound, Smartphone, Shield, AlertTriangle, CheckCircle2,
  Monitor, Globe, LogOut, Clock, QrCode, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sessions = [
  { id: "s1", device: "MacBook Pro", browser: "Chrome 120", os: "macOS 15.2", ip: "82.76.12.4", location: "Bucharest, RO", lastActive: "now", current: true },
  { id: "s2", device: "iPhone 15 Pro", browser: "Granted Path App", os: "iOS 18.1", ip: "94.23.45.178", location: "Bucharest, RO", lastActive: "2h ago", current: false },
  { id: "s3", device: "Windows PC", browser: "Firefox 122", os: "Windows 11", ip: "82.76.12.4", location: "Bucharest, RO", lastActive: "Yesterday", current: false },
  { id: "s4", device: "iPad Air", browser: "Safari", os: "iPadOS 18", ip: "188.24.103.55", location: "Cluj-Napoca, RO", lastActive: "3 days ago", current: false },
];

const loginHistory = [
  { date: "Apr 11, 2026 14:32", ip: "82.76.12.4", location: "Bucharest, RO", device: "MacBook Pro · Chrome", status: "success" },
  { date: "Apr 11, 2026 09:15", ip: "94.23.45.178", location: "Bucharest, RO", device: "iPhone 15 Pro · App", status: "success" },
  { date: "Apr 10, 2026 22:48", ip: "82.76.12.4", location: "Bucharest, RO", device: "MacBook Pro · Chrome", status: "success" },
  { date: "Apr 10, 2026 18:02", ip: "185.74.23.12", location: "Amsterdam, NL", device: "Unknown · Chrome", status: "blocked" },
  { date: "Apr 9, 2026 12:20", ip: "82.76.12.4", location: "Bucharest, RO", device: "MacBook Pro · Chrome", status: "success" },
  { date: "Apr 8, 2026 08:45", ip: "92.14.88.1", location: "Bucharest, RO", device: "Windows PC · Firefox", status: "success" },
];

export default function SecuritySettingsPage() {
  const t = useTranslations("security");
  const tc = useTranslations("common");
  const [has2fa, setHas2fa] = useState(false);
  const [setup2fa, setSetup2fa] = useState(false);

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-8">
      <Link href="/settings" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />Back to Settings
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <KeyRound className="h-6 w-6 text-primary" />
          Security
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Two-factor authentication, active sessions, and login history</p>
      </div>

      {/* 2FA */}
      <Card className={cn("mb-6", has2fa ? "border-green-500/30" : "border-orange-500/30")}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", has2fa ? "bg-green-500/10" : "bg-orange-500/10")}>
              {has2fa ? <Shield className="h-6 w-6 text-green-500" /> : <AlertTriangle className="h-6 w-6 text-orange-500" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{t("twoFactor")}</h3>
                {has2fa ? (
                  <Badge className="bg-green-500/20 text-green-500"><CheckCircle2 className="mr-1 h-3 w-3" />Enabled</Badge>
                ) : (
                  <Badge className="bg-orange-500/20 text-orange-500">Disabled</Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {has2fa
                  ? "Your account is protected by an authenticator app. You'll be prompted for a code at each new login."
                  : "Add an extra layer of security. We recommend enabling 2FA — it takes 2 minutes and stops 99% of account takeovers."}
              </p>

              {setup2fa ? (
                <div className="mt-4 rounded-lg border border-border/50 bg-muted/20 p-4">
                  <div className="flex items-start gap-4">
                    <QrCode className="h-32 w-32 shrink-0 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Scan this QR code</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Use Google Authenticator, 1Password, Authy, or any TOTP app.
                      </p>
                      <p className="mt-4 text-xs text-muted-foreground">Or enter this key manually:</p>
                      <code className="mt-1 inline-block rounded bg-card px-2 py-1 font-mono text-xs">JBSW Y3DP EHPK 3PXP JBSW Y3DP</code>
                      <div className="mt-4 flex gap-2">
                        <input placeholder="6-digit code" className="h-9 rounded-md border border-border bg-background px-3 text-sm font-mono" maxLength={6} />
                        <Button size="sm" onClick={() => { setHas2fa(true); setSetup2fa(false); }}>Verify & Enable</Button>
                        <Button size="sm" variant="ghost" onClick={() => setSetup2fa(false)}>Cancel</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  className="mt-4"
                  variant={has2fa ? "outline" : "default"}
                  onClick={() => has2fa ? setHas2fa(false) : setSetup2fa(true)}
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  {has2fa ? "Disable 2FA" : "Enable 2FA"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Monitor className="h-5 w-5 text-primary" />Active Sessions
          </h2>
          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
            <LogOut className="mr-2 h-3.5 w-3.5" />Sign out all others
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {sessions.map(s => (
                <div key={s.id} className="flex items-center gap-4 px-6 py-4">
                  <Monitor className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{s.device}</p>
                      {s.current && <Badge className="bg-green-500/20 text-green-500 text-[10px]">{t("current")}</Badge>}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">
                      {s.browser} · {s.os} · {s.location}
                    </p>
                    <p className="text-xs text-muted-foreground/60 font-mono">{s.ip} · Last active {s.lastActive}</p>
                  </div>
                  {!s.current && (
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <LogOut className="mr-1 h-3 w-3" />Sign out
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Login History */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Clock className="h-5 w-5 text-primary" />Login History
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {loginHistory.map((l, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-3 text-sm">
                  {l.status === "success" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{l.device}</p>
                    <p className="text-xs text-muted-foreground truncate flex items-center gap-2">
                      <Globe className="h-3 w-3 shrink-0" />
                      <span className="font-mono">{l.ip}</span>
                      <span>·</span>
                      <span>{l.location}</span>
                      {l.status === "blocked" && <Badge className="ml-2 bg-red-500/20 text-red-400 text-[9px]">{t("blocked")}</Badge>}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{l.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
