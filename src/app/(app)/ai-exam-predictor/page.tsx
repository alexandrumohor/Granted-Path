"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles, Calendar, Target, AlertTriangle, TrendingUp,
  Brain, CheckCircle2, Clock, Dumbbell, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const exam = {
  name: "AWS Solutions Architect Associate",
  date: "May 18, 2026",
  daysAway: 37,
  readiness: 64,
};

const predictions = [
  { topic: "VPC networking & security groups", confidence: 94, yourMastery: 71, weight: "heavy", practice: 18 },
  { topic: "IAM roles and cross-account access", confidence: 92, yourMastery: 58, weight: "heavy", practice: 14 },
  { topic: "S3 encryption and lifecycle policies", confidence: 88, yourMastery: 82, weight: "medium", practice: 12 },
  { topic: "Route 53 routing policies", confidence: 85, yourMastery: 45, weight: "medium", practice: 11 },
  { topic: "RDS multi-AZ vs read replicas", confidence: 83, yourMastery: 77, weight: "medium", practice: 10 },
  { topic: "Auto Scaling & ELB configuration", confidence: 81, yourMastery: 63, weight: "medium", practice: 9 },
  { topic: "CloudFront & edge caching", confidence: 72, yourMastery: 51, weight: "light", practice: 7 },
  { topic: "Lambda cold starts & provisioned concurrency", confidence: 68, yourMastery: 39, weight: "light", practice: 6 },
];

const criticalGaps = [
  { topic: "Route 53 routing policies", reason: "High confidence topic but mastery below 50%", priority: "urgent" },
  { topic: "Lambda cold starts", reason: "Appeared in 4 of last 5 similar exams", priority: "high" },
  { topic: "IAM cross-account access", reason: "Your weakest heavy-weight topic", priority: "high" },
];

export default function ExamPredictorPage() {
  const t = useTranslations("examPredictor");
  const [filter, setFilter] = useState<"all" | "weak" | "strong">("all");

  const filtered = predictions.filter(p => {
    if (filter === "weak") return p.yourMastery < 65;
    if (filter === "strong") return p.yourMastery >= 65;
    return true;
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Exam Predictor
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Exam Header */}
      <Card className="mb-6 border-primary/30">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[200px]">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("targetExam")}</p>
              <h2 className="mt-1 text-xl font-bold">{exam.name}</h2>
              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{exam.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{exam.daysAway} days away</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("readiness")}</p>
              <p className={cn("mt-1 text-4xl font-bold", exam.readiness >= 75 ? "text-green-500" : exam.readiness >= 60 ? "text-amber-400" : "text-red-500")}>
                {exam.readiness}%
              </p>
            </div>
            <Button><Target className="mr-2 h-4 w-4" />{t("startTargetedPractice")}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Critical Gaps */}
      <div className="mb-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Critical Gaps
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {criticalGaps.map((g, i) => (
            <Card key={i} className={g.priority === "urgent" ? "border-red-500/30" : "border-orange-500/30"}>
              <CardContent className="pt-6">
                <Badge className={g.priority === "urgent" ? "bg-red-500/20 text-red-400 text-xs" : "bg-orange-500/20 text-orange-400 text-xs"}>
                  {g.priority.toUpperCase()}
                </Badge>
                <p className="mt-3 font-semibold">{g.topic}</p>
                <p className="mt-1 text-xs text-muted-foreground">{g.reason}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Practice Now<ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Predictions */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Predicted Topics ({predictions.length})</h2>
          <div className="flex gap-1 rounded-lg border border-border/50 p-1">
            {(["all", "weak", "strong"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded px-3 py-1 text-xs font-medium transition-colors",
                  filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f === "all" ? "All" : f === "weak" ? "Weak (<65%)" : "Strong (≥65%)"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((p, i) => {
            const gap = p.confidence - p.yourMastery;
            const isGap = gap > 20;
            return (
              <Card key={i} className={isGap ? "border-orange-500/20" : ""}>
                <CardContent className="pt-6">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{p.topic}</p>
                        <Badge variant="outline" className="text-[10px] capitalize">{p.weight}</Badge>
                        {isGap && <Badge className="bg-orange-500/20 text-orange-400 text-[10px]">Gap</Badge>}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{p.practice} {t("practiceQuestions")}</p>
                    </div>
                    <Button variant="ghost" size="sm"><Dumbbell className="mr-1 h-3 w-3" />{t("drill")}</Button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground"><Brain className="h-3 w-3" />{t("examConfidence")}</span>
                        <span className="font-semibold">{p.confidence}%</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-primary" style={{ width: `${p.confidence}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground"><Target className="h-3 w-3" />{t("yourMastery")}</span>
                        <span className="font-semibold">{p.yourMastery}%</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-1.5 rounded-full",
                            p.yourMastery >= 75 ? "bg-green-500" : p.yourMastery >= 50 ? "bg-amber-500" : "bg-red-500"
                          )}
                          style={{ width: `${p.yourMastery}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
