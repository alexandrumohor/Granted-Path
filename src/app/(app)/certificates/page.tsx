"use client";
import { useTranslations } from "@/hooks/use-translations";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Download, ExternalLink, Share2, Copy, Check, Lock } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  courseId: string;
  type: "COMPLETION" | "PROFICIENCY" | "MASTERY";
  score: number | null;
  hoursSpent: number | null;
  issuedAt: string;
}

const TYPE_STYLES = {
  COMPLETION: { label: "Finalizare", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
  PROFICIENCY: { label: "Competenta", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
  MASTERY: { label: "Stapanire", color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
};

export default function CertificatesPage() {
  const t = useTranslations("certificates");
  const tc = useTranslations("common");
  const [copied, setCopied] = useState<string | null>(null);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/certificates")
      .then(r => r.ok ? r.json() : [])
      .then(setCerts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function copyLink(id: string) {
    navigator.clipboard.writeText(`${window.location.origin}/verify/${id}`);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-40 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Award className="h-6 w-6 text-primary" />{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {certs.length > 0
            ? `${certs.length} ${t("earned")}`
            : t("noCertsYet")
          }
        </p>
      </div>

      {certs.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Award className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">{t("noCerts")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("noCertsDesc")}</p>
            <Link href="/learn"><Button className="mt-4">{t("browseCourses")}</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {certs.map(cert => {
            const style = TYPE_STYLES[cert.type];
            return (
              <Card key={cert.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-80 bg-gradient-to-br from-background to-muted/50 border-b md:border-b-0 md:border-r border-border/50 p-8 flex flex-col items-center justify-center text-center">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
                        <Image src="/icon.png" alt="GP" width={36} height={36} className="rounded-full" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("certificateOf")} {style.label}</p>
                      <p className="text-lg font-bold">{cert.title}</p>
                      <p className="text-xs text-muted-foreground mt-2">{t("issued")} {cert.issuedAt}</p>
                      <p className="text-xs text-muted-foreground">ID: {cert.id.slice(0, 12)}</p>
                      {cert.score && <Badge className="mt-2" variant="secondary">{t("score")}: {cert.score}%</Badge>}
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{cert.title}</h3>
                          <Badge variant="outline" className={`mt-1 ${style.color}`}>{style.label}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                        {cert.hoursSpent && (
                          <div className="rounded-lg bg-muted/50 px-3 py-2">
                            <p className="text-xs text-muted-foreground">{tc("hours")}</p>
                            <p className="font-semibold">{cert.hoursSpent}h</p>
                          </div>
                        )}
                        <div className="rounded-lg bg-muted/50 px-3 py-2">
                          <p className="text-xs text-muted-foreground">{t("issued")}</p>
                          <p className="font-semibold">{cert.issuedAt}</p>
                        </div>
                        {cert.score && (
                          <div className="rounded-lg bg-muted/50 px-3 py-2">
                            <p className="text-xs text-muted-foreground">{t("score")}</p>
                            <p className="font-semibold">{cert.score}%</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline"><Download className="mr-2 h-3.5 w-3.5" />{t("download")}</Button>
                        <Button size="sm" variant="outline" onClick={() => copyLink(cert.id)}>
                          {copied === cert.id ? <><Check className="mr-2 h-3.5 w-3.5" />{t("copied")}</> : <><Copy className="mr-2 h-3.5 w-3.5" />{t("copyLink")}</>}
                        </Button>
                        <Button size="sm" variant="outline"><Share2 className="mr-2 h-3.5 w-3.5" />LinkedIn</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="mt-8 border-dashed">
        <CardContent className="py-6 text-center">
          <Lock className="mx-auto h-6 w-6 text-muted-foreground/40 mb-2" />
          <p className="text-sm font-medium">{t("moreTypes")}</p>
          <p className="text-xs text-muted-foreground mt-1">Starter: Finalizare | Pro: + Competenta | Master: + Stapanire</p>
          <Link href="/settings/subscription"><Button variant="outline" size="sm" className="mt-3">{t("upgradePlan")}</Button></Link>
        </CardContent>
      </Card>
    </div>
  );
}
