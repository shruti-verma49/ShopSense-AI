import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import ProfileLayout from "../../components/profile/ProfileLayout";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

function WishlistPreview() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = async (product) => {
    try {
      await addToCart(product);
      toggleWishlist(product);
      toast.success("Moved to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Please log in to add items to your cart");
    }
  };

  return (
    <ProfileLayout>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wishlist</h1>
        <Link to="/wishlist" className="text-sm text-[#6D5DF6] font-medium hover:underline">
          View Full Wishlist
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <Heart size={32} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Your wishlist is empty</h2>
          </div>
        ) : (
          wishlistItems.slice(0, 6).map((product) => {
            const Icon = product.icon;
            return (
              <div key={product.id} className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF] flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{product.title}</h3>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">₹{product.price}</p>
                </div>
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#6D5DF6] transition-colors duration-200"
                  title="Move to Cart"
                >
                  <ShoppingCart size={18} />
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-2 rounded-xl text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors duration-200"
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </ProfileLayout>
  );
}

export default WishlistPreview;