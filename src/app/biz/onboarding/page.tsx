"use client";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sparkles, Plus, Users, Check, Clock, GripVertical,
  PlayCircle, BookOpen, MessageSquare, Award, Calendar,
} from "lucide-react";

const flows = [
  { id: "eng", name: "Engineering Onboarding", steps: 8, duration: "30 days", activeHires: 3, completedHires: 42 },
  { id: "sales", name: "Sales Onboarding", steps: 6, duration: "21 days", activeHires: 1, completedHires: 18 },
  { id: "general", name: "General New Hire", steps: 5, duration: "14 days", activeHires: 2, completedHires: 67 },
];

const builderSteps = [
  { icon: MessageSquare, title: "Welcome Message", detail: "Personalized video from CEO + team intro", duration: "Day 1" },
  { icon: BookOpen, title: "Company Handbook", detail: "Read through policies, values, benefits", duration: "Day 1-2" },
  { icon: PlayCircle, title: "Compliance Training", detail: "GDPR, Security Awareness, Code of Conduct", duration: "Day 2-3" },
  { icon: Users, title: "Buddy Assignment", detail: "Auto-match with peer from same team", duration: "Day 3" },
  { icon: BookOpen, title: "Role-Specific Path", detail: "Cloud Architecture Fundamentals", duration: "Day 4-20" },
  { icon: Calendar, title: "Check-in Meetings", detail: "Auto-schedule with manager at day 7, 14, 30", duration: "Ongoing" },
  { icon: Award, title: "First Certification", detail: "Internal cert after completing core modules", duration: "Day 21-30" },
  { icon: Check, title: "Graduation", detail: "30-day review + feedback survey", duration: "Day 30" },
];

export default function BizOnboardingPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Onboarding Flows</h1>
          <p className="mt-1 text-sm text-muted-foreground">Build automated onboarding journeys for new hires</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Sparkles className="mr-2 h-4 w-4" />AI Generate Flow</Button>
          <Button><Plus className="mr-2 h-4 w-4" />New Flow</Button>
        </div>
      </div>

      {/* Existing Flows */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {flows.map(f => (
          <Card key={f.id} className="transition-all hover:border-primary/30">
            <CardContent className="pt-6">
              <div className="mb-3 flex items-start justify-between">
                <Sparkles className="h-5 w-5 text-primary" />
                <Badge variant="secondary" className="text-xs">{f.steps} steps</Badge>
              </div>
              <h3 className="font-semibold">{f.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Duration: {f.duration}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/50 pt-4 text-xs">
                <div><p className="text-muted-foreground">Active</p><p className="mt-1 font-semibold">{f.activeHires}</p></div>
                <div><p className="text-muted-foreground">Completed</p><p className="mt-1 font-semibold">{f.completedHires}</p></div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">Edit Flow</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Flow Builder */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Flow Builder — Engineering Onboarding</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Preview</Button>
          <Button size="sm">Save Flow</Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {builderSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </div>
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.detail}</p>
                  </div>
                  <Badge variant="outline" className="text-xs"><Clock className="mr-1 h-3 w-3" />{s.duration}</Badge>
                </div>
              );
            })}
          </div>

          <Button variant="outline" className="mt-4 w-full"><Plus className="mr-2 h-4 w-4" />Add Step</Button>
        </CardContent>
      </Card>
    </div>
  );
}
