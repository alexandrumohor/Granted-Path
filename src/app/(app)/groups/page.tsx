"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Search, Plus, Trophy, Globe, Lock, ArrowRight } from "lucide-react";

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  topic: string;
  memberCount: number;
  maxMembers: number;
  isPublic: boolean;
  isMember: boolean;
  activeChallenge: string | null;
}

export default function GroupsPage() {
  const t = useTranslations("groups");
  const tc = useTranslations("common");
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch("/api/user/groups")
      .then(r => r.ok ? r.json() : [])
      .then(setGroups)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function createGroup() {
    if (!newName.trim() || creating) return;
    setCreating(true);
    try {
      const res = await fetch("/api/user/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), description: newDesc.trim(), topic: newTopic.trim() }),
      });
      if (res.ok) {
        const group = await res.json();
        setGroups(prev => [{ ...group, description: newDesc, topic: newTopic, memberCount: 1, maxMembers: 20, isPublic: true, isMember: true, activeChallenge: null }, ...prev]);
        setNewName("");
        setNewDesc("");
        setNewTopic("");
        setShowCreate(false);
      }
    } catch {}
    setCreating(false);
  }

  const filtered = groups.filter(g =>
    !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.topic.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-48 bg-muted rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="h-6 w-6 text-primary" />{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}><Plus className="mr-2 h-4 w-4" />{t("createGroup")}</Button>
      </div>

      {/* Create form */}
      {showCreate && (
        <Card className="mb-6 border-primary/20">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2"><Label>{t("groupName")}</Label><Input value={newName} onChange={e => setNewName(e.target.value)} placeholder={t("groupNamePlaceholder")} /></div>
            <div className="space-y-2"><Label>{t("description")}</Label><textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm min-h-[60px] resize-none" placeholder={t("descriptionPlaceholder")} /></div>
            <div className="space-y-2"><Label>{t("topic")}</Label><Input value={newTopic} onChange={e => setNewTopic(e.target.value)} placeholder={t("topicPlaceholder")} /></div>
            <div className="flex gap-2">
              <Button onClick={createGroup} disabled={creating || !newName.trim()}>{t("createGroup")}</Button>
              <Button variant="outline" onClick={() => setShowCreate(false)}>{tc("cancel")}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      {groups.length > 0 && (
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("searchGroups")} value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
      )}

      {groups.length === 0 && !showCreate ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">{t("noGroups")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("noGroupsDesc")}</p>
            <Button className="mt-4" onClick={() => setShowCreate(true)}><Plus className="mr-2 h-4 w-4" />{t("createGroup")}</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(group => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <Card className="h-full transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 group">
                <CardContent className="flex flex-col h-full pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {group.isPublic ? <Globe className="h-4 w-4 text-muted-foreground" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                      {group.topic && <Badge variant="secondary" className="text-xs">{group.topic}</Badge>}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{group.name}</h3>
                  {group.description && <p className="mt-1 text-sm text-muted-foreground flex-1 line-clamp-2">{group.description}</p>}

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
                    {t("viewGroup")} <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
