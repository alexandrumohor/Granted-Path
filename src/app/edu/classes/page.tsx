"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Plus, ArrowRight, Search } from "lucide-react";

const CLASSES = [
  { id: "1", name: "Clasa a 10-a A", students: 28, avgProgress: 71, teacher: "Prof. Ionescu", activeAssignments: 3 },
  { id: "2", name: "Clasa a 10-a B", students: 26, avgProgress: 58, teacher: "Prof. Popescu", activeAssignments: 2 },
  { id: "3", name: "Clasa a 11-a A", students: 30, avgProgress: 65, teacher: "Prof. Ionescu", activeAssignments: 4 },
  { id: "4", name: "Clasa a 11-a B", students: 27, avgProgress: 52, teacher: "Prof. Marinescu", activeAssignments: 1 },
  { id: "5", name: "Clasa a 12-a A", students: 25, avgProgress: 78, teacher: "Prof. Popescu", activeAssignments: 5 },
];

export default function ClassesPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = CLASSES.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Classes</h1><p className="mt-1 text-sm text-muted-foreground">{CLASSES.length} classes, {CLASSES.reduce((s, c) => s + c.students, 0)} students total</p></div>
        <Button onClick={() => setShowCreate(!showCreate)}><Plus className="mr-2 h-4 w-4" />New Class</Button>
      </div>

      {showCreate && (
        <Card className="mb-6 border-primary/20">
          <CardContent className="pt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Class Name</Label><Input placeholder="e.g., Clasa a 10-a A" /></div>
              <div className="space-y-2"><Label>Teacher</Label><Input placeholder="e.g., Prof. Ionescu" /></div>
            </div>
            <div className="flex gap-2"><Button className="glow-amber">Create Class</Button><Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button></div>
          </CardContent>
        </Card>
      )}

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search classes..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="space-y-3">
        {filtered.map(c => (
          <Link key={c.id} href={`/edu/classes/${c.id}`}>
            <Card className="hover:border-primary/30 transition-all">
              <CardContent className="flex items-center gap-4 py-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Users className="h-5 w-5" /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><h3 className="font-semibold">{c.name}</h3><Badge variant="secondary" className="text-xs">{c.students} students</Badge></div>
                  <p className="text-xs text-muted-foreground mt-1">{c.teacher} &bull; {c.activeAssignments} active assignments</p>
                </div>
                <div className="text-right w-24">
                  <p className="text-sm font-semibold">{c.avgProgress}% avg</p>
                  <div className="mt-1 h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${c.avgProgress}%` }} /></div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
