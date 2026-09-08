"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import settingsData from "@/data/settings.json";

export function HeroSection() {
  const scrollToContent = () => {
    const nextSection = document.getElementById("danh-muc");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full -mt-20 overflow-hidden bg-primary text-white min-h-[640px] lg:min-h-[760px] flex items-center select-none">
      {/* Background Image from Stitch */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOqEINELNhogS-gBuKHsu4WSrr10syYzotQSdDiqCs9XvDc8EBls4LXubnhkVqZjyfsOnbl5hmLURkrXOQnJbP3IsmVQdbjbogh1U7rh-t_aDvogzdfu7xNfFPrLrYrGNcPnlE464IVS7-0rAz6JELEHpypEGz_w00Ul8YsgiBQdeyJ5wTpw2sB2WOtMqL5R88bxBTGvyCEJJ2HMCfPNQ8jcFk63MIpOeIeFa3I5J5fpGHkufbOyEdaA')`,
          }}
        />
        <div className="absolute inset-0 bg-[#2C1A0E]/75" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto px-4 md:px-8 pt-32 pb-20 flex flex-col justify-between items-start">
        <div className="max-w-3xl flex flex-col space-y-5">
          {/* Eyebrow badge with amber pulse */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E0C097]"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8963E] animate-pulse" />
            <span className="text-[11px] tracking-[0.25em] uppercase font-semibold">
              ĐỒ MỸ NGHỆ GỖ QUÝ THỦ CÔNG
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15]"
          >
            Tinh hoa từ những <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#E8BF87]">thớ gỗ quý ngàn năm</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-[#F5D3C0] font-light max-w-2xl leading-relaxed"
          >
            Mỗi tác phẩm là kết tinh của thời gian, thổ nhưỡng ngàn năm và đôi bàn tay tài hoa của nghệ nhân làng mộc truyền thống Đông Phong.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Link
              href="#danh-muc"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:-translate-y-0.5 bg-primary hover:bg-primary-hover"
            >
              <span>Khám phá sản phẩm</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={settingsData.brand.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:-translate-y-0.5 bg-zalo hover:brightness-105"
            >
              <MessageCircle className="w-4 h-4 fill-white text-zalo" />
              <span>Nhắn Zalo ngay</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Chevron */}
        <button
          type="button"
          onClick={scrollToContent}
          className="pt-12 flex items-center gap-2 text-[#F5D3C0]/80 hover:text-white text-xs tracking-widest uppercase transition-colors"
        >
          <ChevronDown className="w-5 h-5 animate-bounce text-[#C8963E]" />
          <span>Cuộn xuống thưởng lãm</span>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
