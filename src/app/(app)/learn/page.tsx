"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, Users, Clock, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

type Course = {
  id: string; title: string; slug: string; description: string;
  category: string; categoryLabel: string; difficulty: string;
  estimatedHours: number; language: string; rating: number; enrollmentCount: number;
};

const CATEGORIES = ["All", "IT & Programming", "Marketing", "Foreign Languages", "Exam Preparation", "Business & Management"];
const DIFFICULTIES = ["All", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

export default function LearnPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const t = useTranslations("learn");

  useEffect(() => {
    fetch("/api/courses")
      .then(r => r.json())
      .then(data => { setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const diffLabels: Record<string, string> = { BEGINNER: t("beginner"), INTERMEDIATE: t("intermediate"), ADVANCED: t("advanced") };

  const filtered = courses.filter((c) => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "All" && c.categoryLabel !== category) return false;
    if (difficulty !== "All" && c.difficulty !== difficulty) return false;
    return true;
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("searchCourses")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${category === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{c === "All" ? t("allLevels") : c}</button>
        ))}
      </div>

      <div className="mb-8 flex gap-2">
        {DIFFICULTIES.map((d) => (
          <button key={d} onClick={() => setDifficulty(d)} className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${difficulty === d ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {d === "All" ? t("allLevels") : diffLabels[d] || d}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium">{t("noCourses")}</p>
          <p className="text-sm text-muted-foreground">{t("adjustFilters")}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <Link key={course.id} href={`/learn/${course.slug}`}>
              <Card className="h-full transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 group">
                <CardContent className="flex h-full flex-col pt-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{course.categoryLabel}</Badge>
                    <Badge variant="outline" className="text-xs">{diffLabels[course.difficulty] || course.difficulty}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-500" />{course.rating}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.enrollmentCount.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.estimatedHours}h</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <Button variant="ghost" size="sm" className="w-full group-hover:text-primary">
                      {t("startLearning")} <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
