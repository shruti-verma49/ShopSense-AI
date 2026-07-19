import { Laptop, Shirt, Gamepad2, Headphones, Watch, Backpack, BookOpen, Package } from "lucide-react";

const categoryIconMap = {
  Electronics: Laptop,
  Fashion: Shirt,
  Gaming: Gamepad2,
  Audio: Headphones,
  Wearables: Watch,
  Accessories: Backpack,
  Books: BookOpen,
};

export function getCategoryIcon(category) {
  return categoryIconMap[category] || Package;
}

export function normalizeProduct(product) {
  if (!product) return null;

  const discountPercent = product.discountPercent || 0;
  const price = product.price;
  const originalPrice = discountPercent > 0 ? Math.round(price / (1 - discountPercent / 100)) : price;

  return {
    id: product._id,
    _id: product._id,
    title: product.title,
    brand: product.brand || "",
    category: product.category,
    price,
    originalPrice,
    discountPercent,
    rating: product.rating || 0,
    reviewCount: product.reviewCount || 0,
    isAIPick: !!product.featured,
    icon: getCategoryIcon(product.category),
    image: product.image || "",
    images: product.images || [],
    description: product.description || "",
    longDescription: product.longDescription || product.description || "",
    features: product.features || [],
    specifications: product.specifications || {},
    inStock: product.stock > 0,
  };
}