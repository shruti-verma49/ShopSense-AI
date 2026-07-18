import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const uniqueItemCount = cartItems.length;
  const grandTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-[60vh] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
              <ShoppingCart size={32} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Your cart is empty</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">
              Looks like you haven't added anything yet. Start exploring to find something you'll love.
            </p>
            <Link
              to="/"
              className="mt-6 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-[60vh] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">My Cart</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {uniqueItemCount} unique product{uniqueItemCount > 1 ? "s" : ""} in your cart.
        </p>

        <div className="mt-10 grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF] flex items-center justify-center shrink-0">
                      <Icon size={26} className="text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{item.category}</span>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">{item.title}</h3>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">₹{item.price}</span>
                    </div>

                    <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl px-2 py-1 shrink-0">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-gray-500 dark:text-gray-400 hover:text-[#6D5DF6] transition-colors duration-200"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-sm font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="text-gray-500 dark:text-gray-400 hover:text-[#6D5DF6] transition-colors duration-200"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all duration-200 shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Unique Products</span>
                <span>{uniqueItemCount}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">Grand Total</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">₹{grandTotal}</span>
              </div>

              <Link
                to="/checkout"
                className="mt-6 block w-full text-center py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;