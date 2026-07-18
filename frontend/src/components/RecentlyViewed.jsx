import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchProducts } from "../services/productService";
import { getRecentlyViewedIds } from "../utils/recentlyViewed";
import ProductCard from "./ProductCard";

function RecentlyViewed() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const ids = getRecentlyViewedIds();
    if (ids.length === 0) return;

    const load = async () => {
      try {
        const allProducts = await fetchProducts();
        const ordered = ids
          .map((id) => allProducts.find((p) => p.id === id))
          .filter(Boolean);
        setProducts(ordered);
      } catch (error) {
        // Silently skip — this is a nice-to-have section, not critical
      }
    };

    load();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Recently Viewed
        </motion.h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentlyViewed;