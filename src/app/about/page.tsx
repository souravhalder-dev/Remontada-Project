import React from "react";
import Link from "next/link";
import {
  Heart,
  Cpu,
  Sparkles,
  ArrowRight,
  Target,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-indigo-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About Remontada Workspace</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Crafting the Sanctum for Deep Work
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
          We design and curate workspace hardware engineered to eliminate physiological strain and acoustic distraction, allowing developers, creators, and researchers to achieve uninterrupted creative flow.
        </p>
      </div>

      {/* Hero Image Showcase */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 mb-16 shadow-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80"
          alt="Remontada studio workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-zinc-300">
          <span className="font-semibold text-white">Remontada Design Laboratory • Studio Nord</span>
          <span className="text-zinc-400">Precision manufacturing meets ergonomic science</span>
        </div>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Our Origin Story
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Born from frustration with cheap, disposable desk gear.
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            In 2024, our team of former software architects and industrial designers found themselves repeatedly replacing flimsy monitor arms, plasticky keyboards that developed switch chatter, and desk surfaces that warped under humidity.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            We decided to create Remontada: a dedicated curation and manufacturing collective dedicated strictly to products made with solid CNC aluminum, sustainably harvested American hardwoods, calibrated acoustic dampening, and open schematics.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <Target className="w-6 h-6 text-indigo-400 mb-3" />
            <h3 className="font-bold text-2xl text-white">99.8%</h3>
            <p className="text-xs text-zinc-400 mt-1">First-pass acoustic & QA tolerance rating</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <Users className="w-6 h-6 text-violet-400 mb-3" />
            <h3 className="font-bold text-2xl text-white">15,000+</h3>
            <p className="text-xs text-zinc-400 mt-1">Engineers and creators across 40 countries</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <Cpu className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-bold text-2xl text-white">100%</h3>
            <p className="text-xs text-zinc-400 mt-1">Tested with sub-millisecond custom firmware</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <Heart className="w-6 h-6 text-rose-400 mb-3" />
            <h3 className="font-bold text-2xl text-white">3-Year</h3>
            <p className="text-xs text-zinc-400 mt-1">Concierge advance replacement pledge</p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div id="values" className="space-y-8 mb-16">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Foundational Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Principles We Will Never Compromise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-semibold text-lg text-white">Honest Materials</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We reject imitation finishes, faux leather that peels within a year, and disguised hollow plastics. We choose real oiled hardwoods, anodized aluminum, and unbleached organic felt.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-semibold text-lg text-white">Acoustic Balance</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every keystroke and mouse click produces sound frequencies that impact focus. We use custom silicone gaskets and multi-stage dampening foam to produce deep, pleasant acoustic signatures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-semibold text-lg text-white">Modular Longevity</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Right-to-repair is built in. Standard switch sockets, hot-swap components, non-proprietary USB-C interfaces, and freely accessible teardown guides ensure gear stays in service for decades.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Assessment Showcase Banner */}
      <div className="p-8 rounded-3xl bg-zinc-900/90 border border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Assessment Showcase
          </span>
          <h3 className="text-xl font-bold text-white">Experience the Remontada Catalog</h3>
          <p className="text-xs text-zinc-400 max-w-md">
            Sign in via Firebase or test demo access to add new custom workspace products, review specs, and manage items.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/items"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
