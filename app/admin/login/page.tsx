"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/Toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";

  const [identifier, setIdentifier] = useState("admin@dongphong.vn");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Tài khoản hoặc mật khẩu không chính xác.");
      }

      // Lưu token vào localStorage để hỗ trợ client-side sync
      if (typeof window !== "undefined" && data.token) {
        localStorage.setItem("dongphong_admin_token", data.token);
        localStorage.setItem("admin_auth", "true");
      }

      toast.success("Đăng nhập thành công!", "Chào mừng bạn đến với Cổng Quản Trị Đông Phong.");

      // Điều hướng vào trang quản trị
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi trong quá trình xác thực.");
      toast.error("Đăng nhập thất bại", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F1610] text-[#FAF6F0] flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-[#C5A059] selection:text-[#1F1610]">
      {/* Background Decorative Wood Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#5C3A21]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#C5A059] hover:text-[#D4AF37] transition-colors py-1.5 px-3 rounded-lg bg-[#2A160C]/60 border border-[#C5A059]/30 backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về trang chủ</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#2A160C]/90 backdrop-blur-md border border-[#C5A059]/40 rounded-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8C6D2D] p-[1px] shadow-lg">
            <div className="w-full h-full rounded-full bg-[#1F1610] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-[#C5A059]" />
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDFBF7] tracking-tight">
            Mỹ Nghệ Đông Phong
          </h1>
          <p className="text-[11px] text-[#C5A059] uppercase tracking-[0.25em] font-semibold mt-1.5">
            Cổng Quản Trị Hệ Thống
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5 animate-shake">
            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email / Username */}
          <div>
            <label className="block text-xs font-medium text-[#FAF6F0]/80 uppercase tracking-wider mb-2">
              Tài khoản / Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#C5A059]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin@dongphong.vn"
                className="w-full bg-[#1F1610]/80 border border-[#C5A059]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#FAF6F0] placeholder-[#FAF6F0]/30 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-[#FAF6F0]/80 uppercase tracking-wider mb-2">
              Mật khẩu quản trị
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#C5A059]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full bg-[#1F1610]/80 border border-[#C5A059]/30 rounded-xl pl-10 pr-11 py-2.5 text-sm text-[#FAF6F0] placeholder-[#FAF6F0]/30 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C5A059]/70 hover:text-[#C5A059] p-1"
                aria-label="Hiện/Ẩn mật khẩu"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-gradient-to-r from-[#C5A059] to-[#8C6D2D] hover:from-[#D4AF37] hover:to-[#A38035] text-[#1F1610] font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-[#C5A059]/20 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang xác thực...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Đăng Nhập Quản Trị</span>
              </>
            )}
          </button>
        </form>

        {/* Security Note / Credentials Hint */}
        <div className="mt-8 pt-6 border-t border-[#C5A059]/20 text-center">
          <p className="text-[11px] text-[#FAF6F0]/50 leading-relaxed">
            Hệ thống quản trị nội bộ dành riêng cho Quản trị viên Mỹ Nghệ Đông Phong. Mọi thao tác đều được mã hóa và giám sát an toàn.
          </p>
        </div>
      </div>
    </div>
  );
}
