"use client";

import React, { useState, useEffect } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -60% 0%" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="p-5 rounded-card bg-surface border border-border sticky top-24 select-none">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border text-sm font-serif font-bold text-primary">
        <List className="w-4 h-4" />
        <span>Mục Lục Bài Viết</span>
      </div>

      <nav className="space-y-1.5 text-xs max-h-[70vh] overflow-y-auto">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  setActiveId(item.id);
                }
              }}
              className={cn(
                "block py-1 transition-colors leading-normal",
                item.level === 3 ? "pl-3 text-[11px]" : "font-medium",
                isActive
                  ? "text-primary font-bold border-l-2 border-primary pl-2"
                  : "text-text-muted hover:text-text"
              )}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export default TableOfContents;
