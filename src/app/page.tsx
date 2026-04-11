import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, BarChart3, ShieldCheck, Sparkles, Trophy, Clock, BookOpen, MessageSquare, Zap, GraduationCap, Building2, ArrowRight, Check } from "lucide-react";

export default function LandingPage() {
  return (<>
    {/* HERO */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm"><Sparkles className="mr-1.5 h-3.5 w-3.5" />AI-Powered Learning Platform</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">Learn Anything.<br /><span className="text-gradient">Your AI Knows How.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl">A personal AI tutor that adapts to how you learn, tracks your progress in real-time, and prepares you efficiently for any goal. Not a course platform &mdash; a teacher that knows you.</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/register"><Button size="lg" className="glow-amber text-base px-8 h-12">Start Learning Free<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link href="#how-it-works"><Button variant="outline" size="lg" className="text-base px-8 h-12">See How It Works</Button></Link>
          </div>
          <div className="mt-14 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex flex-col items-center"><span className="text-2xl font-bold text-foreground">12+</span><span>Domains</span></div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center"><span className="text-2xl font-bold text-foreground">24/7</span><span>AI Tutor</span></div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center"><span className="text-2xl font-bold text-foreground">100%</span><span>Personalized</span></div>
          </div>
        </div>
      </div>
    </section>

    {/* AI DEMO */}
    <section className="border-y border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border/50 bg-muted/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/60" /><div className="h-3 w-3 rounded-full bg-yellow-500/60" /><div className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-muted-foreground">Granted Path AI Tutor &mdash; Python Fundamentals</span>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex justify-end"><div className="max-w-sm rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">I think lists and tuples are the same thing in Python, right?</div></div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Brain className="h-4 w-4" /></div>
              <div className="max-w-lg rounded-2xl rounded-bl-md bg-muted px-4 py-3 text-sm leading-relaxed">
                <p><strong>Not quite!</strong> They look similar, but there&apos;s a key difference:</p>
                <ul className="mt-2 ml-4 list-disc space-y-1 text-muted-foreground">
                  <li><strong className="text-foreground">Lists</strong> are <strong className="text-foreground">mutable</strong> &mdash; you can change them</li>
                  <li><strong className="text-foreground">Tuples</strong> are <strong className="text-foreground">immutable</strong> &mdash; once created, can&apos;t be modified</li>
                </ul>
                <p className="mt-2 text-muted-foreground">Can you think of a situation where you&apos;d want data that can&apos;t be changed?</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex gap-1"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60" style={{animationDelay:"0ms"}} /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60" style={{animationDelay:"150ms"}} /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60" style={{animationDelay:"300ms"}} /></div>
              <span>AI is waiting for your response...</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">Our AI corrects you when you&apos;re wrong &mdash; like a real teacher, not a yes-man.</p>
      </div></div>
    </section>

    {/* FEATURES */}
    <section id="features" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why <span className="text-gradient">Granted Path</span>?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Not just another course platform. A teacher that knows you.</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FC icon={<Brain className="h-5 w-5" />} title="Adaptive AI Teaching" desc="The AI adjusts content format, difficulty, and pace based on how YOU learn best." />
          <FC icon={<BarChart3 className="h-5 w-5" />} title="Real-Time Progress Tracking" desc="Every session, every answer, every pattern — tracked and analyzed to optimize your learning." />
          <FC icon={<ShieldCheck className="h-5 w-5" />} title="Honest AI — No Yes-Man" desc="Our AI corrects you when you're wrong, no matter how much you insist. Like a real teacher." />
          <FC icon={<Zap className="h-5 w-5" />} title="Panic Mode — Exam Prep" desc="Exam tomorrow? Panic Mode creates a laser-focused plan based on what you still need to learn." />
          <FC icon={<Target className="h-5 w-5" />} title="Knowledge Graph" desc="See what you know, what you don't, and what you're about to forget — all visualized." />
          <FC icon={<Trophy className="h-5 w-5" />} title="Learn & Have Fun" desc="XP, levels, streaks, 50+ achievements, and leaderboards. No pay-to-win." />
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section id="how-it-works" className="scroll-mt-20 border-y border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2><p className="mt-4 text-lg text-muted-foreground">From sign-up to mastery in 4 steps.</p></div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <SC step={1} icon={<MessageSquare className="h-5 w-5" />} title="Tell Us Your Goal" desc="Exam in 2 days? New career skill? Tell the AI what you need." />
          <SC step={2} icon={<Brain className="h-5 w-5" />} title="AI Creates Your Plan" desc="Your AI tutor builds a personalized path based on your goal and schedule." />
          <SC step={3} icon={<BookOpen className="h-5 w-5" />} title="Learn Your Way" desc="Lessons, exercises, flashcards, AI conversations — adapted to your style." />
          <SC step={4} icon={<Clock className="h-5 w-5" />} title="AI Keeps You On Track" desc="Smart reminders, spaced repetition, and encouragement to keep you consistent." />
        </div>
      </div>
    </section>

    {/* DOMAINS */}
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-bold sm:text-4xl">Learn <span className="text-gradient">Anything</span></h2><p className="mt-4 text-lg text-muted-foreground">12+ domains and growing.</p></div>
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {["IT & Programming","Marketing","Business & Management","Foreign Languages","Exam Preparation","Sciences","Design & Creativity","Finance & Accounting","Law & Legislation","Health & Medicine","Soft Skills","Driving School","Custom Topics"].map((d) => (<Badge key={d} variant="outline" className="px-4 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">{d}</Badge>))}
      </div>
    </section>

    {/* FOR EVERYONE */}
    <section className="border-y border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-bold sm:text-4xl">Built for Everyone</h2><p className="mt-4 text-lg text-muted-foreground">Individuals, schools, universities, and companies.</p></div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <AC icon={<Sparkles className="h-6 w-6" />} title="For Individuals" desc="A personal AI tutor available 24/7." features={["Personalized learning paths","AI study buddy","Exam simulators","Certificates"]} cta="Start Free" href="/register" />
          <AC icon={<GraduationCap className="h-6 w-6" />} title="For Education" desc="Give every student a personal AI tutor." features={["Teacher dashboards","Assignment system","Class analytics","Parental access"]} cta="Education Plans" href="/pricing#education" />
          <AC icon={<Building2 className="h-6 w-6" />} title="For Business" desc="Upskill your team with AI training." features={["Team management","Skill matrix","Compliance tracking","SSO integration"]} cta="Business Plans" href="/pricing#business" />
        </div>
      </div>
    </section>

    {/* PRICING PREVIEW */}
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center"><h2 className="text-3xl font-bold sm:text-4xl">Simple, Transparent Pricing</h2><p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade when you&apos;re ready.</p></div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <PC name="Explorer" price="Free" desc="Get started" features={["2 active courses","20 AI messages/day","Basic analytics"]} />
        <PC name="Starter" price={"\u20AC10"} period="/mo" desc="More courses, no ads" features={["5 active courses","100 AI messages/day","Voice mode"]} />
        <PC name="Pro" price={"\u20AC30"} period="/mo" desc="Unlimited + advanced AI" features={["Unlimited courses","Unlimited AI","Panic Mode"]} highlighted />
        <PC name="Master" price={"\u20AC60"} period="/mo" desc="1-on-1 AI tutoring" features={["AI tutoring sessions","Interview simulator","Expert review"]} />
      </div>
      <div className="mt-8 text-center"><Link href="/pricing"><Button variant="outline" size="lg">See Full Pricing<ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div>
    </section>

    {/* FINAL CTA */}
    <section className="relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Learn <span className="text-gradient">Smarter</span>?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Start free, no credit card required.</p>
          <div className="mt-8"><Link href="/register"><Button size="lg" className="glow-amber text-base px-10 h-12">Start Learning Free<ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div>
        </div>
      </div>
    </section>
  </>);
}

function FC({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (<div className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>);
}
function SC({ step, icon, title, desc }: { step: number; icon: React.ReactNode; title: string; desc: string }) {
  return (<div className="relative text-center">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</div>
    <div className="absolute -top-2 left-1/2 ml-5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{step}</div>
    <h3 className="text-base font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </div>);
}
function AC({ icon, title, desc, features, cta, href }: { icon: React.ReactNode; title: string; desc: string; features: string[]; cta: string; href: string }) {
  return (<div className="flex flex-col rounded-xl border border-border/50 bg-card p-6">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    <ul className="mt-4 flex-1 space-y-2">{features.map((f) => (<li key={f} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>))}</ul>
    <Link href={href} className="mt-6"><Button variant="outline" className="w-full">{cta}<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
  </div>);
}
function PC({ name, price, period, desc, features, highlighted }: { name: string; price: string; period?: string; desc: string; features: string[]; highlighted?: boolean }) {
  return (<div className={`relative flex flex-col rounded-xl border p-6 ${highlighted ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10" : "border-border/50 bg-card"}`}>
    {highlighted && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
    <h3 className="text-lg font-semibold">{name}</h3>
    <div className="mt-2 flex items-baseline"><span className="text-3xl font-bold">{price}</span>{period && <span className="ml-1 text-sm text-muted-foreground">{period}</span>}</div>
    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    <ul className="mt-4 flex-1 space-y-2">{features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm"><Check className="h-3.5 w-3.5 text-primary" />{f}</li>))}</ul>
    <Link href="/register" className="mt-6"><Button variant={highlighted ? "default" : "outline"} className={`w-full ${highlighted ? "glow-amber" : ""}`}>{price === "Free" ? "Start Free" : "Subscribe"}</Button></Link>
  </div>);
}
