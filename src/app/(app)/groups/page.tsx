"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Search, Plus, MessageSquare, Trophy, Globe, Lock, ArrowRight } from "lucide-react";

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  topic: string;
  memberCount: number;
  maxMembers: number;
  isPublic: boolean;
  activeChallenge: string | null;
  lastActivity: string;
}

const MOCK_GROUPS: StudyGroup[] = [
  { id: "1", name: "Python Beginners", description: "Learn Python together. Share tips, ask questions, challenge each other.", topic: "Python", memberCount: 14, maxMembers: 20, isPublic: true, activeChallenge: "Weekly XP Race", lastActivity: "5 min ago" },
  { id: "2", name: "Marketing Masters", description: "Digital marketing strategies, SEO tips, and case studies.", topic: "Marketing", memberCount: 8, maxMembers: 20, isPublic: true, activeChallenge: null, lastActivity: "2h ago" },
  { id: "3", name: "BAC 2026 Pregatire", description: "Grup de pregatire pentru BAC. Matematica, Romana, si alte materii.", topic: "Exam Prep", memberCount: 19, maxMembers: 20, isPublic: true, activeChallenge: "First to 100% on Module 3", lastActivity: "20 min ago" },
  { id: "4", name: "JavaScript Study Club", description: "From basics to advanced JS. Weekly coding challenges.", topic: "JavaScript", memberCount: 11, maxMembers: 20, isPublic: true, activeChallenge: "Quiz Race: ES6 Features", lastActivity: "1h ago" },
  { id: "5", name: "English Fluency Practice", description: "Practice English conversation, idioms, and grammar.", topic: "English", memberCount: 6, maxMembers: 15, isPublic: true, activeChallenge: null, lastActivity: "4h ago" },
];

export default function GroupsPage() {
  const t = useTranslations("groups");
  const tc = useTranslations("common");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTopic, setNewTopic] = useState("");

  const filtered = MOCK_GROUPS.filter(g =>
    !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="h-6 w-6 text-primary" />{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Learn together. Challenge each other. Grow faster.</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}><Plus className="mr-2 h-4 w-4" />{t("createGroup")}</Button>
      </div>

      {/* Create form */}
      {showCreate && (
        <Card className="mb-6 border-primary/20">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2"><Label>Group Name</Label><Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g., Python Study Club" /></div>
            <div className="space-y-2"><Label>Description</Label><textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm min-h-[60px] resize-none" placeholder="What's this group about?" /></div>
            <div className="space-y-2"><Label>Topic</Label><Input value={newTopic} onChange={e => setNewTopic(e.target.value)} placeholder="e.g., Python, Marketing, English" /></div>
            <div className="flex gap-2">
              <Button className="glow-amber">{t("createGroup")}</Button>
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder={t("searchGroups")} value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      {/* Groups list */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(group => (
          <Link key={group.id} href={`/groups/${group.id}`}>
            <Card className="h-full transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 group">
              <CardContent className="flex flex-col h-full pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {group.isPublic ? <Globe className="h-4 w-4 text-muted-foreground" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                    <Badge variant="secondary" className="text-xs">{group.topic}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{group.lastActivity}</span>
                </div>

                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{group.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground flex-1 line-clamp-2">{group.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span>{group.memberCount}/{group.maxMembers}</span>
                  </div>
                  {group.activeChallenge && (
                    <Badge variant="outline" className="text-xs text-primary border-primary/30">
                      <Trophy className="mr-1 h-3 w-3" />{group.activeChallenge}
                    </Badge>
                  )}
                </div>

                <Button variant="ghost" size="sm" className="mt-3 w-full group-hover:text-primary">
                  View Group <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
