import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { products } from "../constants/products";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Price range filter
    if (selectedPriceRange === "under-1000") {
      result = result.filter((product) => product.price < 1000);
    } else if (selectedPriceRange === "1000-3000") {
      result = result.filter((product) => product.price >= 1000 && product.price <= 3000);
    } else if (selectedPriceRange === "above-3000") {
      result = result.filter((product) => product.price > 3000);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "discount") {
      result.sort((a, b) => b.discountPercent - a.discountPercent);
    }
    // "featured" keeps the original order — no sort needed

    return result;
  }, [selectedCategory, selectedPriceRange, sortBy]);

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            AI Recommended Products
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
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

        {filteredAndSortedProducts.length === 0 ? (
          <div className="mt-16 text-center text-gray-400">
            No products match the selected filters.
          </div>
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