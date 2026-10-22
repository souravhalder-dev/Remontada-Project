"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useItems } from "@/context/ItemContext";
import ItemCard from "@/components/ItemCard";
import { CATEGORIES } from "@/lib/initialData";
import {
  Search,
  SlidersHorizontal,
  PlusCircle,
  RotateCcw,
  PackageX,
} from "lucide-react";

export default function ItemsPage() {
  const { items, resetToDefaults } = useItems();

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceBracket, setPriceBracket] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filter & Sort calculation
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Search query filter
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.shortDescription.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCat && !matchTags) {
            return false;
          }
        }

        // Category filter (Field 1)
        if (selectedCategory !== "All" && item.category !== selectedCategory) {
          return false;
        }

        // Price bracket filter (Field 2)
        if (priceBracket === "under100" && item.price >= 100) return false;
        if (priceBracket === "100to300" && (item.price < 100 || item.price > 300)) return false;
        if (priceBracket === "over300" && item.price <= 300) return false;

        // Rating filter (Field 3)
        if (minRating > 0 && item.rating < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [items, searchQuery, selectedCategory, priceBracket, minRating, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceBracket("all");
    setMinRating(0);
    setSortBy("featured");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Workspace Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Browse All Products
          </h1>
          <p className="text-sm text-zinc-400 mt-1.5 max-w-xl">
            Explore curated mechanical keyboards, sound isolators, ergonomic standing workstations, and accessories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/items/add"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Control Bar: Search and Mobile Filter Toggle */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full lg:flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by title, category, feature, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Category Tabs (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto max-w-full pb-0.5">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white font-semibold shadow-sm"
                    : "bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="w-full lg:w-auto flex items-center gap-2 justify-between lg:justify-end">
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <span className="text-xs text-zinc-400 whitespace-nowrap hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFiltersMobile((prev) => !prev)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-300 hover:text-white"
            >
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Extended Filter Controls (Category, Price Bracket, Minimum Rating) */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-4 border-t border-zinc-800/80 ${
            showFiltersMobile ? "block" : "hidden lg:grid"
          }`}
        >
          {/* Field 1: Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Field 2: Price Bracket Filter */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
              Price Range
            </label>
            <select
              value={priceBracket}
              onChange={(e) => setPriceBracket(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under100">Under $100</option>
              <option value="100to300">$100 - $300</option>
              <option value="over300">Over $300</option>
            </select>
          </div>

          {/* Field 3: Minimum Rating Filter */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Minimum Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5 ★ & above</option>
                <option value={4.8}>4.8 ★ & above</option>
              </select>
            </div>

            <button
              onClick={resetAllFilters}
              title="Reset all filters"
              className="px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count & Active Tags */}
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-6">
        <p>
          Showing <span className="text-white font-semibold">{filteredItems.length}</span> of{" "}
          <span className="text-zinc-200">{items.length}</span> total products
        </p>
        {(selectedCategory !== "All" || priceBracket !== "all" || minRating > 0 || searchQuery) && (
          <button
            onClick={resetAllFilters}
            className="text-indigo-400 hover:text-indigo-300 font-medium underline cursor-pointer"
          >
            Clear active filters
          </button>
        )}
      </div>

      {/* Grid Layout (Responsive: 1 col mobile, 2 col tablet, 3-4 col desktop) */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col items-center max-w-md mx-auto my-12">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 text-zinc-400 flex items-center justify-center mb-4">
            <PackageX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 mb-6">
            We couldn&apos;t find any products matching your active search and filter criteria.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-all"
            >
              Clear Filters
            </button>
            {items.length === 0 && (
              <button
                onClick={resetToDefaults}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer transition-all"
              >
                Restore Sample Catalog
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
