"use client";

import React, { createContext, useContext, useState } from "react";
import { Item } from "@/lib/types";
import { INITIAL_ITEMS } from "@/lib/initialData";

interface ItemContextType {
  items: Item[];
  loading: boolean;
  addItem: (item: Omit<Item, "id" | "createdAt">) => Item;
  deleteItem: (id: string) => void;
  getItem: (id: string) => Item | undefined;
  resetToDefaults: () => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

const STORAGE_KEY = "remontada_items_catalog";

function getStoredItems(): Item[] {
  if (typeof window === "undefined") {
    return INITIAL_ITEMS;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ITEMS));
  } catch (e) {
    console.error("Failed to read initial catalog from localStorage", e);
  }
  return INITIAL_ITEMS;
}

export function ItemProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>(() => getStoredItems());
  const [loading] = useState<boolean>(false);

  const saveItems = (updated: Item[]) => {
    setItems(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save items to storage", e);
    }
  };

  const addItem = (itemData: Omit<Item, "id" | "createdAt">): Item => {
    const newItem: Item = {
      ...itemData,
      id: "item-" + Date.now(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...items];
    saveItems(updated);
    return newItem;
  };

  const deleteItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    saveItems(updated);
  };

  const getItem = (id: string): Item | undefined => {
    return items.find((item) => item.id === id);
  };

  const resetToDefaults = () => {
    saveItems(INITIAL_ITEMS);
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        loading,
        addItem,
        deleteItem,
        getItem,
        resetToDefaults,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemProvider");
  }
  return context;
}
