"use client";

import { useState, useEffect, useCallback } from "react";

export interface WishlistTour {
  _id: string;
  title: string;
  slug?: string | { current?: string };
  price: number;
  days?: string | number;
  image?: string;
  location?: string;
  badge?: string;
  reviewCount?: number;
  rating?: number;
  isAllInclusive?: boolean;
}

const STORAGE_KEY = "wishlist";
const EVENT_KEY = "wishlistUpdated";

function readStorage(): WishlistTour[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: WishlistTour[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(EVENT_KEY));
    window.dispatchEvent(new Event("storage"));
  } catch {}
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistTour[]>([]);

  const sync = useCallback(() => setWishlist(readStorage()), []);

  useEffect(() => {
    sync();
    window.addEventListener(EVENT_KEY, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_KEY, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  const isWishlisted = useCallback(
    (id: string) => wishlist.some((t) => t._id === id),
    [wishlist]
  );

  const toggle = useCallback((tour: WishlistTour) => {
    const current = readStorage();
    const exists = current.some((t) => t._id === tour._id);
    const updated = exists
      ? current.filter((t) => t._id !== tour._id)
      : [...current, tour];
    writeStorage(updated);
    setWishlist(updated);
  }, []);

  const remove = useCallback((id: string) => {
    const updated = readStorage().filter((t) => t._id !== id);
    writeStorage(updated);
    setWishlist(updated);
  }, []);

  const clear = useCallback(() => {
    writeStorage([]);
    setWishlist([]);
  }, []);

  return { wishlist, count: wishlist.length, isWishlisted, toggle, remove, clear };
}