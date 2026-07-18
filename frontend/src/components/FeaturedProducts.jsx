import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PackageX, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { fetchProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import ProductSkeleton from "./ProductSkeleton";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadProducts = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      setHasError(true);
      toast.error("Could not load products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (selectedPriceRange === "under-1000") {
      result = result.filter((product) => product.price < 1000);
    } else if (selectedPriceRange === "1000-3000") {
      result = result.filter((product) => product.price >= 1000 && product.price <= 3000);
    } else if (selectedPriceRange === "above-3000") {
      result = result.filter((product) => product.price > 3000);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "discount") {
      result.sort((a, b) => b.discountPercent - a.discountPercent);
    }

    return result;
  }, [products, selectedCategory, selectedPriceRange, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("all");
    setSortBy("featured");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            AI Recommended Products
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Personalized picks based on trending items and what shoppers like you are loving right now.
          </p>
        </motion.div>

        <div className="mt-10">
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            onPriceRangeChange={setSelectedPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : hasError ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-16 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900/40 flex items-center justify-center">
              <PackageX size={32} className="text-red-400" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Something went wrong</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">
              We couldn't load products right now. Please check your connection and try again.
            </p>
            <button
              onClick={loadProducts}
              className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </motion.div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-16 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <PackageX size={32} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">No Products Found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">
              Try adjusting your filters to see more products.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-6 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.03 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;