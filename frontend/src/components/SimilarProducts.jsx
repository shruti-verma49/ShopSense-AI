import { Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";

function SimilarProducts({ products }) {
  if (products.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="flex items-center gap-2">
        <Sparkles size={20} className="text-[#6D5DF6]" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You May Also Like</h2>
      </div>
      <p className="mt-2 text-gray-500 dark:text-gray-400">AI-curated picks based on this product's category.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default SimilarProducts;