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
      <body className="bg-[#0d0d0c] text-[#f4f2e9] antialiased selection:bg-[#ff6b4a] selection:text-[#f4f2e9]">{children}</body>
    </html>
  );
}
