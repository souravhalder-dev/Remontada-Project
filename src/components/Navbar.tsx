"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import {
  Layers,
  ChevronDown,
  PlusCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Compass,
  Sparkles,
  Info,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenus = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    closeMenus();
    try {
      await logout();
      showToast("Signed out successfully", "info");
      router.push("/");
    } catch {
      showToast("Failed to sign out", "error");
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Layers },
    { name: "Catalog", href: "/items", icon: Compass },
    { name: "Features", href: "/#features", icon: Sparkles },
    { name: "About Us", href: "/about", icon: Info },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                Remontada<span className="text-indigo-400">.</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-zinc-400 -mt-1 font-medium">
                Workspace Gear
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (4+ routes) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenus}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-white bg-zinc-800/90 shadow-sm"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Auth Section Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-850 hover:border-zinc-700 transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-semibold text-xs overflow-hidden">
                    {user.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      (user.displayName?.[0] || user.email?.[0] || "U").toUpperCase()
                    )}
                  </div>
                  <div className="flex flex-col text-xs leading-snug">
                    <span className="font-semibold text-zinc-100 max-w-[120px] truncate">
                      {user.displayName || "Account"}
                    </span>
                    <span className="text-[11px] text-zinc-400 max-w-[120px] truncate">
                      {user.email}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 border-b border-zinc-800/80 mb-1 bg-zinc-950/40 rounded-xl">
                      <p className="text-xs font-semibold text-zinc-200">
                        {user.displayName || "Authenticated User"}
                      </p>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">{user.email}</p>
                      <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {user.isDemo ? "Demo User" : "Firebase Verified"}
                      </span>
                    </div>

                    <Link
                      href="/items/add"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-zinc-800/80 transition-colors"
                      onClick={closeMenus}
                    >
                      <PlusCircle className="w-4 h-4 text-emerald-400" />
                      <span>Add Product</span>
                    </Link>

                    <Link
                      href="/items/manage"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-200 hover:text-white hover:bg-zinc-800/80 transition-colors"
                      onClick={closeMenus}
                    >
                      <Settings className="w-4 h-4 text-indigo-400" />
                      <span>Manage Products</span>
                    </Link>

                    <div className="border-t border-zinc-800/80 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950/95 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const IconComp = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenus}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "text-white bg-zinc-800"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <IconComp className="w-4 h-4 text-zinc-400" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-zinc-800 pt-3">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="w-9 h-9 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs">
                    {user.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      (user.displayName?.[0] || user.email?.[0] || "U").toUpperCase()
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-white truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/items/add"
                  onClick={closeMenus}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-400 hover:bg-zinc-900 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Product</span>
                </Link>

                <Link
                  href="/items/manage"
                  onClick={closeMenus}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-indigo-400 hover:bg-zinc-900 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Manage Products</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
