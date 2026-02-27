import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LinkTrack – Influencer Smart Link Tracker",
  description:
    "Create smart tracking links, capture analytics, and grow your audience with deep insights.",
  keywords: "link tracker, influencer analytics, short links, UTM tracking",
  openGraph: {
    title: "LinkTrack – Influencer Smart Link Tracker",
    description: "Create smart tracking links and capture deep analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-950 text-gray-100 antialiased">{children}</body>
    </html>
  );
}
