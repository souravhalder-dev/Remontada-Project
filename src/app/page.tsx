"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useItems } from "@/context/ItemContext";
import { useToast } from "@/context/ToastContext";
import ItemCard from "@/components/ItemCard";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Leaf,
  Sparkles,
  CheckCircle2,
  Send,
  Star,
  Award,
} from "lucide-react";

export default function HomePage() {
  const { items } = useItems();
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Take top 3 or 4 featured items
  const featuredItems = items.slice(0, 3);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    setSubscribed(true);
    showToast("🎉 Thank you for subscribing! Check your inbox for 10% off.", "success");
    setNewsletterEmail("");
  };

  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      {/* SECTION 2: HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 flex flex-col items-center text-center">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-cyan-500/10 blur-[130px] -z-10 pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-600/10 blur-[100px] -z-10 pointer-events-none" />

        {/* Hero badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-300 mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>The 2026 Remontada Workspace Collection</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
          Engineered for{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
            Flow & Precision
          </span>
          .
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:xl text-zinc-400 max-w-2xl leading-relaxed">
          Discover meticulously designed mechanical peripherals, ergonomic standing desks, studio-grade acoustics, and productivity tools crafted for architects, engineers, and creators.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/items"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800 transition-all text-sm sm:text-base"
          >
            <span>Our Philosophy</span>
          </Link>
        </div>

        {/* Hero social proof pills */}
        <div className="mt-14 pt-8 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full max-w-3xl">
          <div>
            <p className="text-2xl font-bold text-white tracking-tight">15,000+</p>
            <p className="text-xs text-zinc-400 font-medium">Workstations Equipped</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white tracking-tight">4.9 / 5.0</p>
            <p className="text-xs text-zinc-400 font-medium">Customer Rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white tracking-tight">30-Day</p>
            <p className="text-xs text-zinc-400 font-medium">Risk-Free Workspace Trial</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white tracking-tight">100%</p>
            <p className="text-xs text-zinc-400 font-medium">Sustainable Packaging</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: 4 RELEVANT SECTIONS */}

      {/* SECTION 3.1: CURATED FEATURED ITEMS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Curated Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Engineered Bestsellers
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-lg">
              Each piece is stress-tested, acoustically analyzed, and ergonomic certified for everyday deep work.
            </p>
          </div>
          <Link
            href="/items"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
          >
            <span>View All Products ({items.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* SECTION 3.2: WHY CHOOSE US (FEATURES GRID) */}
      <section id="features" className="w-full bg-zinc-900/30 border-y border-zinc-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Why Remontada
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
              The Architecture of Peak Productivity
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2">
              Designed from first principles to eradicate friction, reduce posture fatigue, and foster uninterrupted focus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-indigo-500/40 hover:bg-zinc-900 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Aviation-Grade Build</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Milled from solid 6063 CNC aluminum billets and sustainable walnut hardwood built to endure decades of rigorous work.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-indigo-500/40 hover:bg-zinc-900 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Latency-Free Wireless</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Sub-millisecond custom RF protocols ensure zero perceptible delay during programming, drafting, or competitive gaming.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-indigo-500/40 hover:bg-zinc-900 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Eco-Conscious Design</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                100% recyclable molded pulp packaging, modular components with available spare parts, and zero single-use plastics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-indigo-500/40 hover:bg-zinc-900 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white mb-2">3-Year Full Warranty</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Every purchase includes our direct concierge warranty with advance product replacement and live developer technical support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3.3: VERIFIED REVIEWS & TESTIMONIALS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
            Loved by Developers & Creators
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            See how teams at pioneering tech firms build their daily desk setup with Remontada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed italic">
                “The Apex 75% keyboard is without doubt the best typing instrument I have used in 12 years of software engineering. The tactile acoustic profile is pure satisfaction.”
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-zinc-800/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Sarah Lin"
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <h4 className="text-sm font-semibold text-white">Sarah Lin</h4>
                <p className="text-xs text-zinc-400">Staff Infrastructure Engineer</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed italic">
                “The Lumina Ergo standing desk combined with the HyperBeam screenbar transformed my late-night coding sessions. Zero eye strain and my posture has improved dramatically.”
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-zinc-800/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="David Chen"
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <h4 className="text-sm font-semibold text-white">David Chen</h4>
                <p className="text-xs text-zinc-400">Principal Product Designer</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed italic">
                “Fast shipping, flawless packaging, and the build quality exceeds studio hardware twice the price. The noise cancelling headphones isolate perfectly in open-plan offices.”
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-zinc-800/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                alt="Elena Rostova"
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <h4 className="text-sm font-semibold text-white">Elena Rostova</h4>
                <p className="text-xs text-zinc-400">Engineering Manager @ Fintech</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3.4: PROMOTIONAL BANNER & NEWSLETTER */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-950/80 via-zinc-900 to-violet-950/70 border border-indigo-900/50 p-8 sm:p-14 text-center flex flex-col items-center">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-500/20 blur-[90px] pointer-events-none rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-violet-500/20 blur-[90px] pointer-events-none rounded-full" />

          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            Exclusive Launch Privileges
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl">
            Upgrade Your Desk Setup with 10% Off Your First Order
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
            Join 15,000+ engineers receiving our monthly workspace architecture teardowns, mechanical keycap releases, and ergonomic tips.
          </p>

          {subscribed ? (
            <div className="mt-8 flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-sm font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>You are subscribed! Your welcome discount code has been sent.</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
            >
              <input
                type="email"
                placeholder="Enter your work email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="mt-6 flex items-center gap-6 text-xs text-zinc-400">
            <span>✓ No spam guarantee</span>
            <span>✓ One-click unsubscribe</span>
            <span>✓ Early access to limited drops</span>
          </div>
        </div>
      </section>
    </div>
  );
}
