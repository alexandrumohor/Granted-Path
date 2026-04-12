"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, ArrowRight, Users, GraduationCap, Building2, Minus } from "lucide-react";

const indPlans = [
  { name:"Explorer", price:{m:0,y:0}, desc:"Get started with AI learning", cta:"Start Free",
    feat:{"Active courses":"2","AI messages/day":"20","Exercises/day":"10","Exam sims/week":"1","Flashcards/day":"5","Knowledge graph":"Simplified","Analytics":"7 days",Ads:true,Certificates:false,"Voice mode":false,"Offline mode":false,"Panic Mode":false,"Advanced AI":false} },
  { name:"Starter", price:{m:10,y:100}, desc:"More courses, no ads, voice",cta:"Subscribe",
    feat:{"Active courses":"5","AI messages/day":"100","Exercises/day":"50","Exam sims/week":"5","Flashcards/day":"30","Knowledge graph":"Full","Analytics":"30 days",Ads:false,Certificates:"Completion","Voice mode":true,"Offline mode":"3 courses","Panic Mode":false,"Advanced AI":false} },
  { name:"Pro", price:{m:30,y:300}, desc:"Unlimited + advanced AI",cta:"Subscribe",highlighted:true,
    feat:{"Active courses":"Unlimited","AI messages/day":"Unlimited","Exercises/day":"Unlimited","Exam sims/week":"Unlimited","Flashcards/day":"Unlimited","Knowledge graph":"Full + Export","Analytics":"Full + PDF",Ads:false,Certificates:"Completion + Proficiency","Voice mode":true,"Offline mode":"Unlimited","Panic Mode":true,"Advanced AI":true} },
  { name:"Master", price:{m:60,y:600}, desc:"1-on-1 AI tutoring + career",cta:"Subscribe",
    feat:{"Active courses":"Unlimited","AI messages/day":"Unlimited","Exercises/day":"Unlimited","Exam sims/week":"Unlimited","Flashcards/day":"Unlimited","Knowledge graph":"Full + Export","Analytics":"Full + PDF",Ads:false,Certificates:"All + Mastery","Voice mode":true,"Offline mode":"Unlimited","Panic Mode":true,"Advanced AI":true},
    extras:["4 AI tutoring sessions/month","AI Career Guidance","Interview Simulator","Expert plan review (1/month)","Early access features","Personal API access"] },
];
const eduPlans = [
  { name:"School",sub:"Grades 1-8",price:4,min:20,desc:"AI tutoring for every student",vol:[{r:"20-99",p:"\u20AC4"},{r:"100-499",p:"\u20AC3.50"},{r:"500+",p:"\u20AC3"}],feat:["Teacher & student dashboards","Curriculum aligned","Parental access","Age-appropriate content","Gamification","Bulk CSV import"] },
  { name:"High School",sub:"Grades 9-12",price:5,min:20,highlighted:true,desc:"Exam prep, career orientation",vol:[{r:"20-99",p:"\u20AC5"},{r:"100-499",p:"\u20AC4.50"},{r:"500+",p:"\u20AC4"}],feat:["Everything in School","Exam prep (BAC, SAT)","Career orientation","Google Classroom integration"] },
  { name:"University",sub:"Higher Education",price:6,min:50,desc:"Research tools, LMS integration",vol:[{r:"50-499",p:"\u20AC6"},{r:"500-1999",p:"\u20AC5"},{r:"2000+",p:"\u20AC4"}],feat:["Everything in High School","Research assistance","LMS integration (Moodle, Canvas)","Institutional API","Custom branding"] },
];
const bizPlans = [
  { name:"Team",range:"1-50",price:8,desc:"Get your team learning",feat:["Admin dashboard","Assign courses","Progress tracking","Onboarding paths","Email support (24h)"] },
  { name:"Business",range:"51-200",price:6,highlighted:true,desc:"Department management, ROI",feat:["Everything in Team","Department management","Skill matrix","ROI reports","Priority support (8h)"] },
  { name:"Enterprise",range:"201-1000",price:4.5,desc:"SSO, API, dedicated support",feat:["Everything in Business","SSO (SAML, OIDC)","Custom branding","API access","Dedicated support (4h)"] },
  { name:"Corporation",range:"1000+",price:null,desc:"White-label, on-premise",feat:["Everything in Enterprise","On-premise option","Custom AI fine-tuning","White-label","24/7 phone support"] },
];
const faqs = [
  {q:"Can I switch plans anytime?",a:"Yes! Upgrade or downgrade anytime. Changes are prorated."},
  {q:"Is there a free trial?",a:"Yes — 14 days of Pro for every new account. No credit card required."},
  {q:"What payment methods?",a:"All major cards, Apple Pay, Google Pay, bank transfers for business."},
  {q:"Can I cancel anytime?",a:"Absolutely. No lock-in, no hidden fees. Cancel with one click."},
  {q:"Do Education plans include all features?",a:"Yes! Every student gets Pro-level features plus teacher tools."},
  {q:"How does Business pricing work?",a:"Per employee per month. Cost decreases as team grows. 1000+ contact us."},
];

