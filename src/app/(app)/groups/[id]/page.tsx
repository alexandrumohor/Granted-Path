"use client";
import { useTranslations } from "@/hooks/use-translations";
import { use, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Send, Trophy, Crown, Shield, User, Brain, Zap } from "lucide-react";

interface GroupMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  type: "TEXT" | "AI_RESPONSE" | "SYSTEM";
  createdAt: string;
}

interface Member {
  id: string;
  name: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  xp: number;
  level: number;
}

const MOCK_MESSAGES: GroupMessage[] = [
  { id: "1", userId: "u1", userName: "Alex", content: "Hey everyone! Anyone working on the loops chapter?", type: "TEXT", createdAt: "10:30" },
  { id: "2", userId: "u2", userName: "Maria", content: "Yes! I'm stuck on nested for loops. Can someone explain?", type: "TEXT", createdAt: "10:32" },
  { id: "3", userId: "ai", userName: "Granted Path AI", content: "A nested loop is a loop inside another loop. The inner loop completes all its iterations for each iteration of the outer loop. Think of it like a clock: the minute hand (inner) goes around 60 times for each hour (outer).", type: "AI_RESPONSE", createdAt: "10:33" },
  { id: "4", userId: "u3", userName: "Andrei", content: "That clock analogy is perfect! Thanks AI 😄", type: "TEXT", createdAt: "10:35" },
  { id: "5", userId: "u1", userName: "Alex", content: "Let's do the weekly quiz race! Who's in?", type: "TEXT", createdAt: "10:40" },
  { id: "6", userId: "system", userName: "System", content: "🏆 Weekly XP Race has started! Complete as many exercises as possible by Sunday.", type: "SYSTEM", createdAt: "10:41" },
];

const MOCK_MEMBERS: Member[] = [
  { id: "u1", name: "Alex", role: "OWNER", xp: 1250, level: 8 },
  { id: "u2", name: "Maria", role: "ADMIN", xp: 980, level: 7 },
  { id: "u3", name: "Andrei", role: "MEMBER", xp: 750, level: 5 },
  { id: "u4", name: "Elena", role: "MEMBER", xp: 620, level: 4 },
  { id: "u5", name: "Mihai", role: "MEMBER", xp: 450, level: 3 },
];

export default function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations("groups");
  const tc = useTranslations("common");
  const { id } = use(params);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: crypto.randomUUID(), userId: "me", userName: "You", content: input.trim(), type: "TEXT", createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  }

  const roleIcon = (role: string) => {
    if (role === "OWNER") return <Crown className="h-3 w-3 text-yellow-500" />;
    if (role === "ADMIN") return <Shield className="h-3 w-3 text-blue-400" />;
    return null;
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-3">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <h1 className="text-sm font-semibold">Python Beginners</h1>
              <p className="text-xs text-muted-foreground">14 members</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs text-primary border-primary/30"><Trophy className="mr-1 h-3 w-3" />Weekly XP Race</Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.type === "SYSTEM" ? "justify-center" : ""}`}>
              {msg.type === "SYSTEM" ? (
                <div className="rounded-lg bg-muted/50 px-4 py-2 text-xs text-muted-foreground text-center">{msg.content}</div>
              ) : (
                <>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden ${msg.type === "AI_RESPONSE" ? "" : "bg-muted"}`}>
                    {msg.type === "AI_RESPONSE" ? (
                      <Image src="/icon.png" alt="AI" width={32} height={32} />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${msg.type === "AI_RESPONSE" ? "text-primary" : ""}`}>{msg.userName}</span>
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
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message... (AI moderator is active)" className="flex-1 rounded-lg border border-border/50 bg-background px-4 py-2 text-sm outline-none focus:border-primary/50" />
            <Button type="submit" size="icon" disabled={!input.trim()}><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      </div>

      {/* Members sidebar */}
      <div className="hidden w-64 border-l border-border/50 bg-card/50 lg:block overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-4">Members ({MOCK_MEMBERS.length})</h2>
          <div className="space-y-3">
            {MOCK_MEMBERS.sort((a, b) => b.xp - a.xp).map((m, i) => (
              <div key={m.id} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted"><User className="h-4 w-4 text-muted-foreground" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium truncate">{m.name}</span>
                    {roleIcon(m.role)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Zap className="h-3 w-3" />{m.xp}</span>
                    <span>Lv.{m.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge card */}
        <div className="p-4 border-t border-border/50">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2"><CardTitle className="text-xs flex items-center gap-1"><Trophy className="h-3.5 w-3.5 text-primary" />Active Challenge</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Weekly XP Race</p>
              <p className="text-xs text-muted-foreground mt-1">Most XP earned by Sunday wins!</p>
              <div className="mt-2 space-y-1">
                {MOCK_MEMBERS.slice(0, 3).map((m, i) => (
                  <div key={m.id} className="flex justify-between text-xs">
                    <span>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"} {m.name}</span>
                    <span className="font-medium">{m.xp} XP</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
