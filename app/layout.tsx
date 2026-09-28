import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Upright } from "next/font/google";
import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
  fallback: ["Arial", "sans-serif"],
});

const displayFont = Cormorant_Upright({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  title: "Huygirl Thư pháp Việt — Thư viện tác phẩm",
  description: "Không gian thưởng lãm thư pháp Việt, câu chuyện và chất liệu phía sau từng tác phẩm.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
