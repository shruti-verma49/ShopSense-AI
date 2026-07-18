const STORAGE_KEY = "recentlyViewedProductIds";
const MAX_ITEMS = 8;

export function addRecentlyViewed(productId) {
  if (!productId) return;
  const existing = getRecentlyViewedIds();
  const updated = [productId, ...existing.filter((id) => id !== productId)].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getRecentlyViewedIds() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}