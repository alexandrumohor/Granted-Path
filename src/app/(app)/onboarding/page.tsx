"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Code, Briefcase, Megaphone, Globe, GraduationCap, FlaskConical, Palette, Calculator, Scale, HeartPulse, Users, Sparkles, BookOpen, MessageSquare, LayoutGrid, Layers, Brain, Loader2, Check, Sun, Sunset, Moon, CloudMoon, Car } from "lucide-react";

const CATS = [
  {id:"IT_PROGRAMMING",label:"IT & Programming",icon:Code},{id:"BUSINESS_MANAGEMENT",label:"Business & Management",icon:Briefcase},
  {id:"MARKETING",label:"Marketing",icon:Megaphone},{id:"LANGUAGES",label:"Foreign Languages",icon:Globe},
  {id:"EXAM_PREP",label:"Exam Preparation",icon:GraduationCap},{id:"SCIENCES",label:"Sciences",icon:FlaskConical},
  {id:"DESIGN_CREATIVITY",label:"Design & Creativity",icon:Palette},{id:"FINANCE_ACCOUNTING",label:"Finance & Accounting",icon:Calculator},
  {id:"LAW_LEGISLATION",label:"Law & Legislation",icon:Scale},{id:"HEALTH_MEDICINE",label:"Health & Medicine",icon:HeartPulse},
  {id:"SOFT_SKILLS",label:"Soft Skills",icon:Users},{id:"CUSTOM",label:"Custom Topic",icon:Sparkles},
];
const LEVELS = ["Beginner","Intermediate","Advanced"];
const GOALS = [
  {id:"exam",label:"I have an exam on a specific date",icon:GraduationCap,hasDate:true},
  {id:"skill",label:"I want a new skill for work",icon:Briefcase,hasDate:false},
  {id:"interview",label:"Preparing for an interview",icon:Users,hasDate:true},
  {id:"curiosity",label:"Just curious",icon:Sparkles,hasDate:false},
  {id:"driving",label:"Driving school preparation",icon:Car,hasDate:true},
  {id:"custom",label:"Something else...",icon:MessageSquare,hasDate:false},
];
const STYLES = [
  {id:"reading",label:"Reading texts",icon:BookOpen},{id:"visual",label:"Diagrams & infographics",icon:LayoutGrid},
  {id:"practice",label:"Hands-on exercises",icon:Code},{id:"conversation",label:"Conversation with AI",icon:MessageSquare},
  {id:"flashcards",label:"Flashcard-uri",icon:Layers},{id:"mix",label:"Mix din toate",icon:Brain},
];
const TIMES = [{id:"morning",label:"Morning",icon:Sun},{id:"afternoon",label:"Afternoon",icon:Sunset},{id:"evening",label:"Evening",icon:Moon},{id:"night",label:"Night",icon:CloudMoon}];

