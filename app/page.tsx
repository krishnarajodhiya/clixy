import Link from "next/link";
import {
  Link2,
  BarChart3,
  Globe,
  Smartphone,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  MousePointerClick,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-20">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
              <Link2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-base font-semibold tracking-tight text-gray-900">
              Clixy
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100 mb-7">
          <Zap className="w-3 h-3" />
          Free to start — no credit card
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight text-gray-900 mb-5">
          Smart link tracking
          <br />
          for influencers
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Create short tracking links. Know exactly where your clicks come from —
          platform, device, country — and act on it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            Start tracking free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg font-medium text-sm transition-colors"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Everything you need, nothing you don't
          </h2>
          <p className="text-gray-500 text-sm">
            Built for influencers working across multiple platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card card-hover p-5 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <f.icon className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="border border-gray-200 rounded-2xl p-10 text-center bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Start for free today
          </h2>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            Full analytics on every click. Deployed on Supabase and Vercel.
            No cost on the starter plan.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 max-w-xl mx-auto text-left">
            {perks.map((p) => (
              <div key={p} className="flex items-center gap-1.5 text-xs text-gray-600">
                <CheckCircle className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                {p}
              </div>
            ))}
          </div>

          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            Create free account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
              <Link2 className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="font-medium text-gray-500">Clixy</span>
          </div>
          <span>Built with Next.js + Supabase</span>
        </div>
      </footer>
    </div>
  );
}

const stats = [
  { value: "< 1ms", label: "Redirect latency" },
  { value: "9+", label: "Platform detections" },
  { value: "100%", label: "Free to start" },
  { value: "0", label: "Scripts injected" },
];

const features = [
  {
    icon: Link2,
    title: "Short tracking links",
    desc: "Custom slugs or auto-generated. Clean URLs that don't expose your destination.",
  },
  {
    icon: BarChart3,
    title: "Click analytics",
    desc: "Platform, device, country breakdown on every click. Real data, not estimates.",
  },
  {
    icon: Globe,
    title: "Country detection",
    desc: "See where in the world your audience is. Powered by Vercel edge headers.",
  },
  {
    icon: Smartphone,
    title: "Device breakdown",
    desc: "Mobile vs desktop split so you know how your audience consumes content.",
  },
  {
    icon: Zap,
    title: "302 redirects",
    desc: "Pure server-side redirects. No iframes, no injected scripts, fully compliant.",
  },
  {
    icon: Shield,
    title: "Works everywhere",
    desc: "YouTube, Instagram, Amazon, TikTok. No platform will block your links.",
  },
];

const perks = [
  "Unlimited links",
  "Click analytics",
  "Country data",
  "Custom slugs",
  "UTM support",
  "Device split",
  "Auth protected",
  "Free hosting",
];
