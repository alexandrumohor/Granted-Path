import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Granted Path — AI Learning",
    short_name: "Granted Path",
    description: "AI-powered learning platform that actually teaches you efficiently.",
    start_url: "/dashboard",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0f0a",
    theme_color: "#10b981",
    categories: ["education", "productivity"],
    lang: "en",
    icons: [
      { src: "/discordlogo.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/discordlogo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/discordlogo.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Dashboard", short_name: "Home", url: "/dashboard", icons: [{ src: "/discordlogo.png", sizes: "96x96" }] },
      { name: "AI Chat", short_name: "Chat", url: "/ai-chat", icons: [{ src: "/discordlogo.png", sizes: "96x96" }] },
      { name: "Voice Tutor", short_name: "Voice", url: "/voice", icons: [{ src: "/discordlogo.png", sizes: "96x96" }] },
    ],
  };
}
