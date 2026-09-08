import React from "react";
import { MessageCircle, Phone, MapPin, Clock, HelpCircle } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Accordion from "@/components/ui/Accordion";
import settingsData from "@/data/settings.json";

export const metadata = {
  title: "Liên Hệ & Tư Vấn Thỉnh Gỗ Quý | Mỹ Nghệ Đông Phong",
  description:
    "Thông tin liên hệ hotline, Zalo chính thức và địa chỉ xưởng chế tác thủ công Mỹ Nghệ Đông Phong. Trực tiếp giải đáp thắc mắc khách hàng 24/7.",
};

export default function ContactPage() {
  const cleanPhone = settingsData.brand.phone.replace(/\s+/g, "");

  // Convert FAQs from settings.json into Accordion format
  const faqItems = settingsData.faq.map((item, index) => ({
    id: `faq-${index}`,
    title: item.q,
    defaultOpen: index === 0,
    content: <p className="leading-relaxed">{item.a}</p>,
  }));

  return (
    <main className="flex-1 w-full bg-bg py-8 md:py-12 select-none">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumb items={[{ label: "Liên hệ & Tư vấn" }]} />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto my-8">
          <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-2">
            Kết Nối Trực Tiếp
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-3">
            Tư Vấn & Đặt Hàng Theo Yêu Cầu
          </h1>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc về phân biệt vân gỗ, tư vấn hợp mệnh và chế tác đo ni riêng.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {/* 1. Zalo Card (Most Prominent) */}
          <div className="p-8 rounded-card bg-surface border-2 border-zalo/40 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-zalo text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
              Nhanh nhất
            </div>
            <div>
              <div className="w-14 h-14 rounded-full bg-zalo/10 text-zalo flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 fill-zalo text-transparent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text mb-2">
                Zalo Nghệ Nhân
              </h3>
              <p className="text-xs text-text-muted mb-6 leading-relaxed">
                Nhắn tin xem video cận cảnh từng thớ vân, tia chớp của phôi gỗ trước khi giao dịch.
              </p>
            </div>
            <a
              href={settingsData.brand.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-btn bg-zalo hover:brightness-105 text-white text-xs font-bold shadow-sm transition-all"
            >
              Nhắn Tin Zalo Ngay
            </a>
          </div>

          {/* 2. Hotline Card */}
          <div className="p-8 rounded-card bg-surface border border-border shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center group">
            <div>
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text mb-2">
                Đường Dây Nóng
              </h3>
              <p className="text-xs text-text-muted mb-6 leading-relaxed">
                Tư vấn nhanh về thông số kích thước hạt, thời giá gỗ và tình trạng sẵn hàng.
              </p>
            </div>
            <a
              href={`tel:${cleanPhone}`}
              className="w-full py-3 px-4 rounded-btn bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all"
            >
              Gọi {settingsData.brand.phone}
            </a>
          </div>

          {/* 3. Workshop Address Card */}
          <div className="p-8 rounded-card bg-surface border border-border shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center group">
            <div>
              <div className="w-14 h-14 rounded-full bg-accent-soft text-secondary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text mb-2">
                Địa Chỉ Xưởng Mộc
              </h3>
              <p className="text-xs text-text-muted mb-6 leading-relaxed">
                {settingsData.brand.address}
              </p>
            </div>
            <div className="pt-2 text-xs text-text-muted flex items-center justify-center gap-1.5 border-t border-border/50">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>{settingsData.brand.businessHours}</span>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="max-w-5xl mx-auto mb-16 rounded-card overflow-hidden border border-border bg-surface shadow-card">
          <div className="p-4 bg-bg border-b border-border flex items-center justify-between">
            <span className="text-xs font-semibold text-text flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Bản Đồ Vị Trí Xưởng Chế Tác
            </span>
            <span className="text-[11px] text-text-muted">Đông Anh, Hà Nội</span>
          </div>
          <div className="h-64 sm:h-80 w-full bg-[#EFE9E0] flex flex-col items-center justify-center text-center p-6 text-text-muted">
            <MapPin className="w-10 h-10 text-primary mb-2 opacity-60 animate-bounce" />
            <p className="font-serif text-base font-bold text-text mb-1">
              Xưởng Gỗ Thủ Công Mỹ Nghệ Đông Phong
            </p>
            <p className="text-xs max-w-sm mb-4">
              {settingsData.brand.address}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(settingsData.brand.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:underline"
            >
              Mở trên Google Maps →
            </a>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <section id="chinh-sach" className="max-w-3xl mx-auto pt-8 border-t border-border">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Câu Hỏi Thường Gặp</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
              Giải Đáp Thắc Mắc & Chính Sách
            </h2>
          </div>

          <div className="bg-surface p-6 md:p-8 rounded-card border border-border shadow-card">
            <Accordion items={faqItems} />
          </div>
        </section>
      </div>
    </main>
  );
}
