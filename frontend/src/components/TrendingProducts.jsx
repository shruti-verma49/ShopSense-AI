import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { fetchProducts } from "../services/productService";
import ProductCard from "./ProductCard";

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function TrendingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => {});
  }, []);

  const trending = useMemo(() => shuffleArray(products).slice(0, 4), [products]);

  if (trending.length === 0) return null;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <TrendingUp size={24} className="text-[#6D5DF6]" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
        </motion.div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingProducts;