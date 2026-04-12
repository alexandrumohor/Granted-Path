"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MessageSquare, Users, Mail, Calendar, Lock, Webhook, Key,
  Check, Plus, Copy, RefreshCcw,
} from "lucide-react";

const integrations = [
  { id: "slack", name: "Slack", description: "Post notifications, reminders, and progress updates to Slack channels", icon: MessageSquare, connected: true, category: "Messaging" },
  { id: "teams", name: "Microsoft Teams", description: "Sync training notifications and embed lessons in Teams tabs", icon: Users, connected: true, category: "Messaging" },
  { id: "gworkspace", name: "Google Workspace", description: "SSO, calendar sync, Drive content import", icon: Mail, connected: false, category: "Productivity" },
  { id: "outlook", name: "Outlook Calendar", description: "Auto-schedule learning sessions in employee calendars", icon: Calendar, connected: false, category: "Productivity" },
  { id: "okta", name: "Okta SSO", description: "SAML-based single sign-on and user provisioning (SCIM)", icon: Lock, connected: true, category: "Identity" },
  { id: "azure", name: "Azure AD", description: "SSO and automatic user sync from Azure AD", icon: Lock, connected: false, category: "Identity" },
  { id: "zapier", name: "Zapier", description: "Connect Granted Path to 5000+ apps without code", icon: Webhook, connected: false, category: "Automation" },
  { id: "bamboo", name: "BambooHR", description: "Auto-sync employee directory and org structure", icon: Users, connected: false, category: "HRIS" },
];

const webhooks = [
  { url: "https://hooks.acme.com/grantedpath/completion", events: "completion, certification", status: "active" },
  { url: "https://hooks.acme.com/grantedpath/enrollment", events: "enrollment, unenroll", status: "active" },
];

export default function BizIntegrationsPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const byCategory = integrations.reduce<Record<string, typeof integrations>>((acc, i) => {
    (acc[i.category] ??= []).push(i);
    return acc;
  }, {});

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="mt-1 text-sm text-muted-foreground">Connect Granted Path to your existing tools and workflows</p>
      </div>

      {/* Integrations */}
      {Object.entries(byCategory).map(([cat, items]) => (
        <div key={cat} className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{cat}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map(i => {
              const Icon = i.icon;
              return (
                <Card key={i.id}>
                  <CardContent className="pt-6">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      {i.connected ? (
                        <Badge className="bg-green-500/20 text-green-500"><Check className="mr-1 h-3 w-3" />Connected</Badge>
                      ) : (
                        <Badge variant="outline">Not connected</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold">{i.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{i.description}</p>
                    <Button size="sm" variant={i.connected ? "outline" : "default"} className="mt-4 w-full">
                      {i.connected ? "Configure" : "Connect"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Webhooks */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Webhooks</h2>
          <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" />Add Webhook</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {webhooks.map((w, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <Webhook className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm truncate">{w.url}</p>
                    <p className="text-xs text-muted-foreground">Events: {w.events}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500">{w.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Keys */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">API Keys</h2>
          <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" />Create Key</Button>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Production API Key</p>
                <p className="text-xs text-muted-foreground">Created Jan 15, 2026 · Last used 2 hours ago</p>
              </div>
              <div className="flex items-center gap-2">
                <Input value="sk_live_••••••••••••••••••••••••af3b" readOnly className="font-mono text-xs w-64" />
                <Button size="icon" variant="ghost" className="h-9 w-9"><Copy className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" className="h-9 w-9"><RefreshCcw className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
