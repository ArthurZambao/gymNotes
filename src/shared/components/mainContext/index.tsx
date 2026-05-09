"use client";

import { usePathname } from "next/navigation";

const NO_PADDING_ROUTES = ["/login", "/register"];

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasPadding = !NO_PADDING_ROUTES.includes(pathname);

  return (
    <main className={`flex-1 relative z-10 ${hasPadding ? "pt-20" : ""}`}>
      {children}
    </main>
  );
}