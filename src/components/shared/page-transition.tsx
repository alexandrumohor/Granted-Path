"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    setVisible(false);
    setKey(pathname);
    const t = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(t);
  }, [pathname]);

  return (
    <div
      key={key}
      className="transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      {children}
    </div>
  );
}
