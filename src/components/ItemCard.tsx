"use client";

import React from "react";
import Link from "next/link";
import { Item } from "@/lib/types";
import { Star, ArrowRight } from "lucide-react";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="group flex flex-col justify-between h-full bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800/80 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 focus-within:ring-2 focus-within:ring-indigo-500">
      {/* Image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-zinc-950/80 backdrop-blur-md text-zinc-200 border border-zinc-800">
            {item.category}
          </span>
        </div>

        {/* Rating Pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md text-amber-300 border border-zinc-800 text-xs font-medium">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{item.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-semibold text-base sm:text-lg text-zinc-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {item.shortDescription}
          </p>
        </div>

        <div className="pt-5 mt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
              Price
            </span>
            <span className="text-lg font-bold text-white tracking-tight">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/items/${item.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all shadow-md shadow-indigo-600/20 group-hover:translate-x-0.5 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
