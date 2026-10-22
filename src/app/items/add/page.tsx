"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useItems } from "@/context/ItemContext";
import { useToast } from "@/context/ToastContext";
import { CATEGORIES } from "@/lib/initialData";
import {
  PlusCircle,
  Image as ImageIcon,
  DollarSign,
  ArrowLeft,
  Loader2,
} from "lucide-react";

// Curated preset images for convenient reviewer testing
const PRESET_IMAGES = [
  {
    name: "Mechanical Keyboard",
    url: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Studio Headphones",
    url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ergonomic Desk",
    url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ultrawide Monitor",
    url: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Studio Microphone",
    url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Desk Lightbar",
    url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  },
];

function AddItemForm() {
  const router = useRouter();
  const { addItem } = useItems();
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[1] || "Audio");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("15");
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [specMaterial, setSpecMaterial] = useState("CNC Aluminum & Walnut");
  const [specWarranty, setSpecWarranty] = useState("2-Year Limited");
  const [specConnectivity, setSpecConnectivity] = useState("USB-C / Bluetooth 5.3");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim() || !fullDescription.trim() || !price) {
      showToast("Please fill in all required product fields.", "error");
      return;
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      showToast("Please enter a valid positive price.", "error");
      return;
    }

    setLoading(true);

    try {
      const created = addItem({
        title: title.trim(),
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        category,
        price: numPrice,
        stock: parseInt(stock, 10) || 10,
        imageUrl:
          imageUrl.trim() ||
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        rating: 5.0,
        reviewsCount: 1,
        featured: false,
        specifications: {
          "Primary Material": specMaterial,
          "Warranty Period": specWarranty,
          "Interface / Connectivity": specConnectivity,
          "Condition": "Brand New Factory Sealed",
        },
        tags: [category, "New Arrival", "Premium"],
      });

      showToast(`🎉 "${created.title}" successfully added to the catalog!`, "success");
      router.push(`/items/${created.id}`);
    } catch (e) {
      console.error(e);
      showToast("Failed to create product. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Top Bar */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/items")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
          Protected Administrative Route
        </span>
      </div>

      <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="mb-8 border-b border-zinc-800/80 pb-6">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <PlusCircle className="w-4 h-4" />
            <span>Product Catalog Creation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Add New Workspace Product
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Fill in the specifications below to publish a new piece of gear to the live catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Product Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Apex Horizon Carbon-Fiber Monitor Arm"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Category & Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Category <span className="text-rose-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Price (USD $) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="249.99"
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Inventory Stock Units
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="25"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Short Description (1-2 lines for catalog card) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="e.g. Dual-pivot gas spring monitor arm supporting up to 32-inch displays with integrated cable routing."
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Full Description (Detailed item overview) <span className="text-rose-400">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Provide a comprehensive breakdown of the item's build, ergonomic benefits, sound characteristics, and materials..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y"
            />
          </div>

          {/* Technical Specifications Sub-fields */}
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Technical Specifications & Attributes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Primary Material</label>
                <input
                  type="text"
                  value={specMaterial}
                  onChange={(e) => setSpecMaterial(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Warranty Term</label>
                <input
                  type="text"
                  value={specWarranty}
                  onChange={(e) => setSpecWarranty(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Connectivity / Ports</label>
                <input
                  type="text"
                  value={specConnectivity}
                  onChange={(e) => setSpecConnectivity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Image URL & Preset Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Product Image URL (Optional or Quick Pick)
            </label>

            <div className="relative">
              <ImageIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] text-zinc-400">Quick-Pick Sample Image:</p>
              <div className="flex flex-wrap gap-2">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                      imageUrl === preset.url
                        ? "bg-indigo-600 text-white font-semibold"
                        : "bg-zinc-950 hover:bg-zinc-800 text-zinc-400 border border-zinc-800"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Preview */}
            {imageUrl && (
              <div className="mt-3 flex items-center gap-4 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
                <div className="text-xs text-zinc-400">
                  <span className="text-zinc-200 font-medium">Image Preview Ready</span>
                  <p className="text-[11px] text-zinc-400 truncate max-w-sm">{imageUrl}</p>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/items")}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Adding Product...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <AddItemForm />
    </ProtectedRoute>
  );
}
