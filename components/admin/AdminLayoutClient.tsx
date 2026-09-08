"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Trang đăng nhập hiển thị toàn màn hình không có thanh điều hướng Admin
  if (pathname === "/admin/login") {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#F8F6F2] flex">
        <AdminSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-8 min-h-screen overflow-x-auto">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}
