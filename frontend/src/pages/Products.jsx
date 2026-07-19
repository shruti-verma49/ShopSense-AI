import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PackageX, RefreshCw, Search, X } from "lucide-react";
import toast from "react-hot-toast";
import { fetchProducts } from "../services/productService";
import { searchProducts } from "../utils/searchProducts";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import ProductSkeleton from "../components/ProductSkeleton";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = searchQuery.trim() ? searchProducts(products, searchQuery) : [...products];

    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (selectedPriceRange === "under-25000") {
      result = result.filter((product) => product.price < 25000);
    } else if (selectedPriceRange === "25000-75000") {
      result = result.filter((product) => product.price >= 25000 && product.price <= 75000);
    } else if (selectedPriceRange === "above-75000") {
      result = result.filter((product) => product.price > 75000);
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
  }, [products, searchQuery, selectedCategory, selectedPriceRange, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("all");
    setSortBy("featured");
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-[70vh] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {selectedCategory !== "All" ? selectedCategory : "All Products"}
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {isLoading
            ? "Loading products..."
            : `${filteredAndSortedProducts.length} product${filteredAndSortedProducts.length !== 1 ? "s" : ""} found`}
        </p>

        <div className="mt-6 relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#6D5DF6]"
          />
        </div>

        {selectedCategory !== "All" && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D5DF6]/10 text-[#6D5DF6] text-sm font-medium">
            {selectedCategory}
            <button onClick={() => handleCategoryChange("All")} aria-label="Clear category filter">
              <X size={14} />
            </button>
          </div>
        )}

        <div className="mt-6">
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-16 flex flex-col items-center text-center">
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-16 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <PackageX size={32} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">No Products Found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">
              Try adjusting your filters or search to see more products.
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
    </div>
  );
}

export default Products;