"use client";
import { useTranslations } from "@/hooks/use-translations";
import { use, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Send, Trophy, Crown, Shield, User, Loader2 } from "lucide-react";

interface GroupMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  type: string;
  createdAt: string;
}

interface Member {
  id: string;
  name: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  image: string | null;
}

interface GroupData {
  id: string;
  name: string;
  description: string | null;
  memberCount: number;
  members: Member[];
  messages: GroupMessage[];
  activeChallenge: { title: string; description: string | null; endsAt: string } | null;
}

export default function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations("groups");
  const tc = useTranslations("common");
  const { id } = use(params);
  const [input, setInput] = useState("");
  const [data, setData] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/user/groups/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d) {
          setData(d);
          setMessages(d.messages);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      userId: "me",
      userName: t("you"),
      content: input.trim(),
      type: "TEXT",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    setInput("");
  }

  const roleIcon = (role: string) => {
    if (role === "OWNER") return <Crown className="h-3 w-3 text-yellow-500" />;
    if (role === "ADMIN") return <Shield className="h-3 w-3 text-blue-400" />;
    return null;
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">{t("groupNotFound")}</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-3">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <h1 className="text-sm font-semibold">{data.name}</h1>
              <p className="text-xs text-muted-foreground">{data.memberCount} {tc("members")}</p>
            </div>
          </div>
          {data.activeChallenge && (
            <Badge variant="outline" className="text-xs text-primary border-primary/30"><Trophy className="mr-1 h-3 w-3" />{data.activeChallenge.title}</Badge>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              {t("noMessages")}
            </div>
          )}
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.type === "SYSTEM" ? "justify-center" : ""}`}>
              {msg.type === "SYSTEM" ? (
                <div className="rounded-lg bg-muted/50 px-4 py-2 text-xs text-muted-foreground text-center">{msg.content}</div>
              ) : (
                <>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{msg.userName}</span>
                      <span className="text-xs text-muted-foreground">{msg.createdAt}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{msg.content}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border/50 px-6 py-3">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder={t("typeMessage")} className="flex-1 rounded-lg border border-border/50 bg-background px-4 py-2 text-sm outline-none focus:border-primary/50" />
            <Button type="submit" size="icon" disabled={!input.trim()}><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      </div>

      {/* Members sidebar */}
      <div className="hidden w-64 border-l border-border/50 bg-card/50 lg:block overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-4">{tc("members")} ({data.members.length})</h2>
          <div className="space-y-3">
            {data.members.map((m, i) => (
              <div key={m.id} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted"><User className="h-4 w-4 text-muted-foreground" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium truncate">{m.name}</span>
                    {roleIcon(m.role)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.activeChallenge && (
          <div className="p-4 border-t border-border/50">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-2"><CardTitle className="text-xs flex items-center gap-1"><Trophy className="h-3.5 w-3.5 text-primary" />{t("activeChallenge")}</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm font-medium">{data.activeChallenge.title}</p>
                {data.activeChallenge.description && (
                  <p className="text-xs text-muted-foreground mt-1">{data.activeChallenge.description}</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
