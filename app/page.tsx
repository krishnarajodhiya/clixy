import Link from "next/link";
import { Link2, ArrowRight } from "lucide-react";
import HeroText from "@/components/landing/HeroText";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0c] text-[#f4f2e9] font-sans selection:bg-[#ff6b4a] selection:text-white pb-32">
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-20">
        <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-[#f4f2e9] text-[#0d0d0c] rounded uppercase font-black tracking-tight transform -skew-y-2 border-2 border-dashed border-[#0d0d0c] shadow-[4px_4px_0_#ff6b4a] text-lg">
              CLIXY™
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide text-gray-400 uppercase">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#stats" className="hover:text-white transition-colors">Analytics</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-white uppercase transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="hidden sm:inline-block px-5 py-2.5 text-sm font-bold bg-transparent border-2 border-[#f4f2e9] text-[#f4f2e9] rounded-full hover:bg-[#f4f2e9] hover:text-[#0d0d0c] transition-all uppercase tracking-wide"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 flex flex-col items-center text-center overflow-hidden">
        {/* Subtle starry background overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="w-full relative z-10 px-4">
          <HeroText firstLine="LET'S TRACK" secondLine="YOUR CLICKS" />
        </div>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-6 mb-10 leading-relaxed z-10 font-medium px-4">
          Turn <span className="text-[#f4f2e9] font-bold">Links into Insights</span> and <span className="text-[#f4f2e9] font-bold">Clicks into Growth</span> — with powerful tracking analytics.
        </p>

        <div className="z-10 relative group">
          <div className="absolute inset-0 bg-[#2dec59] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
          <Link
            href="/signup"
            className="flex items-center gap-2 px-8 py-4 bg-[#2dec59] hover:bg-[#28d750] text-[#0d0d0c] rounded-full font-black text-lg transition-transform hover:scale-105 active:scale-95 uppercase tracking-wide"
          >
            Start Tracking Now
          </Link>
        </div>
      </section>

      {/* Logos Marquee Overlay Placeholder */}
      <section className="mt-32 w-full overflow-hidden border-t border-white/5 pt-12">
        <div className="flex max-w-[1400px] mx-auto px-6 opacity-40 justify-between items-center grayscale gap-8 flex-wrap">
          {["Instagram", "YouTube", "TikTok", "Snapchat", "WhatsApp", "Facebook"].map(platform => (
            <div key={platform} className="text-2xl font-bold uppercase tracking-tight text-white hover:text-[#ff6b4a] hover:grayscale-0 transition-all cursor-crosshair">
              {platform}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
