import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart, Sparkles } from "lucide-react";

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { id, title, category, price, originalPrice, discountPercent, rating, reviewCount, isAIPick, icon: Icon } = product;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Cart logic will be wired up once CartContext exists
  };

  return (
    <Link
      to={`/product/${id}`}
      className="group block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
    >
      <div className="relative h-44 bg-gradient-to-br from-[#6D5DF6]/10 to-[#5B8DEF]/10 flex items-center justify-center">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF] flex items-center justify-center">
          <Icon size={28} className="text-white" />
        </div>

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

        <button
          onClick={handleWishlistClick}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-200"
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-[#6D5DF6] text-[#6D5DF6]" : "text-gray-400"}
          />
        </button>
      </div>

      <div className="p-5">
        <span className="text-xs font-medium text-gray-400">{category}</span>
        <h3 className="mt-1 text-base font-semibold text-gray-900 truncate">{title}</h3>

        <div className="mt-2 flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{rating}</span>
          <span className="text-xs text-gray-400">({reviewCount})</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>
          {originalPrice > price && (
            <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>
          )}
        </div>

        <button
          onClick={handleAddToCartClick}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;