export default function PricingPage() {
  const t = useTranslations("pricing");
  const tc = useTranslations("common");
  const [billing, setBilling] = useState<"m"|"y">("m");
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Simple, Transparent <span className="text-gradient">Pricing</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">Start free. No hidden fees.</p>
      </div>
      <Tabs defaultValue="individual" className="mt-12">
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="individual" className="gap-1.5"><Users className="h-4 w-4" />{t("individual")}</TabsTrigger>
          <TabsTrigger value="education" className="gap-1.5"><GraduationCap className="h-4 w-4" />{t("education")}</TabsTrigger>
          <TabsTrigger value="business" className="gap-1.5"><Building2 className="h-4 w-4" />{t("business")}</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="mt-8">
          <div className="mb-8 flex items-center justify-center gap-3">
            <button onClick={()=>setBilling("m")} className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${billing==="m"?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground"}`}>Monthly</button>
            <button onClick={()=>setBilling("y")} className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${billing==="y"?"bg-primary text-primary-foreground":"text-muted-foreground hover:text-foreground"}`}>Yearly <Badge variant="secondary" className="ml-2 text-xs">Save 2 months</Badge></button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {indPlans.map((p)=>(<div key={p.name} className={`relative flex flex-col rounded-xl border p-6 ${p.highlighted?"border-primary/50 bg-primary/5 shadow-lg shadow-primary/10":"border-border/50 bg-card"}`}>
              {p.highlighted && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{t("mostPopular")}</Badge>}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <div className="mt-3 flex items-baseline">{p.price.m===0?<span className="text-4xl font-bold">Free</span>:<><span className="text-4xl font-bold">{"\u20AC"}{billing==="m"?p.price.m:Math.round(p.price.y/12)}</span><span className="ml-1 text-muted-foreground">/mo</span></>}</div>
              {billing==="y"&&p.price.y>0&&<p className="mt-1 text-xs text-muted-foreground">{"\u20AC"}{p.price.y}/yr billed annually</p>}
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <Link href="/register" className="mt-6"><Button variant={p.highlighted?"default":"outline"} className={`w-full ${p.highlighted?"glow-amber":""}`}>{p.cta}</Button></Link>
              <div className="mt-6 space-y-3 border-t border-border/50 pt-6">{Object.entries(p.feat).map(([k,v])=>(<div key={k} className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{k}</span><FV v={v}/></div>))}</div>
              {p.extras&&<div className="mt-4 space-y-2 border-t border-border/50 pt-4"><p className="text-xs font-semibold uppercase text-primary">Master Exclusive</p>{p.extras.map((e)=>(<div key={e} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"/>{e}</div>))}</div>}
            </div>))}
          </div>
        </TabsContent>

        <TabsContent value="education" className="mt-8" id="education">
          <p className="mb-8 text-center text-muted-foreground">Per-student pricing with volume discounts.</p>
          <div className="grid gap-6 md:grid-cols-3">{eduPlans.map((p)=>(<div key={p.name} className={`relative flex flex-col rounded-xl border p-6 ${p.highlighted?"border-primary/50 bg-primary/5 shadow-lg shadow-primary/10":"border-border/50 bg-card"}`}>
            {p.highlighted&&<Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{t("mostPopular")}</Badge>}
            <h3 className="text-xl font-semibold">{p.name}</h3><p className="text-sm text-muted-foreground">{p.sub}</p>
            <div className="mt-3 flex items-baseline"><span className="text-4xl font-bold">{"\u20AC"}{p.price}</span><span className="ml-1 text-muted-foreground">/student/mo</span></div>
            <p className="mt-1 text-xs text-muted-foreground">Min {p.min} students</p>
            <div className="mt-4 rounded-lg bg-muted/50 p-3"><p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Volume Pricing</p>{p.vol.map((v)=>(<div key={v.r} className="flex justify-between text-sm"><span className="text-muted-foreground">{v.r}</span><span className="font-medium">{v.p}/student</span></div>))}</div>
            <Link href="/contact" className="mt-6"><Button variant={p.highlighted?"default":"outline"} className={`w-full ${p.highlighted?"glow-amber":""}`}>Contact Us<ArrowRight className="ml-2 h-4 w-4"/></Button></Link>
            <ul className="mt-6 space-y-2 border-t border-border/50 pt-6">{p.feat.map((f)=>(<li key={f} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"/>{f}</li>))}</ul>
          </div>))}</div>
        </TabsContent>

        <TabsContent value="business" className="mt-8" id="business">
          <p className="mb-8 text-center text-muted-foreground">Per-employee pricing. More employees = lower cost.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{bizPlans.map((p)=>(<div key={p.name} className={`relative flex flex-col rounded-xl border p-6 ${p.highlighted?"border-primary/50 bg-primary/5 shadow-lg shadow-primary/10":"border-border/50 bg-card"}`}>
            {p.highlighted&&<Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{t("mostPopular")}</Badge>}
            <h3 className="text-xl font-semibold">{p.name}</h3><p className="text-sm text-muted-foreground">{p.range} employees</p>
            <div className="mt-3 flex items-baseline">{p.price?<><span className="text-4xl font-bold">{"\u20AC"}{p.price}</span><span className="ml-1 text-muted-foreground">/emp/mo</span></>:<span className="text-2xl font-bold">Custom</span>}</div>
            <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
            <Link href="/contact" className="mt-6"><Button variant={p.highlighted?"default":"outline"} className={`w-full ${p.highlighted?"glow-amber":""}`}>{p.price?"Get Started":"Contact Sales"}<ArrowRight className="ml-2 h-4 w-4"/></Button></Link>
            <ul className="mt-6 space-y-2 border-t border-border/50 pt-6">{p.feat.map((f)=>(<li key={f} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"/>{f}</li>))}</ul>
          </div>))}</div>
        </TabsContent>
      </Tabs>

      <section className="mx-auto mt-24 max-w-3xl">
        <h2 className="text-center text-2xl font-bold">{t("faq")}</h2>
        <Accordion className="mt-8">{faqs.map((f,i)=>(<AccordionItem key={i} value={`faq-${i}`}><AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{f.a}</AccordionContent></AccordionItem>))}</Accordion>
      </section>
    </div>
  );
}
function FV({v}:{v:string|boolean}){if(v===true)return<Check className="h-4 w-4 text-primary"/>;if(v===false)return<X className="h-4 w-4 text-muted-foreground/40"/>;if(v==="Join only")return<Minus className="h-4 w-4 text-muted-foreground/60"/>;return<span className="font-medium">{v}</span>;}
