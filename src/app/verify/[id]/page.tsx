import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Calendar, Clock, User } from "lucide-react";

// This page is PUBLIC — no auth required
// In production, fetch certificate from DB by ID

export default async function VerifyCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock data — will be replaced with DB lookup
  const cert = {
    id,
    valid: true,
    holderName: "Alexandru Mohor",
    course: "Python Fundamentals",
    type: "COMPLETION" as const,
    score: null as number | null,
    hoursSpent: 8,
    issuedAt: "2026-04-05",
    issuer: "Granted Training Enterprise SRL",
  };

  if (!cert.valid) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-red-500/30">
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <Award className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-xl font-bold">Certificate Not Found</h1>
            <p className="mt-2 text-sm text-muted-foreground">This certificate ID is invalid or has been revoked.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-lg w-full border-green-500/30">
        <CardContent className="pt-8 pb-8 text-center">
          {/* Valid badge */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>

          <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">Verified Certificate</Badge>

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image src="/GrantedPathLogo.png" alt="Granted Path" width={120} height={35} className="h-9 w-auto" />
          </div>

          {/* Certificate info */}
          <h1 className="text-xl font-bold">Certificate of {cert.type.charAt(0) + cert.type.slice(1).toLowerCase()}</h1>
          <p className="text-2xl font-bold text-primary mt-2">{cert.course}</p>

          <div className="mt-6 space-y-3 text-left max-w-xs mx-auto">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><User className="h-4 w-4" />Holder</span>
              <span className="font-medium">{cert.holderName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />Issued</span>
              <span className="font-medium">{cert.issuedAt}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" />Hours</span>
              <span className="font-medium">{cert.hoursSpent}h</span>
            </div>
            {cert.score && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Award className="h-4 w-4" />Score</span>
                <span className="font-medium">{cert.score}%</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ID</span>
              <span className="font-mono text-xs text-muted-foreground">{cert.id}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground">Issued by {cert.issuer}</p>
            <p className="text-xs text-muted-foreground mt-1">This certificate is authentic and verifiable.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
