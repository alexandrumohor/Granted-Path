"use client";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";
import Image from "next/image";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center">
            <Image src="/GrantedPathLogo.png" alt="Granted Path" width={160} height={45} className="h-12 w-auto" />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
