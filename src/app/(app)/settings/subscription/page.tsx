"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ArrowRight, Loader2, Check, ExternalLink } from "lucide-react";

export default function SubscriptionSettingsPage() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState("");

  // Mock current plan — will come from session/API
  const plan = { tier: "FREE", status: "ACTIVE", periodEnd: null as string | null };

  async function handleCheckout(priceId: string) {
    setLoading(priceId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { /* ignore */ } finally { setLoading(""); }
  }

  async function handlePortal() {
    setLoading("portal");
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { /* ignore */ } finally { setLoading(""); }
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold">Subscription</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your plan and billing.</p>

      <div className="mt-8 space-y-6">
        {/* Current Plan */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><CreditCard className="h-4 w-4 text-primary" />Current Plan</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{plan.tier === "FREE" ? "Explorer" : plan.tier}</span>
                  <Badge variant={plan.status === "ACTIVE" ? "default" : "secondary"}>{plan.status}</Badge>
                </div>
                {plan.tier === "FREE" && <p className="mt-1 text-sm text-muted-foreground">Free plan with limited features.</p>}
                {plan.periodEnd && <p className="mt-1 text-sm text-muted-foreground">Renews on {plan.periodEnd}</p>}
              </div>
              {plan.tier !== "FREE" && (
                <Button variant="outline" size="sm" onClick={handlePortal} disabled={loading === "portal"}>
                  {loading === "portal" ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ExternalLink className="mr-2 h-3.5 w-3.5" />Manage Billing</>}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Options */}
        {plan.tier === "FREE" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold">Upgrade Your Plan</h2>
            <div className="space-y-3">
              <UpgradeCard name="Starter" price={"\u20AC10/mo"} features={["5 active courses", "100 AI msgs/day", "Voice mode", "Certificates"]} onUpgrade={() => handleCheckout("starter_monthly")} loading={loading === "starter_monthly"} />
              <UpgradeCard name="Pro" price={"\u20AC30/mo"} features={["Unlimited everything", "Advanced AI", "Panic Mode", "Priority support"]} onUpgrade={() => handleCheckout("pro_monthly")} loading={loading === "pro_monthly"} highlighted />
              <UpgradeCard name="Master" price={"\u20AC60/mo"} features={["1-on-1 AI tutoring", "Interview simulator", "Career guidance", "Expert review"]} onUpgrade={() => handleCheckout("master_monthly")} loading={loading === "master_monthly"} />
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              <Link href="/pricing" className="text-primary hover:underline">See full plan comparison</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function UpgradeCard({ name, price, features, onUpgrade, loading, highlighted }: {
  name: string; price: string; features: string[]; onUpgrade: () => void; loading: boolean; highlighted?: boolean;
}) {
  return (
    <Card className={highlighted ? "border-primary/30 bg-primary/5" : ""}>
      <CardContent className="flex items-center gap-6 py-5">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{name}</span>
            <span className="text-sm text-muted-foreground">{price}</span>
            {highlighted && <Badge className="text-xs">Recommended</Badge>}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {features.map(f => <span key={f} className="flex items-center gap-1 text-xs text-muted-foreground"><Check className="h-3 w-3 text-primary" />{f}</span>)}
          </div>
        </div>
        <Button size="sm" variant={highlighted ? "default" : "outline"} onClick={onUpgrade} disabled={loading} className={highlighted ? "glow-amber" : ""}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Upgrade<ArrowRight className="ml-1.5 h-3.5 w-3.5" /></>}
        </Button>
      </CardContent>
    </Card>
  );
}
