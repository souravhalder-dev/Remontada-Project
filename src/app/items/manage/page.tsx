"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useItems } from "@/context/ItemContext";
import { useToast } from "@/context/ToastContext";
import { Item } from "@/lib/types";
import {
  Settings,
  PlusCircle,
  Eye,
  Trash2,
  Search,
  RotateCcw,
  AlertTriangle,
  PackageOpen,
  LayoutGrid,
  List,
  Star,
} from "lucide-react";

function ManageItemsContent() {
  const { items, deleteItem, resetToDefaults } = useItems();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  const confirmDelete = () => {
    if (!itemToDelete) return;
    deleteItem(itemToDelete.id);
    showToast(`Removed "${itemToDelete.title}" from catalog.`, "info");
    setItemToDelete(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Product Inventory Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Manage Catalog Products
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            View, audit, inspect details, and remove products from the active workspace catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              resetToDefaults();
              showToast("Catalog reset to initial sample items.", "info");
            }}
            title="Reset catalog items to original sample data"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-zinc-400" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <Link
            href="/items/add"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Control bar: search + view mode toggle */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search manage table by title, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-zinc-400">
            Total: <strong className="text-white">{filteredItems.length}</strong> items
          </span>

          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Content: Table or Grid */}
      {filteredItems.length > 0 ? (
        viewMode === "table" ? (
          /* Responsive Table */
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950/80 text-[11px] uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th scope="col" className="px-5 py-3.5">
                    Product
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Category
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Price
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Stock
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Rating
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-zinc-850/50 transition-colors group"
                  >
                    {/* Product Info */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-zinc-950 flex-shrink-0 border border-zinc-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="max-w-xs sm:max-w-sm">
                          <p className="font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-zinc-400 truncate mt-0.5">
                            {item.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-950 border border-zinc-800 text-zinc-300">
                        {item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 whitespace-nowrap font-bold text-white">
                      ${item.price.toFixed(2)}
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-4 whitespace-nowrap text-xs">
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {item.stock} in stock
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-zinc-300">
                      <div className="flex items-center gap-1 text-amber-300 font-medium">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                    </td>

                    {/* Actions: View & Delete */}
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/items/${item.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-950 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
                          title="View Product Page"
                        >
                          <Eye className="w-3.5 h-3.5 text-indigo-400" />
                          <span>View</span>
                        </Link>

                        <button
                          onClick={() => setItemToDelete(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/30 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 hover:border-rose-700 transition-all cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid Card View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-14 rounded-xl overflow-hidden bg-zinc-950 flex-shrink-0 border border-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] uppercase font-semibold text-indigo-400">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-white text-sm truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="font-bold text-base text-white">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/items/${item.id}`}
                      className="p-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-indigo-400" />
                    </Link>
                    <button
                      onClick={() => setItemToDelete(item)}
                      className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4 text-rose-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col items-center max-w-md mx-auto my-12">
          <PackageOpen className="w-10 h-10 text-zinc-400 mb-3" />
          <h3 className="text-lg font-bold text-white">No items found</h3>
          <p className="text-xs text-zinc-400 mt-1 mb-6">
            All items may have been deleted or do not match your search query.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetToDefaults();
                showToast("Restored initial catalog data.", "success");
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
            >
              Restore Sample Catalog
            </button>
            <Link
              href="/items/add"
              className="px-4 py-2 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
            >
              Add New Product
            </Link>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-400 flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Confirm Product Deletion</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Are you sure you want to delete{" "}
                  <strong className="text-white">“{itemToDelete.title}”</strong>? This action will remove it from the catalog immediately.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <ManageItemsContent />
    </ProtectedRoute>
  );
}
