"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Không áp dụng guard cho trang đăng nhập
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
        }
      } catch {
        setIsAuthenticated(false);
        router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF6F0] text-[#2A160C]">
        <div className="w-12 h-12 rounded-full bg-[#C5A059]/15 flex items-center justify-center mb-3">
          <Loader2 className="w-6 h-6 text-[#C5A059] animate-spin" />
        </div>
        <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#5C3A21]">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span>Đang xác thực phiên quản trị...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
