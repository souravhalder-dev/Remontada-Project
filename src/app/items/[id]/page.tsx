"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useItems } from "@/context/ItemContext";
import { useToast } from "@/context/ToastContext";
import ItemCard from "@/components/ItemCard";
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Share2,
  Heart,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { getItem, items } = useItems();
  const { showToast } = useToast();

  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const item = getItem(id);

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-zinc-400 text-sm mb-6">
            The item you are looking for does not exist or has been removed from the catalog.
          </p>
          <Link
            href="/items"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related items: Same category or other items, excluding current item
  const relatedItems = items
    .filter((i) => i.id !== item.id && (i.category === item.category || i.featured))
    .slice(0, 3);

  const handleOrderSimulation = () => {
    showToast(
      `🎉 Order simulation placed for ${quantity}x "${item.title}"! (Demo flow)`,
      "success"
    );
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showToast(
      !isWishlisted ? "Added to your saved wishlist" : "Removed from wishlist",
      "info"
    );
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!", "success");
    }
  };

  const formattedDate = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently added";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Button to Items Page */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/items")}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-950/80 backdrop-blur-md text-zinc-200 border border-zinc-800">
                {item.category}
              </span>
            </div>
            {item.featured && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600/90 backdrop-blur-md text-white border border-indigo-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Pick</span>
              </div>
            )}
          </div>

          {/* Value props beneath image */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center flex flex-col items-center">
              <Truck className="w-4 h-4 text-indigo-400 mb-1" />
              <span className="text-[11px] font-medium text-zinc-300">Free Express</span>
              <span className="text-[10px] text-zinc-400">Over $150</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center flex flex-col items-center">
              <RotateCcw className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-[11px] font-medium text-zinc-300">30-Day Trial</span>
              <span className="text-[10px] text-zinc-400">Hassle-Free</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-cyan-400 mb-1" />
              <span className="text-[11px] font-medium text-zinc-300">Official Warranty</span>
              <span className="text-[10px] text-zinc-400">Full Coverage</span>
            </div>
          </div>
        </div>

        {/* Right Column: Information, Specs & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Category & Date badge */}
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-indigo-400 uppercase font-semibold tracking-wider">
                  {item.category}
                </span>
                <span>•</span>
                <span>Catalog ID: #{item.id}</span>
              </div>
              <span>Added: {formattedDate}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {item.title}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300 font-semibold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{item.rating.toFixed(1)}</span>
                <span className="text-zinc-500 font-normal">
                  ({item.reviewsCount} reviews)
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>In Stock ({item.stock} units available)</span>
              </div>
            </div>

            {/* Price block */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-semibold text-zinc-400">Price</span>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  ${item.price.toFixed(2)}
                  <span className="text-xs font-normal text-zinc-400 ml-2">USD (Tax incl.)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 transition-colors ${
                    isWishlisted ? "text-rose-400 border-rose-500/30" : "text-zinc-400 hover:text-white"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-400" : ""}`} />
                </button>
              </div>
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Overview & Description
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {item.fullDescription}
              </p>
            </div>

            {/* Key Information / Specifications */}
            {item.specifications && Object.keys(item.specifications).length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(item.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 flex flex-col justify-center"
                    >
                      <span className="text-zinc-400 font-medium">{key}</span>
                      <span className="text-zinc-200 font-semibold mt-0.5">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900 text-zinc-400 border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-8 mt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 border border-zinc-800 rounded-xl bg-zinc-900 p-1 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-zinc-950 text-zinc-200 font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center cursor-pointer"
              >
                -
              </button>
              <span className="px-3 text-sm font-semibold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(item.stock, q + 1))}
                className="w-8 h-8 rounded-lg bg-zinc-950 text-zinc-200 font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              onClick={handleOrderSimulation}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Simulate Checkout (${(item.price * quantity).toFixed(2)})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      {relatedItems.length > 0 && (
        <section className="mt-20 pt-12 border-t border-zinc-900">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                You Might Also Like
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Related Workspace Essentials
              </h2>
            </div>
            <Link
              href="/items"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View All ({items.length})
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedItems.map((relItem) => (
              <ItemCard key={relItem.id} item={relItem} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
