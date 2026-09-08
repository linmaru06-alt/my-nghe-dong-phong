import React from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

export const metadata = {
  title: "Quản Trị CMS — Mỹ Nghệ Đông Phong",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F6F2] flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 p-4 md:p-8 min-h-screen overflow-x-auto">
        {children}
      </main>
    </div>
  );
}
