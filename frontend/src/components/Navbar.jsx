import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, Menu, X, Moon, Sun, Sparkles, User, Package, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";
import SearchModal from "./SearchModal";
import AIAssistantPanel from "./AIAssistantPanel";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
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

  useEffect(() => {
    const syncAuthState = () => {
      const storedUser = localStorage.getItem("user");
      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("authChange", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("authChange", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsProfileMenuOpen(false);
    window.dispatchEvent(new Event("authChange"));
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navLinks = ["Home", "Products", "Categories"];

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              ShopSense <span className="text-indigo-600">AI</span>
            </span>

          <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link === "Products" ? (
                  <Link
                    key={link}
                    to="/products"
                    className="relative text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link}
                  </Link>
                ) : (
                  <a
                    key={link}
                    href="#"
                    className="relative text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link}
                  </a>
                )
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setIsAssistantOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <Sparkles size={16} />
                AI Assistant
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search products"
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <Search size={20} />
              </button>

              <Link
                to="/wishlist"
                aria-label={`Wishlist, ${wishlistItems.length} items`}
                className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all duration-200"
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
                aria-label="Cart"
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <ShoppingCart size={20} />
              </Link>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all duration-200 overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDarkMode ? "sun" : "moon"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200"
                  >
                    <User size={16} />
                    Hello, {currentUser.name?.split(" ")[0]}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden"
                      >
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            navigate("/profile");
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <User size={16} />
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            navigate("/orders");
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <Package size={16} />
                          My Orders
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200"
                >
                  Login
                </Link>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
                {navLinks.map((link) =>
                  link === "Products" ? (
                    <Link
                      key={link}
                      to="/products"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  ) : (
                    <a
                      key={link}
                      href="#"
                      className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  )
                )}

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAssistantOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all duration-200"
                >
                  <Sparkles size={16} />
                  AI Assistant
                </button>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    aria-label="Search products"
                    className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                  >
                    <Search size={20} />
                  </button>
                  <Link
                    to="/wishlist"
                    aria-label={`Wishlist, ${wishlistItems.length} items`}
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
                    aria-label="Cart"
                    className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                  >
                    <ShoppingCart size={20} />
                  </Link>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                    className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>

                {currentUser ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Hello, {currentUser.name?.split(" ")[0]}
                    </span>
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate("/orders")}
                      className="w-full text-left px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-sm font-medium text-red-600 dark:text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="w-full block text-center px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AIAssistantPanel isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </>
  );
}

export default Navbar;