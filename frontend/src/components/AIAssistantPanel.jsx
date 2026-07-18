import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import { fetchProducts } from "../services/productService";
import { getAssistantResponse } from "../utils/assistantResponses";

function AIAssistantPanel({ isOpen, onClose }) {
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hi! I'm your ShopSense AI assistant. Ask me about products, prices, or shipping.", products: [] },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && products.length === 0) {
      fetchProducts()
        .then(setProducts)
        .catch(() => {});
    }
  }, [isOpen, products.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input, products: [] };
    const { reply, products: matchedProducts } = getAssistantResponse(input, products);
    const assistantMessage = { sender: "assistant", text: reply, products: matchedProducts };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-[80] w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col max-h-[70vh]"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#6D5DF6] to-[#5B8DEF] text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <span className="font-medium">ShopSense Assistant</span>
            </div>
            <button onClick={onClose} className="hover:opacity-80">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-[#6D5DF6] text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.products?.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {msg.products.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className="block bg-white dark:bg-gray-800 rounded-xl px-3 py-2 text-xs hover:border-[#6D5DF6] border border-transparent transition-colors duration-200"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">{product.title}</span>
                          <span className="text-gray-400"> — ₹{product.price}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t border-gray-100 dark:border-gray-700">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, shipping..."
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm outline-none focus:border-[#6D5DF6]"
            />
            <button type="submit" className="p-2 rounded-xl bg-[#6D5DF6] text-white hover:bg-[#5b4de0] transition-colors duration-200">
              <Send size={16} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AIAssistantPanel;