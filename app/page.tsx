import Link from "next/link";
import {
  BarChart3,
  Link2,
  Globe,
  Smartphone,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Background gradient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 rounded-full bg-emerald-600/8 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <Link2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">LinkTrack</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-center px-6 pt-20 pb-32 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-6">
          <Zap className="w-3 h-3" />
          Free tier — No credit card required
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
          Smart Link Tracking for{" "}
          <span className="gradient-text">Influencers</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Create trackable short links, capture deep analytics on every click —
          platform, device, country — and grow smarter with real data.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-500/20"
          >
            Start Tracking Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] border border-gray-700"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-6 pb-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            Everything you need to track smarter
          </h2>
          <p className="text-gray-400">
            Powerful analytics with zero complexity
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600/30 to-blue-600/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-5 h-5 text-violet-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="relative z-10 px-6 pb-24 max-w-3xl mx-auto text-center">
        <div className="glass rounded-3xl p-10 gradient-border">
          <h2 className="text-3xl font-bold mb-4">Start free. Scale later.</h2>
          <p className="text-gray-400 mb-8">
            All core features included on the free tier. Built on Supabase +
            Vercel for zero-cost deployment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                {p}
              </div>
            ))}
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Your Free Account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 py-8 text-center text-gray-500 text-sm">
        <p>
          Built with Next.js, Supabase & Tailwind CSS ·{" "}
          <span className="text-violet-400">LinkTrack</span>
        </p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Link2,
    title: "Smart Short Links",
    desc: "Generate custom slugs or let us auto-create them. Attach UTM parameters for campaign tracking.",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    desc: "Track clicks by platform, device, country, and time. Visualize trends with beautiful charts.",
  },
  {
    icon: Globe,
    title: "Country Detection",
    desc: "See exactly where in the world your audience is clicking from with IP-based geolocation.",
  },
  {
    icon: Smartphone,
    title: "Device Breakdown",
    desc: "Understand your mobile vs desktop split to optimize your content strategy.",
  },
  {
    icon: Zap,
    title: "Instant Redirects",
    desc: "302 redirects are processed server-side in milliseconds. No JS injection, no iframes.",
  },
  {
    icon: Shield,
    title: "Safe & Compliant",
    desc: "No scripts injected into destinations. Works safely with YouTube, Instagram, Amazon and more.",
  },
];

const perks = [
  "Unlimited tracking links",
  "Click analytics dashboard",
  "Platform & device breakdown",
  "Country geolocation",
  "UTM parameter support",
  "Custom slugs",
  "Protected dashboard",
  "Free Supabase + Vercel hosting",
];
