import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Zap, Clock, Brain, BookOpen, Dumbbell, Layers, MessageSquare, ArrowRight, Target, TrendingUp, Calendar } from "lucide-react";

const mock = {
  name:"User", streak:12, totalXP:1250, level:8, todayMin:24, weekGoal:150, weekProg:96,
  courses:[
    {id:"1",title:"Python Fundamentals",cat:"IT & Programming",progress:45,last:"2h ago"},
    {id:"2",title:"Digital Marketing 101",cat:"Marketing",progress:28,last:"1d ago"},
    {id:"3",title:"English Conversation B2",cat:"Languages",progress:62,last:"3h ago"},
  ],
  goals:[{id:"1",title:"Learn Python basics",deadline:"May 15",progress:45},{id:"2",title:"BAC Matematica",deadline:"Jun 25",progress:12}],
  reviewDue:8, aiRec:"You haven't practiced Python exercises in 2 days. A quick 10-min session would prevent forgetting loops.",
};
const heat = Array.from({length:84},()=>({m:Math.random()>0.3?Math.floor(Math.random()*120):0}));

export default function DashboardPage() {
  const d = mock;
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8"><h1 className="text-2xl font-bold">Welcome back, <span className="text-gradient">{d.name}</span>!</h1><p className="mt-1 text-sm text-muted-foreground">Let&apos;s keep the momentum going.</p></div>

      <Card className="mb-8 border-primary/20 bg-primary/5"><CardContent className="flex items-start gap-4 pt-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Brain className="h-5 w-5"/></div>
        <div className="flex-1"><p className="text-sm font-medium text-primary">AI Recommendation</p><p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d.aiRec}</p></div>
        <Link href="/practice"><Button size="sm">Practice Now<ArrowRight className="ml-1.5 h-3.5 w-3.5"/></Button></Link>
      </CardContent></Card>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Flame className="h-5 w-5 text-orange-500"/>} label="Day Streak" value={String(d.streak)} accent />
        <Stat icon={<Zap className="h-5 w-5 text-primary"/>} label="Total XP" value={d.totalXP.toLocaleString()} sub={`Level ${d.level}`} />
        <Stat icon={<Clock className="h-5 w-5 text-blue-400"/>} label="Studied Today" value={`${d.todayMin}m`} sub={`${d.weekProg}/${d.weekGoal}m this week`} />
        <Stat icon={<Layers className="h-5 w-5 text-purple-400"/>} label="Review Due" value={String(d.reviewDue)} sub="flashcards" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">Continue Learning</h2><Link href="/learn" className="text-sm text-primary hover:underline">Browse all</Link></div>
            <div className="space-y-3">{d.courses.map(c=>(
              <Card key={c.id} className="group hover:border-primary/30 transition-all"><CardContent className="flex items-center gap-4 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"><BookOpen className="h-5 w-5"/></div>
                <div className="flex-1 min-w-0"><p className="font-medium truncate">{c.title}</p><div className="mt-1 flex gap-3 text-xs text-muted-foreground"><span>{c.cat}</span><span>{c.last}</span></div><div className="mt-2 h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{width:`${c.progress}%`}}/></div></div>
                <div className="text-right"><span className="text-sm font-semibold">{c.progress}%</span><Link href={`/learn/course/${c.id}`}><Button size="sm" variant="ghost" className="ml-2"><ArrowRight className="h-4 w-4"/></Button></Link></div>
              </CardContent></Card>
            ))}</div>
          </div>
          <div><h2 className="mb-4 text-lg font-semibold">Activity</h2><Card><CardContent className="pt-6">
            <div className="grid grid-cols-12 gap-1">{heat.map((d,i)=>(<div key={i} className="aspect-square rounded-sm" style={{backgroundColor:d.m===0?"oklch(0.18 0.025 150)":d.m<30?"oklch(0.35 0.1 155)":d.m<60?"oklch(0.5 0.15 155)":"oklch(0.7 0.19 155)"}} title={`${d.m} min`}/>))}</div>
            <div className="mt-3 flex items-center justify-end gap-2 text-xs text-muted-foreground"><span>Less</span><div className="flex gap-1">{[0,15,45,90].map(m=>(<div key={m} className="h-3 w-3 rounded-sm" style={{backgroundColor:m===0?"oklch(0.18 0.025 150)":m<30?"oklch(0.35 0.1 155)":m<60?"oklch(0.5 0.15 155)":"oklch(0.7 0.19 155)"}}/>))}</div><span>More</span></div>
          </CardContent></Card></div>
        </div>

        <div className="space-y-6">
          <div><h2 className="mb-4 text-lg font-semibold">Quick Actions</h2><div className="grid grid-cols-2 gap-2">
            <QA href="/learn" icon={<BookOpen className="h-4 w-4"/>} label="Quick Lesson"/>
            <QA href="/practice" icon={<Dumbbell className="h-4 w-4"/>} label="Quick Quiz"/>
            <QA href="/practice/flashcards" icon={<Layers className="h-4 w-4"/>} label="Flashcards"/>
            <QA href="/ai-chat" icon={<MessageSquare className="h-4 w-4"/>} label="Chat with AI"/>
          </div></div>

          <div><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">Your Goals</h2><Link href="/goals" className="text-sm text-primary hover:underline">View all</Link></div>
            <div className="space-y-3">{d.goals.map(g=>(
              <Card key={g.id}><CardContent className="py-4"><div className="flex items-start justify-between"><div className="flex items-start gap-3"><Target className="mt-0.5 h-4 w-4 text-primary"/><div><p className="text-sm font-medium">{g.title}</p><div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="h-3 w-3"/>{g.deadline}</div></div></div><span className="text-sm font-semibold">{g.progress}%</span></div><div className="mt-3 h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{width:`${g.progress}%`}}/></div></CardContent></Card>
            ))}<Link href="/goals"><Button variant="outline" size="sm" className="w-full"><Target className="mr-2 h-3.5 w-3.5"/>Add Goal</Button></Link></div>
          </div>

          <Card><CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary"/>This Week</CardTitle></CardHeader><CardContent><div className="space-y-3">
            <WS label="Study time" value={`${d.weekProg}m`} max={`${d.weekGoal}m`} pct={Math.round(d.weekProg/d.weekGoal*100)}/>
            <WS label="Lessons" value="7" pct={100}/><WS label="Exercises" value="34" pct={100}/><WS label="XP earned" value="320" pct={100}/>
          </div></CardContent></Card>
        </div>
      </div>
    </div>
  );
}

function Stat({icon,label,value,sub,accent}:{icon:React.ReactNode;label:string;value:string;sub?:string;accent?:boolean}){return<Card><CardContent className="flex items-center gap-4 pt-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">{icon}</div><div><p className="text-xs text-muted-foreground">{label}</p><p className={`text-2xl font-bold ${accent?"text-orange-500":""}`}>{value}</p>{sub&&<p className="text-xs text-muted-foreground">{sub}</p>}</div></CardContent></Card>;}
function QA({href,icon,label}:{href:string;icon:React.ReactNode;label:string}){return<Link href={href}><div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-4 text-center hover:border-primary/30 hover:bg-primary/5 transition-all"><div className="text-primary">{icon}</div><span className="text-xs font-medium">{label}</span></div></Link>;}
function WS({label,value,max,pct}:{label:string;value:string;max?:string;pct:number}){return<div><div className="flex justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}{max&&<span className="text-muted-foreground">/{max}</span>}</span></div><div className="mt-1 h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{width:`${Math.min(pct,100)}%`}}/></div></div>;}
