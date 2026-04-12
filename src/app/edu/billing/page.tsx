"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Users, Plus, Minus, ArrowRight, ExternalLink } from "lucide-react";

export default function EduBillingPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const plan = {
    type: "HIGH_SCHOOL",
    name: "High School Plan",
    pricePerStudent: 5,
    maxSeats: 200,
    usedSeats: 156,
    status: "ACTIVE",
    nextBilling: "May 1, 2026",
    monthlyTotal: 156 * 5,
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><CreditCard className="h-6 w-6 text-primary" />Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your education subscription and seats.</p>
      </div>

      {/* Current plan */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <Badge>{plan.status}</Badge>
              </div>
              <p className="text-muted-foreground mt-1">{"\u20AC"}{plan.pricePerStudent}/student/month</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{"\u20AC"}{plan.monthlyTotal}</p>
              <p className="text-xs text-muted-foreground">/month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seats */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4 text-primary" />Seats</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">{plan.usedSeats} <span className="text-muted-foreground text-base font-normal">/ {plan.maxSeats}</span></p>
              <p className="text-xs text-muted-foreground">students enrolled</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Plus className="mr-1 h-3.5 w-3.5" />Add Seats</Button>
              <Button variant="outline" size="sm"><Minus className="mr-1 h-3.5 w-3.5" />Remove Seats</Button>
            </div>
          </div>
          <div className="h-3 rounded-full bg-muted">
            <div className="h-3 rounded-full bg-primary" style={{ width: `${(plan.usedSeats / plan.maxSeats) * 100}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{plan.maxSeats - plan.usedSeats} seats available</p>
        </CardContent>
      </Card>

      {/* Billing details */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Billing Details</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Next billing date</span><span className="font-medium">{plan.nextBilling}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Price per student</span><span className="font-medium">{"\u20AC"}{plan.pricePerStudent}/mo</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Active students</span><span className="font-medium">{plan.usedSeats}</span></div>
          <div className="flex justify-between text-sm border-t border-border/50 pt-3"><span className="font-medium">Monthly total</span><span className="font-bold text-primary">{"\u20AC"}{plan.monthlyTotal}</span></div>
        </CardContent>
      </Card>

      {/* Volume discounts */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Volume Discounts</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">20-99 students</span><span>{"\u20AC"}5.00/student</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">100-499 students</span><span className="text-primary font-medium">{"\u20AC"}4.50/student</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">500+ students</span><span>{"\u20AC"}4.00/student</span></div>
          </div>
          {plan.usedSeats >= 100 && plan.usedSeats < 500 && (
            <Badge className="mt-3" variant="secondary">You qualify for volume discount!</Badge>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline"><ExternalLink className="mr-2 h-4 w-4" />Manage Payment Method</Button>
        <Button variant="outline">Download Invoices</Button>
      </div>
    </div>
  );
}
