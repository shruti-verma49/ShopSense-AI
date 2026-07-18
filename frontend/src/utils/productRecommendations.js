export function getRecommendedProducts(currentProduct, allProducts, count = 4) {
  if (!currentProduct || !allProducts?.length) return [];

  const candidates = allProducts.filter((p) => p.id !== currentProduct.id);

  const scored = candidates.map((product) => {
    let score = 0;

    if (product.category === currentProduct.category) {
      score += 3;
    }

    const priceDiff = Math.abs(product.price - currentProduct.price);
    const priceRange = currentProduct.price * 0.3;
    if (priceDiff <= priceRange) {
      score += 2;
    } else if (priceDiff <= priceRange * 2) {
      score += 1;
    }

    if (currentProduct.brand && product.brand && product.brand === currentProduct.brand) {
      score += 3;
    }

    return { product, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((item) => item.product);
}