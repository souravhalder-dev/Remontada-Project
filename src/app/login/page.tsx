"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import {
  Layers,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get("redirect") || "/";

  const { loginWithEmail, loginWithGoogle, loginAsDemo, isFirebaseReady } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      showToast("Welcome back! Signed in successfully.", "success");
      router.push(redirectPath);
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      console.error("Login error:", err);
      let message = "Invalid email or password. Please try again.";
      if (error?.code === "auth/user-not-found" || error?.code === "auth/invalid-credential") {
        message = "No account found with this email or incorrect credentials.";
      } else if (error?.code === "auth/wrong-password") {
        message = "Incorrect password. Please try again.";
      } else if (error?.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Please reset or try again later.";
      } else if (error?.message) {
        message = error.message;
      }
      setErrorMsg(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      await loginWithGoogle();
      showToast("Signed in with Google successfully!", "success");
      router.push(redirectPath);
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      console.error("Google login error:", err);
      let message = "Google Sign-In was cancelled or failed.";
      if (error?.code === "auth/popup-closed-by-user") {
        message = "Sign-in popup was closed before completion.";
      } else if (!isFirebaseReady) {
        message = "Firebase configuration is pending in .env.local. Try Quick Demo Login below!";
      }
      setErrorMsg(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    showToast("Signed in with Demo Reviewer Account!", "success");
    router.push(redirectPath);
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl relative">
      {/* Brand logo header */}
      <div className="flex flex-col items-center text-center mb-8">
        <Link href="/" className="flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 text-white" />
          </div>
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">Sign In to Remontada</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Access your catalog management & protected actions
        </p>
      </div>

      {/* Reviewer / Demo Quick Access Banner */}
      <div className="mb-6 p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <div className="text-xs">
            <p className="font-semibold text-indigo-200">Evaluation Quick-Pass</p>
            <p className="text-indigo-400/80 text-[11px]">Instant 1-click test login</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-all cursor-pointer whitespace-nowrap"
        >
          Demo Sign-In
        </button>
      </div>

      {/* Error alert if any */}
      {errorMsg && (
        <div className="mb-6 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-sm font-semibold text-zinc-200 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-900 px-3 text-zinc-400">Or with Email</span>
        </div>
      </div>

      {/* Email & Password Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@remontada.io"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In with Email</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Register */}
      <div className="mt-6 text-center text-xs text-zinc-400">
        <span>Don&apos;t have an account yet? </span>
        <Link
          href={`/register${redirectPath !== "/" ? `?redirect=${redirectPath}` : ""}`}
          className="font-semibold text-indigo-400 hover:text-indigo-300 underline"
        >
          Create one now
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
