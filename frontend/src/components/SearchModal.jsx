import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { fetchProducts } from "../services/productService";
import { searchProducts } from "../utils/searchProducts";

function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !hasLoaded) {
      fetchProducts()
        .then((data) => {
          setProducts(data);
          setHasLoaded(true);
        })
        .catch(() => {});
    }
  }, [isOpen, hasLoaded]);

  const results = searchProducts(products, query).slice(0, 6);

  const handleSelect = (productId) => {
    setQuery("");
    onClose();
    navigate(`/product/${productId}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg z-[70] px-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700">
                <Search size={20} className="text-gray-400 shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0">
                  <X size={20} />
                </button>
              </div>

              {query.trim() && (
                <div className="max-h-80 overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="p-6 text-center text-sm text-gray-400">No products found for "{query}"</p>
                  ) : (
                    results.map((product) => {
                      const Icon = product.icon;
                      return (
                        <button
                          key={product.id}
                          onClick={() => handleSelect(product.id)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF] flex items-center justify-center shrink-0">
                            <Icon size={18} className="text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.title}</p>
                            <p className="text-xs text-gray-400">{product.category} · ₹{product.price}</p>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SearchModal;