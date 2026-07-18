import { Laptop, Shirt, Footprints, Home, Palette, BookOpen, Gamepad2, Watch, Package } from "lucide-react";

const categoryIconMap = {
  Electronics: Laptop,
  Fashion: Shirt,
  Footwear: Footprints,
  "Home & Living": Home,
  Beauty: Palette,
  Books: BookOpen,
  Gaming: Gamepad2,
  Accessories: Watch,
};

export function getCategoryIcon(category) {
  return categoryIconMap[category] || Package;
}

export function normalizeProduct(product) {
  if (!product) return null;

  return {
    id: product._id,
    _id: product._id,
    title: product.title,
    category: product.category,
    price: product.price,
    originalPrice: product.price,
    discountPercent: 0,
    rating: product.rating || 0,
    reviewCount: 0,
    isAIPick: false,
    icon: getCategoryIcon(product.category),
    description: product.description || "",
    features: [],
    inStock: product.stock > 0,
  };
}