import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as { name: string; email: string; password: string };
    if (!name || !email || !password) return NextResponse.json({ error: "All fields required" }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    const existing = await db.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) return NextResponse.json({ error: "Account already exists" }, { status: 409 });

    const user = await db.user.create({
      data: { name, email: email.toLowerCase(), password: await bcrypt.hash(password, 12), subscription: { create: { tier: "FREE", status: "ACTIVE" } }, learnerProfile: { create: {} } },
      select: { id: true, name: true, email: true },
    });
    return NextResponse.json({ message: "Account created", user }, { status: 201 });
  } catch (error) { console.error("Registration error:", error); return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); }
}
