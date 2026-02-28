import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Clixy – Smart Link Tracker for Influencers",
  description:
    "Create short tracking links and capture deep analytics on every click — platform, device, and country.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#111111] text-[#e5e5e5] antialiased selection:bg-[#2b2b2b] selection:text-white">{children}</body>
    </html>
  );
}
