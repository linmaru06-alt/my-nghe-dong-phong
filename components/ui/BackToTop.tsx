"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Hide when reaching footer
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearFooter(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/admin") || !isVisible || isNearFooter) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside
      aria-label="Cuộn về đầu trang"
      className="fixed bottom-[90px] right-4 md:bottom-[96px] md:right-8 z-40 flex items-center select-none"
    >
      {/* Tooltip on Desktop */}
      <div
        className={`hidden md:block mr-2.5 px-2.5 py-1 rounded-md bg-[#1F1610] text-[#D4AF37] border border-[#C5A059]/30 text-[11px] font-medium shadow-md transition-all duration-200 pointer-events-none ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        <span>Về đầu trang</span>
      </div>

      {/* Back to top button */}
      <button
        type="button"
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#3D2314] hover:bg-[#5C3A21] border border-[#C5A059]/50 text-[#D4AF37] flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-90 transition-all duration-300 group"
        aria-label="Cuộn lên đầu trang"
      >
        <ChevronUp className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-y-0.5" />
      </button>
    </aside>
  );
}

export default BackToTop;
