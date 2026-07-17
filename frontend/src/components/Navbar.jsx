import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart, Menu, X, Moon, Sun, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const navLinks = ["Home", "Products", "Categories"];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            ShopSense <span className="text-indigo-600">AI</span>
          </span>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              
               <a key={link}
                href="#"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 hover:scale-105 transition-all duration-200 shadow-sm">
              <Sparkles size={16} />
              AI Assistant
            </button>

            <button className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200">
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#6D5DF6] text-white text-[10px] font-semibold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
            >
              <ShoppingCart size={20} />
            </Link>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200">
              Login
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-gray-200/60 dark:border-gray-700/60 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  {link}
                </a>
              ))}

              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all duration-200">
                <Sparkles size={16} />
                AI Assistant
              </button>

              <div className="flex items-center gap-4 pt-2">
                <button className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200">
                  <Search size={20} />
                </button>
                <Link
                  to="/wishlist"
                  className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                >
                  <Heart size={20} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#6D5DF6] text-white text-[10px] font-semibold flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                >
                  <ShoppingCart size={20} />
                </Link>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              <button className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200">
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;