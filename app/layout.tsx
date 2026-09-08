import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mỹ Nghệ Đông Phong — Đồ Gỗ Quý Mỹ Nghệ & Phong Thủy",
  description:
    "Chuyên chế tác mộc thủ công từ các loại gỗ quý tự nhiên: Tử Đàn, Sưa, Nu Bách Xanh, Huyết Long, Mun Sừng. Tư vấn Zalo và hotline trực tiếp.",
  keywords: ["đồ gỗ mỹ nghệ", "vòng tay phong thủy", "bút ký gỗ quý", "mỹ nghệ đông phong"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable}`}>
      <body className="min-h-screen antialiased flex flex-col">{children}</body>
    </html>
  );
}
