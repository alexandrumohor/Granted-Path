"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Upload, Users, Shield, Save } from "lucide-react";

const roles = [
  { id: "admin", name: "Admin", users: 4, description: "Full access to all settings, billing, and data" },
  { id: "manager", name: "Manager", users: 12, description: "Manage own team's employees, paths, and analytics" },
  { id: "instructor", name: "Instructor", users: 8, description: "Create and edit learning content" },
  { id: "employee", name: "Employee", users: 223, description: "Access assigned learning paths and personal dashboard" },
];

export default function BizSettingsPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [company, setCompany] = useState({
    name: "Acme Corp",
    domain: "acme.com",
    industry: "Technology",
    size: "200-500",
    country: "Romania",
    locale: "en-US",
  });

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Company Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage company profile, branding, and roles</p>
      </div>

      {/* Company Profile */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center gap-3">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Company Profile</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground">Company Name</label>
              <Input value={company.name} onChange={e => setCompany({ ...company, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email Domain</label>
              <Input value={company.domain} onChange={e => setCompany({ ...company, domain: e.target.value })} className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Industry</label>
              <Input value={company.industry} onChange={e => setCompany({ ...company, industry: e.target.value })} className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Company Size</label>
              <select value={company.size} onChange={e => setCompany({ ...company, size: e.target.value })} className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm">
                <option>1-50</option>
                <option>50-200</option>
                <option>200-500</option>
                <option>500-2000</option>
                <option>2000+</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Country</label>
              <Input value={company.country} onChange={e => setCompany({ ...company, country: e.target.value })} className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Default Language</label>
              <select value={company.locale} onChange={e => setCompany({ ...company, locale: e.target.value })} className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm">
                <option value="en-US">English (US)</option>
                <option value="ro-RO">Română</option>
                <option value="es-ES">Español</option>
                <option value="fr-FR">Français</option>
                <option value="de-DE">Deutsch</option>
              </select>
            </div>
          </div>

          <Button className="mt-6"><Save className="mr-2 h-4 w-4" />Save Changes</Button>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center gap-3">
            <Upload className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Branding</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground">Company Logo</label>
              <div className="mt-2 flex h-32 items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
                <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" />Upload Logo</Button>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">PNG or SVG, max 2MB</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Primary Color</label>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary" />
                <Input defaultValue="#10b981" className="font-mono" />
              </div>
              <label className="mt-4 block text-xs text-muted-foreground">Custom Subdomain</label>
              <div className="mt-2 flex items-center gap-2">
                <Input defaultValue="acme" className="flex-1" />
                <span className="text-sm text-muted-foreground">.grantedpath.com</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roles */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Roles & Permissions</h2>
          </div>

          <div className="space-y-3">
            {roles.map(r => (
              <div key={r.id} className="flex items-center gap-4 rounded-lg border border-border/50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{r.name}</p>
                    <Badge variant="secondary" className="text-xs">{r.users} users</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
