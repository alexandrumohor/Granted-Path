"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard, Users, Check, Download, TrendingDown, Receipt,
  Building2, Plus,
} from "lucide-react";

const tiers = [
  { name: "Starter", minSeats: 10, maxSeats: 100, pricePerSeat: 12, features: ["All core features", "Basic analytics", "Email support", "1 admin seat"] },
  { name: "Growth", minSeats: 100, maxSeats: 500, pricePerSeat: 9, features: ["Starter +", "Advanced analytics", "SSO (Google, Microsoft)", "Priority support", "5 admin seats"], current: true },
  { name: "Enterprise", minSeats: 500, maxSeats: 10000, pricePerSeat: 6, features: ["Growth +", "Custom SSO (SAML)", "Dedicated CSM", "SLA 99.95%", "Unlimited admins", "Custom integrations"] },
];

const invoices = [
  { id: "INV-2026-04", date: "Apr 1, 2026", amount: 2223, status: "paid", seats: 247 },
  { id: "INV-2026-03", date: "Mar 1, 2026", amount: 2115, status: "paid", seats: 235 },
  { id: "INV-2026-02", date: "Feb 1, 2026", amount: 2007, status: "paid", seats: 223 },
  { id: "INV-2026-01", date: "Jan 1, 2026", amount: 1890, status: "paid", seats: 210 },
];

export default function BizBillingPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const seats = { used: 247, total: 300, price: 9 };
  const monthly = seats.used * seats.price;
  const yearly = monthly * 12;
  const savings = Math.round(yearly * 0.15);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your subscription, seats, and invoices</p>
      </div>

      {/* Current Plan */}
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-primary/30">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <Badge className="mb-2 bg-primary/20 text-primary">Current Plan</Badge>
                <h2 className="text-xl font-bold">Growth</h2>
                <p className="text-sm text-muted-foreground">€{seats.price}/seat/month · {seats.used} of {seats.total} seats used</p>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Seats used</span>
                <span className="font-semibold">{seats.used} / {seats.total}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${(seats.used / seats.total) * 100}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Monthly total</p>
                <p className="mt-1 text-2xl font-bold">€{monthly.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Next invoice</p>
                <p className="mt-1 text-sm font-semibold">May 1, 2026</p>
                <p className="text-xs text-muted-foreground">Auto-renew enabled</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="outline"><Plus className="mr-2 h-4 w-4" />Add Seats</Button>
              <Button variant="outline">Change Plan</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <TrendingDown className="mb-3 h-5 w-5 text-green-500" />
            <p className="text-sm font-semibold">Save 15% with annual billing</p>
            <p className="mt-2 text-xs text-muted-foreground">Switch to yearly and save €{savings.toLocaleString()} per year compared to monthly.</p>
            <Button size="sm" className="mt-4 w-full">Switch to Yearly</Button>
          </CardContent>
        </Card>
      </div>

      {/* Plans */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Available Plans</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map(t => (
            <Card key={t.name} className={t.current ? "border-primary/30" : ""}>
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-bold">{t.name}</h3>
                  {t.current && <Badge className="bg-primary/20 text-primary text-xs">Current</Badge>}
                </div>
                <p className="text-3xl font-bold">€{t.pricePerSeat}<span className="text-sm font-normal text-muted-foreground">/seat/mo</span></p>
                <p className="mt-1 text-xs text-muted-foreground">{t.minSeats}-{t.maxSeats.toLocaleString()} seats</p>
                <ul className="mt-4 space-y-2 text-xs">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={t.current ? "outline" : "default"} className="mt-6 w-full" disabled={t.current}>
                  {t.current ? "Current Plan" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2028 · Default payment method</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Invoice History</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {invoices.map(inv => (
                <div key={inv.id} className="flex items-center gap-4 px-6 py-4">
                  <Receipt className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{inv.id}</p>
                    <p className="text-xs text-muted-foreground">{inv.date} · {inv.seats} seats</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500 text-xs">{inv.status}</Badge>
                  <p className="w-24 text-right font-semibold">€{inv.amount.toLocaleString()}</p>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
