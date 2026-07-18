export function searchProducts(products, query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();

  return products.filter((product) => {
    const title = (product.title || "").toLowerCase();
    const category = (product.category || "").toLowerCase();
    const description = (product.description || "").toLowerCase();
    const brand = (product.brand || "").toLowerCase();

    return title.includes(q) || category.includes(q) || description.includes(q) || brand.includes(q);
  });
}