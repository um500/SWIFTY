// lib/favorites.ts

const STORAGE_KEY = "favorites";

// ✅ SAFE PARSE
const parseJSON = (value: string | null) => {
  try {
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

// ✅ GET ALL FAVORITES
export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  return parseJSON(localStorage.getItem(STORAGE_KEY));
};

// ✅ SAVE FAVORITES + 🔥 EVENT TRIGGER
export const saveFavorites = (favorites: string[]) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));

  // 🔥 IMPORTANT: notify all components
  window.dispatchEvent(new Event("favoritesUpdated"));
};

// ✅ TOGGLE FAVORITE
export const toggleFavorite = (id: string): string[] => {
  const current = getFavorites();

  let updated: string[];

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
  return getFavorites().includes(id);
};

// ✅ CLEAR ALL (optional future use)
export const clearFavorites = () => {
  saveFavorites([]);
};