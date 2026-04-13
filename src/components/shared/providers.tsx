"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useThemeStore } from "@/stores/theme-store";

function ThemeApplier() {
  const theme = useThemeStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    // Disable all transitions during theme switch to prevent flash
    root.style.setProperty("--theme-transition", "none");
    root.classList.add("theme-switching");

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Re-enable transitions after repaint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.style.removeProperty("--theme-transition");
        root.classList.remove("theme-switching");
      });
    });
  }, [theme]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1 } } }));
  return (
    <SessionProvider>
      <QueryClientProvider client={qc}>
        <ThemeApplier />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
