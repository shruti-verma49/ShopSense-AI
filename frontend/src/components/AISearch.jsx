import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Search, Headphones, Laptop, Gift, Smartphone, Footprints, Watch } from "lucide-react";

function AISearch() {
  const [query, setQuery] = useState("");

  const suggestionChips = [
    { icon: Headphones, label: "Best headphones for gaming" },
    { icon: Laptop, label: "Laptop for coding" },
    { icon: Gift, label: "Gift for Mom" },
    { icon: Smartphone, label: "Best camera phone" },
    { icon: Footprints, label: "Running shoes" },
    { icon: Watch, label: "Smart watch" },
  ];

  const suggestedCategories = [
    "Gaming Accessories",
    "Trending Smartphones",
    "College Essentials",
    "Summer Fashion",
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            What are you looking for today?
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Describe products naturally and let AI help you discover the perfect match.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-10 flex items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 max-w-2xl mx-auto"
        >
          <Search size={20} className="ml-3 text-gray-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Example: I need running shoes under ₹4000..."
            className="flex-1 min-w-0 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent outline-none"
          />
          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] hover:scale-105 transition-all duration-200 shrink-0">
            <Sparkles size={16} />
            <span className="hidden sm:inline">AI Search</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {suggestionChips.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setQuery(label)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 hover:-translate-y-0.5 hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-all duration-200"
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 text-[#6D5DF6] font-semibold">
            <Sparkles size={18} />
            AI Suggestion
          </div>
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            We found <span className="font-semibold text-gray-900 dark:text-white">24 products</span> that match your interests.
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {suggestedCategories.map((category) => (
              <div
                key={category}
                className="rounded-xl bg-gradient-to-br from-[#6D5DF6]/5 to-[#5B8DEF]/5 border border-gray-100 dark:border-gray-700 p-4 text-center hover:shadow-md hover:border-[#6D5DF6]/30 transition-all duration-200"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AISearch;