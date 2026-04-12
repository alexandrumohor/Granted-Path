import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/shared/providers";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Granted Path — Learn Anything. Your AI Knows How.",
  description: "A personal AI tutor that adapts to how you learn, tracks your progress in real-time, and prepares you efficiently for any goal.",
  keywords: ["AI learning", "online courses", "AI tutor", "personalized learning", "exam preparation", "adaptive learning"],
  authors: [{ name: "Granted Training Enterprise SRL" }],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=JSON.parse(localStorage.getItem("gp-theme")||"{}");if(t.state&&t.state.theme==="dark")document.documentElement.classList.add("dark")}catch(e){}` }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-14 animate-page-in">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
