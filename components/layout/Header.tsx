"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchDropdown from "@/components/ui/SearchDropdown";
import MobileMenu from "@/components/layout/MobileMenu";
import settingsData from "@/data/settings.json";
import useCloseOnNavigate from "@/hooks/useCloseOnNavigate";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Tự động đóng search và menu khi điều hướng trang
  useCloseOnNavigate([
    () => setIsSearchOpen(false),
    () => setIsMobileMenuOpen(false),
  ]);

  // On home page, header can be transparent over hero
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/san-pham" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Bài viết", href: "/bai-viet" },
    { label: "Liên hệ", href: "/lien-he" },
  ];

  // If on admin routes, header is hidden or simplified
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none",
          isTransparent
            ? "bg-transparent text-white py-4 md:py-5"
            : "bg-bg/95 backdrop-blur-md shadow-sticky text-text py-3 md:py-3.5 border-b border-border/50"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1Wv-Nv0NV-zUQsGyPVIlJSw2dr-eXrrFLhX4vV0jbqhyvWeJcJssNwwhKvoquU3yskfSy-xlhJfLgzQF-S0GKdWMwgWyJPqzgve4jv0Ag9OVbXuBJk-pweNhKb9QKxiql41pkh3UmgY2r2Ny9hVZ-xO1NG97ADNZJ3sji-iLCEcPRRYxtFDN5-WUHsJNxpm5v3PbBkTiemGlql1xLod_mzgUQVJaj9Na60qh98swVAR-Wzk1hcdEz1V5lgX"
              alt="Mỹ Nghệ Đông Phong Logo"
              className="h-10 w-10 object-contain rounded-full border border-white/20 shadow-sm"
            />
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-serif text-lg md:text-xl font-bold tracking-wide leading-none transition-colors duration-200",
                  isTransparent ? "text-white" : "text-primary group-hover:text-primary-hover"
                )}
              >
                Mỹ Nghệ Đông Phong
              </span>
              <span
                className={cn(
                  "text-[10px] tracking-[0.18em] uppercase mt-1 font-semibold transition-colors duration-200",
                  isTransparent ? "text-[#E8BF87]" : "text-secondary"
                )}
              >
                Tinh Hoa Gỗ Quý Việt Nam
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-1",
                    isTransparent
                      ? isActive
                        ? "text-white font-semibold"
                        : "text-white/85 hover:text-white"
                      : isActive
                      ? "text-primary font-semibold"
                      : "text-text hover:text-primary"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-[2px] rounded-full",
                        isTransparent ? "bg-white" : "bg-primary"
                      )}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "p-2 rounded-full transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-text hover:bg-accent-soft/60 hover:text-primary"
              )}
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Zalo CTA Button (Desktop) */}
            <a
              href={settingsData.brand.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-zalo hover:brightness-105 text-white text-xs font-semibold px-4 py-2 rounded-pill shadow-sm transition-all duration-200 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white text-zalo" />
              <span>Nhắn Zalo</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-full lg:hidden transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-text hover:bg-accent-soft/60"
              )}
              aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Modals & Drawers */}
      <SearchDropdown
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

export default Header;
