import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Star, Heart, ShoppingCart, Minus, Plus, Check, X } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isInWishlist(product.id);

  const {
    title,
    brand,
    category,
    price,
    originalPrice,
    discountPercent,
    rating,
    reviewCount,
    description,
    features,
    specifications,
    inStock,
  } = product;

  const handleAddToCart = async () => {
    try {
      await addToCart(product, quantity);
      toast.success("Added to Cart");
    } catch (error) {
      const message = error.response?.data?.message || "Please log in to add items to your cart";
      toast.error(message);
    }
  };

  return (
    <div>
      <span className="text-sm font-medium text-[#6D5DF6]">{category}</span>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{title}</h1>
      {brand && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">by {brand}</p>}

      <div className="mt-3 flex items-center gap-2">
        <Star size={18} className="fill-yellow-400 text-yellow-400" />
        <span className="text-gray-700 dark:text-gray-300 font-medium">{rating}</span>
        <span className="text-gray-400 dark:text-gray-500 text-sm">({reviewCount} reviews)</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{price}</span>
        {originalPrice > price && (
          <>
            <span className="text-lg text-gray-400 dark:text-gray-500 line-through">₹{originalPrice}</span>
            <span className="px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      <p className="mt-5 text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>

      {features?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Key Features</h3>
          <ul className="mt-3 space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check size={16} className="text-[#6D5DF6] shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {specifications && Object.keys(specifications).length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Technical Specifications</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{key}</span>
                <span className="text-gray-900 dark:text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-2">
        {inStock ? (
          <>
            <Check size={16} className="text-green-500 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">In Stock</span>
          </>
        ) : (
          <>
            <X size={16} className="text-red-500 dark:text-red-400" />
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Out of Stock</span>
          </>
        )}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</span>
        <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-gray-500 dark:text-gray-400 hover:text-[#6D5DF6] transition-colors duration-200"
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center font-medium text-gray-900 dark:text-white">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-gray-500 dark:text-gray-400 hover:text-[#6D5DF6] transition-colors duration-200"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        <motion.button
          onClick={() => toggleWishlist(product)}
          whileTap={{ scale: 0.9 }}
          animate={wishlisted ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-all duration-200"
        >
          <Heart size={18} className={wishlisted ? "fill-[#6D5DF6] text-[#6D5DF6]" : ""} />
          Wishlist
        </motion.button>
      </div>
    </div>
  );
}

export default ProductInfo;