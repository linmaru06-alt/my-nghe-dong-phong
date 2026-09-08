import React from "react";
import { ShieldCheck, Compass, Sparkles } from "lucide-react";

export function TrustStrip() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Gỗ Tự Nhiên 100%",
      desc: "Cam kết chuẩn phôi gỗ nguyên khối, nói không với gỗ ép, phủ vân nhân tạo.",
    },
    {
      icon: Compass,
      title: "Mộc Thủ Công Chuẩn Vị",
      desc: "Được tiện gọt, mài giũa tỉ mỉ giữ trọn vẹn thớ nu tự nhiên và ánh dầu thơm.",
    },
    {
      icon: Sparkles,
      title: "Tư Vấn Phong Thủy Tận Tâm",
      desc: "Trực tiếp quay video vân thực tế gửi quý khách qua Zalo trước khi thỉnh.",
    },
  ];

  return (
    <section className="bg-primary text-white py-10 md:py-12 border-y border-[#4E2D12] select-none">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 pt-6 md:pt-0 md:px-6 first:pt-0 first:px-0"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-base md:text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustStrip;
