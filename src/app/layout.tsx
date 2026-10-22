import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ItemProvider } from "@/context/ItemContext";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remontada Workspace | Premium Gear & Tech Essentials",
  description:
    "Curated workspace essentials, ergonomic solutions, and high-performance developer gear built for modern professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
        <ToastProvider>
          <AuthProvider>
            <ItemProvider>
              <Navbar />
              <main className="flex-1 w-full flex flex-col">{children}</main>
              <Footer />
            </ItemProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
