import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Wishlist</h1>
        <p className="mt-2 text-gray-500">
          {wishlistItems.length > 0
            ? `${wishlistItems.length} item${wishlistItems.length > 1 ? "s" : ""} saved for later.`
            : "Items you love, all in one place."}
        </p>

        {wishlistItems.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
              <Heart size={32} className="text-gray-300" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900">Your wishlist is empty</h2>
            <p className="mt-2 text-gray-500 max-w-sm">
              Tap the heart icon on any product to save it here for later.
            </p>
            <Link
              to="/"
              className="mt-6 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;