import { useState } from "react";
import { Star, Heart, ShoppingCart, Minus, Plus, Check, X } from "lucide-react";

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { title, category, price, originalPrice, discountPercent, rating, reviewCount, description, features, inStock } = product;

  return (
    <div>
      <span className="text-sm font-medium text-[#6D5DF6]">{category}</span>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>

      <div className="mt-3 flex items-center gap-2">
        <Star size={18} className="fill-yellow-400 text-yellow-400" />
        <span className="text-gray-700 font-medium">{rating}</span>
        <span className="text-gray-400 text-sm">({reviewCount} reviews)</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">₹{price}</span>
        {originalPrice > price && (
          <>
            <span className="text-lg text-gray-400 line-through">₹{originalPrice}</span>
            <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      <p className="mt-5 text-gray-600 leading-relaxed">{description}</p>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-900">Key Features</h3>
        <ul className="mt-3 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={16} className="text-[#6D5DF6] shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {inStock ? (
          <>
            <Check size={16} className="text-green-500" />
            <span className="text-sm font-medium text-green-600">In Stock</span>
          </>
        ) : (
          <>
            <X size={16} className="text-red-500" />
            <span className="text-sm font-medium text-red-600">Out of Stock</span>
          </>
        )}
      </div>

      {/* Quantity selector */}
      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Quantity</span>
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-gray-500 hover:text-[#6D5DF6] transition-colors duration-200"
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center font-medium text-gray-900">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-gray-500 hover:text-[#6D5DF6] transition-colors duration-200"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          disabled={!inStock}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-all duration-200"
        >
          <Heart size={18} className={isWishlisted ? "fill-[#6D5DF6] text-[#6D5DF6]" : ""} />
          Wishlist
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;