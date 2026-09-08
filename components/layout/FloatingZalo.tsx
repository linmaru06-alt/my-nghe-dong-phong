"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import settingsData from "@/data/settings.json";

export function FloatingZalo() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Hide when reaching footer to avoid overlap
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/admin") || !isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Liên hệ hỗ trợ Zalo"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex items-center select-none"
    >
      {/* Tooltip on Desktop */}
      <div
        className={`hidden md:block mr-3 px-3 py-1.5 rounded-lg bg-text text-white text-xs font-medium shadow-lg transition-all duration-200 pointer-events-none ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
        }`}
      >
        <span>Tư vấn qua Zalo 💬</span>
      </div>

      {/* Button & Pulse Ring */}
      <div className="relative group">
        {/* Animated Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-zalo/40 animate-ping pointer-events-none" />

        {/* Main Floating Button */}
        <a
          href={settingsData.brand.zaloLink}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-14 h-14 rounded-full bg-zalo text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Chat Zalo với Mỹ Nghệ Đông Phong"
        >
          <MessageCircle className="w-7 h-7 fill-white text-zalo" />
        </a>
      </div>
    </aside>
  );
}

export default FloatingZalo;
