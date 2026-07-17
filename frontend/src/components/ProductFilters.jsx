import { ChevronDown } from "lucide-react";

const categories = ["All", "Electronics", "Footwear", "Fashion", "Accessories"];

const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under ₹1000", value: "under-1000" },
  { label: "₹1000–₹3000", value: "1000-3000" },
  { label: "Above ₹3000", value: "above-3000" },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Discount", value: "discount" },
];

function ProductFilters({
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
              selectedCategory === category
                ? "bg-[#6D5DF6] border-[#6D5DF6] text-white"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#6D5DF6] hover:text-[#6D5DF6]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={selectedPriceRange}
            onChange={(e) => onPriceRangeChange(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 cursor-pointer hover:border-[#6D5DF6] transition-all duration-200 outline-none"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 cursor-pointer hover:border-[#6D5DF6] transition-all duration-200 outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;