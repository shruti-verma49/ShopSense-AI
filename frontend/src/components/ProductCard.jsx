import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Heart, Star, ShoppingCart, Sparkles } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isInWishlist(product.id);

  const { id, title, category, price, originalPrice, discountPercent, rating, reviewCount, isAIPick, icon: Icon, inStock, image} = product;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCartClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product);
      toast.success("Added to Cart");
    } catch (error) {
      const message = error.response?.data?.message || "Please log in to add items to your cart";
      toast.error(message);
    }
  };

  return (
    <Link
      to={`/product/${id}`}
      aria-label={`View details for ${title}`}
      className="group block bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
     
     <div className="relative h-44 bg-gradient-to-br from-[#6D5DF6]/10 to-[#5B8DEF]/10 flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${!inStock ? "opacity-50" : ""}`}
          />
        ) : (
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${!inStock ? "opacity-50" : ""}`}>
            <Icon size={28} className="text-white" aria-hidden="true" />
          </div>
        )}

        {isAIPick && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#6D5DF6] text-white text-xs font-medium">
            <Sparkles size={12} />
            AI Pick
          </div>
        )}

        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
            -{discountPercent}%
          </div>
        )}

        {!inStock && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-gray-900/80 text-white text-xs font-medium">
            Out of Stock
          </div>
        )}

        <motion.button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
          whileTap={{ scale: 0.85 }}
          animate={wishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-200"
        >
          <Heart
            size={16}
            className={wishlisted ? "fill-[#6D5DF6] text-[#6D5DF6]" : "text-gray-400"}
          />
        </motion.button>
      </div>

      <div className="p-5">
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{category}</span>
        <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white truncate">{title}</h3>

        <div className="mt-2 flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" aria-hidden="true" />
          <span className="text-sm text-gray-600 dark:text-gray-300">{rating}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">({reviewCount})</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">₹{price}</span>
          {originalPrice > price && (
            <span className="text-sm text-gray-400 dark:text-gray-500 line-through">₹{originalPrice}</span>
          )}
        </div>

        <button
          onClick={handleAddToCartClick}
          disabled={!inStock}
          aria-label={`Add ${title} to cart`}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <ShoppingCart size={16} />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </Link>
  );
}

export default memo(ProductCard);