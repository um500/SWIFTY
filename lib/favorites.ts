// lib/favorites.ts

const STORAGE_KEY = "favorites";

// ✅ GET ALL FAVORITES
export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// ✅ SAVE FAVORITES
export const saveFavorites = (favorites: string[]) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

// ✅ TOGGLE FAVORITE
export const toggleFavorite = (id: string): string[] => {
  const current = getFavorites();

  let updated;

  if (current.includes(id)) {
    updated = current.filter((item) => item !== id);
  } else {
    updated = [...current, id];
  }

  saveFavorites(updated);
  return updated;
};

// ✅ CHECK FAVORITE
export const isFavorite = (id: string): boolean => {
  const current = getFavorites();
  return current.includes(id);
};