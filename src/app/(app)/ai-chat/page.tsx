"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Square, Trash2, Sparkles, BookOpen, Dumbbell, GraduationCap, RotateCcw, User } from "lucide-react";
import { useAIChat } from "@/hooks/use-ai-chat";
import { useTranslations } from "@/hooks/use-translations";

export default function AIChatPage() {
  const [input,setInput]=useState("");
  const chatRef=useRef<HTMLDivElement>(null);
  const inputRef=useRef<HTMLTextAreaElement>(null);
  const {messages,isLoading,error,sendMessage,stopGenerating,clearMessages}=useAIChat({toughLove:"BALANCED"});
  const t = useTranslations("aiChat");

  const QP = [
    {icon:BookOpen,label:t("explainConcept"),prompt:"Explain to me how "},
    {icon:Dumbbell,label:t("practiceExercises"),prompt:"Give me practice exercises on "},
    {icon:GraduationCap,label:t("quizMe"),prompt:"Quiz me on "},
    {icon:RotateCcw,label:t("reviewTopic"),prompt:"Help me review "},
  ];

  useEffect(()=>{
    const el=chatRef.current;
    if(!el||messages.length===0)return;
    const isNearBottom=el.scrollHeight-el.scrollTop-el.clientHeight<200;
    if(isNearBottom)el.scrollTop=el.scrollHeight;
  },[messages]);
  function onInput(e:React.ChangeEvent<HTMLTextAreaElement>){setInput(e.target.value);e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,200)+"px";}
  function onSubmit(e:React.FormEvent){e.preventDefault();if(!input.trim()||isLoading)return;sendMessage(input);setInput("");if(inputRef.current)inputRef.current.style.height="auto";}
  function onKey(e:React.KeyboardEvent){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();onSubmit(e);}}

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/50 px-6 py-3">
        <div className="flex items-center gap-3"><Image src="/icon.png" alt="GP" width={32} height={32} className="h-8 w-8 rounded-full" /><div><h1 className="text-sm font-semibold">{t("title")}</h1><p className="text-xs text-muted-foreground">{t("subtitle")}</p></div></div>
        <div className="flex items-center gap-2"><Badge variant="outline" className="text-xs">{t("balancedMode")}</Badge>{messages.length>0&&<Button variant="ghost" size="sm" onClick={clearMessages}><Trash2 className="h-3.5 w-3.5"/></Button>}</div>
      </div>

      <div ref={chatRef} className="flex-1 overflow-y-auto">
        {messages.length===0?(
          <div className="flex h-full flex-col items-center justify-center px-4">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Sparkles className="h-8 w-8"/></div>
            <h2 className="text-xl font-semibold">{t("whatToLearn")}</h2>
            <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">{t("imYourTutor")}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-lg">{QP.map(q=>{const I=q.icon;return<button key={q.label} onClick={()=>{setInput(q.prompt);inputRef.current?.focus();}} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 text-left text-sm hover:border-primary/30 hover:bg-primary/5 transition-all"><I className="h-4 w-4 shrink-0 text-primary"/>{q.label}</button>})}</div>
          </div>
        ):(
          <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
            {messages.map(m=>(
              <div key={m.id} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden">{m.role==="user"?<div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground"><User className="h-4 w-4"/></div>:<Image src="/icon.png" alt="AI" width={32} height={32} />}</div>
                <div className="flex-1 min-w-0">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">{m.role==="user"?t("you"):t("aiName")}</p>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.content||m.isStreaming&&<div className="flex gap-1"><span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{animationDelay:"0ms"}}/><span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{animationDelay:"150ms"}}/><span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{animationDelay:"300ms"}}/></div>}{m.isStreaming&&m.content&&<span className="inline-block h-4 w-0.5 animate-pulse bg-primary ml-0.5"/>}</div>
                </div>
              </div>
            ))}
            {error&&<div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
            <div/>
          </div>
        )}
      </div>

      <div className="border-t border-border/50 bg-card/50 px-4 py-4">
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
          <div className="relative flex items-end gap-2 rounded-xl border border-border/50 bg-background px-4 py-3 focus-within:border-primary/50">
            <textarea ref={inputRef} value={input} onChange={onInput} onKeyDown={onKey} placeholder={t("placeholder")} className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground" rows={1} disabled={isLoading}/>
            {isLoading?<Button type="button" size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={stopGenerating}><Square className="h-4 w-4"/></Button>:<Button type="submit" size="icon" className="h-8 w-8 shrink-0" disabled={!input.trim()}><Send className="h-4 w-4"/></Button>}
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">{t("honest")}</p>
        </form>
      </div>
    </div>
  );
}
