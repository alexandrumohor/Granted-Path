import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: { signIn: "/login", newUser: "/onboarding", error: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const u = user as unknown as Record<string, unknown>;
        token.role = u.role ?? "USER";
        token.tier = u.tier ?? "FREE";
        token.onboardingCompleted = u.onboardingCompleted ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        const su = session.user as unknown as Record<string, unknown>;
        su.role = token.role;
        su.tier = token.tier;
        su.onboardingCompleted = token.onboardingCompleted;
      }
      return session;
    },
  },
  providers: [
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    GitHub({ clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET }),
    Credentials({
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { db } = await import("@/lib/db");
        if (!db) return null;
        const user = await db.user.findUnique({ where: { email: credentials.email as string }, include: { subscription: true } });
        if (!user?.password) return null;
        const valid = await bcrypt.compare(credentials.password as string, user.password);
        if (!valid) return null;
        await db.user.update({ where: { id: user.id }, data: { lastActiveAt: new Date() } });
        return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role, tier: user.subscription?.tier ?? "FREE", onboardingCompleted: user.onboardingCompleted };
      },
    }),
  ],
});