export default function OnboardingPage() {
  const t = useTranslations("onboarding");
  const tc = useTranslations("common");
  const router = useRouter();
  const [step,setStep] = useState(1);
  const [loading,setLoading] = useState(false);
  const [cats,setCats] = useState<string[]>([]);
  const [levels,setLevels] = useState<Record<string,string>>({});
  const [goal,setGoal] = useState(""); const [goalDate,setGoalDate] = useState("");
  const [mins,setMins] = useState(30); const [times,setTimes] = useState<string[]>([]);
  const [styles,setStyles] = useState<string[]>([]);

  const toggle = (arr:string[],set:(v:string[])=>void,id:string,max?:number) => set(arr.includes(id)?arr.filter(x=>x!==id):(!max||arr.length<max)?[...arr,id]:arr);
  const canNext = [null, cats.length>0, cats.every(c=>levels[c]), goal!=="", times.length>0, styles.length>0, true][step]!;

  async function finish() { setLoading(true); await new Promise(r=>setTimeout(r,2000)); router.push("/dashboard"); }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8"><div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Step {step} of 6</span><span>{Math.round(step/6*100)}%</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary transition-all duration-500" style={{width:`${step/6*100}%`}}/></div></div>
      <div className="rounded-xl border border-border/50 bg-card p-8">
        {step===1&&<div><h1 className="text-2xl font-bold">What do you want to learn?</h1><p className="mt-1 text-sm text-muted-foreground">Choose 1-5 categories.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{CATS.map(c=>{const sel=cats.includes(c.id);const I=c.icon;return<button key={c.id} onClick={()=>toggle(cats,setCats,c.id,5)} className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${sel?"border-primary bg-primary/10 text-primary":"border-border/50 hover:border-primary/30"}`}><I className="h-6 w-6"/><span className="text-xs font-medium leading-tight">{c.label}</span>{sel&&<Check className="h-4 w-4"/>}</button>})}</div>
          {cats.length>0&&<p className="mt-4 text-center text-sm text-muted-foreground">{cats.length}/5 selected</p>}
        </div>}

        {step===2&&<div><h1 className="text-2xl font-bold">What&apos;s your level?</h1><p className="mt-1 text-sm text-muted-foreground">Per selected category.</p>
          <div className="mt-6 space-y-4">{cats.map(cid=>{const cat=CATS.find(c=>c.id===cid);if(!cat)return null;const I=cat.icon;return<div key={cid} className="rounded-lg border border-border/50 p-4"><div className="mb-3 flex items-center gap-2"><I className="h-4 w-4 text-primary"/><span className="text-sm font-medium">{cat.label}</span></div><div className="flex gap-2">{LEVELS.map(l=><button key={l} onClick={()=>setLevels(p=>({...p,[cid]:l}))} className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${levels[cid]===l?"bg-primary text-primary-foreground":"bg-muted/50 text-muted-foreground hover:bg-muted"}`}>{l}</button>)}</div></div>})}</div>
        </div>}

        {step===3&&<div><h1 className="text-2xl font-bold">Do you have a specific goal?</h1><p className="mt-1 text-sm text-muted-foreground">We&apos;ll tailor your plan.</p>
          <div className="mt-6 space-y-3">{GOALS.map(g=>{const sel=goal===g.id;const I=g.icon;return<div key={g.id}><button onClick={()=>setGoal(g.id)} className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${sel?"border-primary bg-primary/10":"border-border/50 hover:border-primary/30"}`}><I className={`h-5 w-5 shrink-0 ${sel?"text-primary":"text-muted-foreground"}`}/><span className="text-sm font-medium">{g.label}</span>{sel&&<Check className="ml-auto h-4 w-4 text-primary"/>}</button>{sel&&g.hasDate&&<div className="mt-2 ml-12"><input type="date" value={goalDate} onChange={e=>setGoalDate(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm"/></div>}</div>})}</div>
        </div>}

        {step===4&&<div><h1 className="text-2xl font-bold">How much time can you dedicate?</h1><p className="mt-1 text-sm text-muted-foreground">Consistency beats intensity.</p>
          <div className="mt-8 text-center"><span className="text-5xl font-bold text-primary">{mins}</span><span className="ml-2 text-lg text-muted-foreground">min/day</span></div>
          <input type="range" min={10} max={180} step={5} value={mins} onChange={e=>setMins(Number(e.target.value))} className="mt-6 w-full accent-primary"/>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>10 min</span><span>1 hour</span><span>3 hours</span></div>
          <p className="mt-8 mb-3 text-sm font-medium">When do you prefer to study?</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{TIMES.map(t=>{const sel=times.includes(t.id);const I=t.icon;return<button key={t.id} onClick={()=>toggle(times,setTimes,t.id)} className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${sel?"border-primary bg-primary/10 text-primary":"border-border/50 hover:border-primary/30"}`}><I className="h-5 w-5"/><span className="text-xs font-medium">{t.label}</span></button>})}</div>
        </div>}

        {step===5&&<div><h1 className="text-2xl font-bold">How do you prefer to learn?</h1><p className="mt-1 text-sm text-muted-foreground">Pick all that apply.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">{STYLES.map(s=>{const sel=styles.includes(s.id);const I=s.icon;return<button key={s.id} onClick={()=>toggle(styles,setStyles,s.id)} className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${sel?"border-primary bg-primary/10 text-primary":"border-border/50 hover:border-primary/30"}`}><I className="h-6 w-6"/><span className="text-xs font-medium leading-tight">{s.label}</span>{sel&&<Check className="h-4 w-4"/>}</button>})}</div>
        </div>}

        {step===6&&<div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"><Sparkles className="h-10 w-10 text-primary"/></div>
          <h1 className="text-2xl font-bold">Your Plan is Ready!</h1><p className="mt-2 text-muted-foreground">Your AI tutor prepared a personalized path.</p>
          <div className="mt-8 space-y-3 text-left">
            <SR label="Categories" value={cats.length.toString()}/><SR label="Goal" value={GOALS.find(g=>g.id===goal)?.label??"Not set"}/><SR label="Daily time" value={`${mins} min`}/>
            <SR label="Preferred time" value={times.map(t=>TIMES.find(x=>x.id===t)?.label).join(", ")}/><SR label="Style" value={styles.map(s=>STYLES.find(x=>x.id===s)?.label).join(", ")}/>
          </div>
          <Button size="lg" className="mt-8 w-full glow-amber" onClick={finish} disabled={loading}>{loading?<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Preparing...</>:<>Start Your First Lesson<ArrowRight className="ml-2 h-4 w-4"/></>}</Button>
        </div>}

        {step<6&&<div className="mt-8 flex items-center justify-between">
          {step>1?<Button variant="ghost" onClick={()=>setStep(step-1)}><ArrowLeft className="mr-2 h-4 w-4"/>Back</Button>:<div/>}
          <Button onClick={()=>setStep(step+1)} disabled={!canNext}>{step===5?"See My Plan":"Next"}<ArrowRight className="ml-2 h-4 w-4"/></Button>
        </div>}
      </div>
    </div>
  );
}
function SR({label,value}:{label:string;value:string}){return<div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"><span className="text-sm text-muted-foreground">{label}</span><Badge variant="secondary" className="text-xs">{value}</Badge></div>;}
