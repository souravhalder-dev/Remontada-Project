import React from "react";
import Link from "next/link";
import { Layers, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-md">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Remontada<span className="text-indigo-400">.</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Curated precision workspace essentials and ergonomic innovations designed for high-performing creators and engineers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Catalog & Gear
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/items" className="hover:text-white transition-colors">
                  Studio Audio
                </Link>
              </li>
              <li>
                <Link href="/items" className="hover:text-white transition-colors">
                  Mechanical Keyboards
                </Link>
              </li>
              <li>
                <Link href="/items" className="hover:text-white transition-colors">
                  Ergonomic Standing Desks
                </Link>
              </li>
              <li>
                <Link href="/items" className="hover:text-white transition-colors">
                  5K Ultrawide Displays
                </Link>
              </li>
              <li>
                <Link href="/items" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Platform & Account
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/items/add" className="hover:text-white transition-colors">
                  Add New Product
                </Link>
              </li>
              <li>
                <Link href="/items/manage" className="hover:text-white transition-colors">
                  Manage Catalog
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Firebase Authentication
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Remontada
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Architecture & Tech
            </h4>
            <div className="text-sm space-y-2 text-zinc-400">
              <p>Next.js 16 (App Router)</p>
              <p>TypeScript & Tailwind CSS</p>
              <p>Firebase Authentication</p>
              <p className="text-xs text-zinc-400">
                Crafted for assessment demonstration with stateful persistence.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} Remontada Workspace Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 text-zinc-400">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the modern workspace.
          </p>
        </div>
      </div>
    </footer>
  );
}
