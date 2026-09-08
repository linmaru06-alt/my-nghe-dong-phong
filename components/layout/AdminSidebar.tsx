"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: "Tổng quan",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Sản phẩm",
      href: "/admin/san-pham",
      icon: Package,
    },
    {
      label: "Bài viết",
      href: "/admin/bai-viet",
      icon: BookOpen,
    },
    {
      label: "Cài đặt chung",
      href: "/admin/cai-dat",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth");
    }
    router.push("/admin");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <button
          type="button"
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          className="p-2 rounded-btn bg-surface border border-border shadow-sm text-text"
          aria-label="Toggle Sidebar"
        >
          {isMobileExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileExpanded && (
        <div
          onClick={() => setIsMobileExpanded(false)}
          className="lg:hidden fixed inset-0 bg-text/40 backdrop-blur-xs z-40"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-64 bg-surface border-r border-border flex flex-col transition-transform duration-300 select-none",
          isMobileExpanded ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="block">
            <span className="font-serif text-lg font-bold text-primary block leading-none">
              Mỹ Nghệ Đông Phong
            </span>
            <span className="text-[10px] text-text-muted tracking-widest uppercase font-semibold">
              Quản Trị Hệ Thống
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileExpanded(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-btn text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary border-l-4 border-primary font-semibold"
                    : "text-text-muted hover:text-text hover:bg-bg"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-border">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-4 py-2 text-xs font-medium text-text-muted hover:text-primary transition-colors"
            >
              <span>Xem trang ngoài</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-border bg-bg/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold font-serif">
              ĐP
            </div>
            <div>
              <p className="text-xs font-semibold text-text">Quản trị viên</p>
              <p className="text-[10px] text-text-muted">admin@dongphong.vn</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Đăng xuất"
            className="p-1.5 rounded-btn text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
