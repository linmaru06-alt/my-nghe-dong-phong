"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div
      className={cn(
        "flex-1 flex flex-col w-full min-h-[calc(100vh-80px)]",
        !isHome && "pt-16 md:pt-20"
      )}
    >
      {children}
    </div>
  );
}

export default PageTransition;

