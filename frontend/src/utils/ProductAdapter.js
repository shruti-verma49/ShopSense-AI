import {
  Laptop,
  Shirt,
  Footprints,
  Home,
  Palette,
  BookOpen,
  Gamepad2,
  Watch,
  Package,
  Smartphone,
  Headphones,
  Camera,
  Tablet,
} from "lucide-react";

const categoryIconMap = {
  Electronics: Laptop,
  Fashion: Shirt,
  Footwear: Footprints,
  "Home & Living": Home,
  Beauty: Palette,
  Books: BookOpen,
  Gaming: Gamepad2,
  Accessories: Watch,
  Smartphones: Smartphone,
  Laptops: Laptop,
  Headphones: Headphones,
  "Smart Watches": Watch,
  "Gaming Accessories": Gamepad2,
  Cameras: Camera,
  Tablets: Tablet,
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
    description: product.description || "",
    longDescription: product.longDescription || product.description || "",
    features: product.features || [],
    specifications: product.specifications || {},
    inStock: product.stock > 0,
  };
}