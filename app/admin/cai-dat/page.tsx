"use client";

import React, { useState } from "react";
import { Save, Check } from "lucide-react";
import settingsData from "@/data/settings.json";

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    siteName: settingsData.brand?.name || settingsData.siteName,
    phone: settingsData.brand?.phone || settingsData.hotline,
    zaloLink: settingsData.brand?.zaloLink || settingsData.zaloLink,
    address: settingsData.brand?.address || settingsData.address,
    businessHours: settingsData.brand?.businessHours || settingsData.workingHours,
    email: settingsData.email,
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_settings", JSON.stringify(formData));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Cài Đặt Hệ Thống & Liên Hệ
        </h1>
        <p className="text-xs text-text-muted mt-1">
          Cập nhật thông tin hotline, đường dẫn Zalo tư vấn và địa chỉ xưởng gỗ.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-surface p-6 md:p-8 rounded-card border border-border shadow-xs space-y-4">
          <h2 className="font-serif text-base font-bold text-primary border-b border-border pb-2">
            Thông Tin Doanh Nghiệp & Hotline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
                Tên thương hiệu *
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, siteName: e.target.value }))
                }
                className="w-full bg-bg border border-border rounded-btn px-3.5 py-2 text-sm text-text focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
                Hotline điện thoại *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full font-mono bg-bg border border-border rounded-btn px-3.5 py-2 text-sm text-text focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
                Đường dẫn Zalo OA / Zalo cá nhân *
              </label>
              <input
                type="text"
                value={formData.zaloLink}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, zaloLink: e.target.value }))
                }
                className="w-full bg-bg border border-border rounded-btn px-3.5 py-2 text-sm text-text focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
                Email liên hệ
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full bg-bg border border-border rounded-btn px-3.5 py-2 text-sm text-text focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
              Địa chỉ xưởng mộc *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
              className="w-full bg-bg border border-border rounded-btn px-3.5 py-2 text-sm text-text focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-text uppercase tracking-wider block mb-1.5">
              Giờ làm việc xưởng
            </label>
            <input
              type="text"
              value={formData.businessHours}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, businessHours: e.target.value }))
              }
              className="w-full bg-bg border border-border rounded-btn px-3.5 py-2 text-sm text-text focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-btn text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã lưu thành công!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
