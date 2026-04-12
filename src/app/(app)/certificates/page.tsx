"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Download, ExternalLink, Share2, Copy, Check, Lock } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  course: string;
  type: "COMPLETION" | "PROFICIENCY" | "MASTERY";
  score: number | null;
  hoursSpent: number;
  issuedAt: string;
  verifyUrl: string;
}

const MOCK_CERTS: Certificate[] = [
  { id: "cert-001", title: "Python Fundamentals", course: "Python Fundamentals", type: "COMPLETION", score: null, hoursSpent: 8, issuedAt: "2026-04-05", verifyUrl: "/verify/cert-001" },
  { id: "cert-002", title: "Digital Marketing 101", course: "Digital Marketing 101", type: "PROFICIENCY", score: 82, hoursSpent: 6, issuedAt: "2026-04-08", verifyUrl: "/verify/cert-002" },
];

const TYPE_STYLES = {
  COMPLETION: { label: "Completion", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
  PROFICIENCY: { label: "Proficiency", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
  MASTERY: { label: "Mastery", color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
};

export default function CertificatesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  function copyLink(id: string, url: string) {
    navigator.clipboard.writeText(`${window.location.origin}${url}`);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Award className="h-6 w-6 text-primary" />Certificates</h1>
        <p className="mt-1 text-sm text-muted-foreground">{MOCK_CERTS.length} certificates earned. Share them with employers.</p>
      </div>

      {MOCK_CERTS.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Award className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">No certificates yet</p>
            <p className="text-sm text-muted-foreground mt-1">Complete a course to earn your first certificate.</p>
            <Link href="/learn"><Button className="mt-4">Browse Courses</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {MOCK_CERTS.map(cert => {
            const style = TYPE_STYLES[cert.type];
            return (
              <Card key={cert.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Certificate preview */}
                    <div className="md:w-80 bg-gradient-to-br from-background to-muted/50 border-b md:border-b-0 md:border-r border-border/50 p-8 flex flex-col items-center justify-center text-center">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
                        <Image src="/icon.png" alt="SP" width={36} height={36} className="rounded-full" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Certificate of {style.label}</p>
                      <p className="text-lg font-bold">{cert.title}</p>
                      <p className="text-xs text-muted-foreground mt-2">Issued {cert.issuedAt}</p>
                      <p className="text-xs text-muted-foreground">ID: {cert.id}</p>
                      {cert.score && <Badge className="mt-2" variant="secondary">Score: {cert.score}%</Badge>}
                    </div>

                    {/* Details + Actions */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{cert.course}</h3>
                          <Badge variant="outline" className={`mt-1 ${style.color}`}>{style.label}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                        <div className="rounded-lg bg-muted/50 px-3 py-2">
                          <p className="text-xs text-muted-foreground">Hours Spent</p>
                          <p className="font-semibold">{cert.hoursSpent}h</p>
                        </div>
                        <div className="rounded-lg bg-muted/50 px-3 py-2">
                          <p className="text-xs text-muted-foreground">Issued</p>
                          <p className="font-semibold">{cert.issuedAt}</p>
                        </div>
                        {cert.score && (
                          <div className="rounded-lg bg-muted/50 px-3 py-2">
                            <p className="text-xs text-muted-foreground">Score</p>
                            <p className="font-semibold">{cert.score}%</p>
                          </div>
                        )}
                        <div className="rounded-lg bg-muted/50 px-3 py-2">
                          <p className="text-xs text-muted-foreground">Type</p>
                          <p className="font-semibold">{style.label}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline"><Download className="mr-2 h-3.5 w-3.5" />Download PDF</Button>
                        <Button size="sm" variant="outline" onClick={() => copyLink(cert.id, cert.verifyUrl)}>
                          {copied === cert.id ? <><Check className="mr-2 h-3.5 w-3.5" />Copied!</> : <><Copy className="mr-2 h-3.5 w-3.5" />Copy Link</>}
                        </Button>
                        <Button size="sm" variant="outline"><Share2 className="mr-2 h-3.5 w-3.5" />Add to LinkedIn</Button>
                        <Link href={cert.verifyUrl}><Button size="sm" variant="outline"><ExternalLink className="mr-2 h-3.5 w-3.5" />Verify</Button></Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Locked certificates info */}
      <Card className="mt-8 border-dashed">
        <CardContent className="py-6 text-center">
          <Lock className="mx-auto h-6 w-6 text-muted-foreground/40 mb-2" />
          <p className="text-sm font-medium">More certificate types available on paid plans</p>
          <p className="text-xs text-muted-foreground mt-1">Starter: Completion | Pro: + Proficiency | Master: + Mastery</p>
          <Link href="/settings/subscription"><Button variant="outline" size="sm" className="mt-3">Upgrade Plan</Button></Link>
        </CardContent>
      </Card>
    </div>
  );
}
