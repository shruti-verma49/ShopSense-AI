export function getRecommendedProducts(currentProduct, allProducts, count = 4) {
  if (!currentProduct || !allProducts?.length) return [];

  const others = allProducts.filter((p) => p.id !== currentProduct.id);
  const picked = [];
  const pickedIds = new Set();

  const addFrom = (list) => {
    for (const product of list) {
      if (picked.length >= count) break;
      if (pickedIds.has(product.id)) continue;
      picked.push(product);
      pickedIds.add(product.id);
    }
  };

  const sameCategory = others.filter((p) => p.category === currentProduct.category);
  addFrom(sameCategory);

  if (picked.length < count) {
    const priceRange = currentProduct.price * 0.3;
    const similarPrice = [...others].sort(
      (a, b) => Math.abs(a.price - currentProduct.price) - Math.abs(b.price - currentProduct.price)
    );
    addFrom(similarPrice.filter((p) => Math.abs(p.price - currentProduct.price) <= priceRange));
  }

  if (picked.length < count) {
    const byRating = [...others].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    addFrom(byRating);
  }

  return picked.slice(0, count);
}