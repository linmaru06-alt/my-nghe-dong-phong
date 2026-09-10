"use client";

import React from "react";
import { ShieldCheck, Compass, Sparkles, Award, Trees, Users, Gem } from "lucide-react";
import CounterTrigger from "@/components/ui/CounterTrigger";
import ScrollReveal, { ScrollRevealGroup } from "@/components/ui/ScrollReveal";

export function TrustStrip() {
  const stats = [
    {
      icon: Trees,
      target: 100,
      suffix: "%",
      title: "Gỗ Nguyên Khối Chuẩn",
      desc: "Nói không với phôi ép, nhân tạo",
    },
    {
      icon: Award,
      target: 15,
      suffix: "+",
      title: "Năm Nghề Chế Tác",
      desc: "Nghệ nhân mộc gia truyền",
    },
    {
      icon: Users,
      target: 10000,
      suffix: "+",
      title: "Khách Thỉnh Tác Phẩm",
      desc: "Tin tưởng trên toàn quốc",
    },
    {
      icon: Gem,
      target: 7,
      suffix: " Dòng",
      title: "Gỗ Quý Phong Thủy",
      desc: "Tử Đàn, Sưa, Bách Xanh, Mun...",
    },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Gỗ Tự Nhiên Tuyển Chọn",
      desc: "Cam kết chuẩn phôi già nguyên khối, thớ nu đanh chắc và hương thơm tự nhiên.",
    },
    {
      icon: Compass,
      title: "Mộc Thủ Công Chuẩn Vị",
      desc: "Được tiện gọt, mài giũa thủ công tỉ mỉ giữ trọn vẹn từng đường vân hoa đất trời.",
    },
    {
      icon: Sparkles,
      title: "Tư Vấn Phong Thủy Tận Tâm",
      desc: "Trực tiếp quay video vân thực tế gửi quý khách qua Zalo kiểm tra trước khi thỉnh.",
    },
  ];

  return (
    <section className="bg-primary text-white py-12 md:py-16 border-y border-[#4E2D12] select-none overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Animated Counter Stats */}
        <ScrollReveal direction="up" delay={0}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-10 md:pb-12 border-b border-white/10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A059]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 text-[#D4AF37] flex items-center justify-center mb-2.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-serif text-2xl md:text-3xl font-bold text-[#E8BF87] tracking-tight">
                    <CounterTrigger target={stat.target} suffix={stat.suffix} />
                  </div>
                  <h4 className="text-xs md:text-sm font-semibold text-white mt-1">
                    {stat.title}
                  </h4>
                  <p className="text-[11px] md:text-xs text-white/70 mt-0.5">
                    {stat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* 3 Core Pillars */}
        <ScrollRevealGroup
          staggerDelay={120}
          direction="up"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 pt-10 md:pt-12 divide-y md:divide-y-0 md:divide-x divide-white/15"
        >
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 pt-6 md:pt-0 md:px-6 first:pt-0 first:px-0"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-inner">
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
        </ScrollRevealGroup>
      </div>
    </section>
  );
}

export default TrustStrip;
