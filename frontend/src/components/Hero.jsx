import { motion } from "framer-motion";
import { Sparkles, ArrowRight, MessageCircle, Bot, Truck, Lock, Star } from "lucide-react";

function Hero() {
  const badges = [
    { icon: Bot, label: "AI Powered" },
    { icon: Truck, label: "Fast Delivery" },
    { icon: Lock, label: "Secure Payments" },
    { icon: Star, label: "Trusted by Shoppers" },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
            Shop Smarter with{" "}
            <span className="text-[#6D5DF6]">AI</span>
          </h1>

          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
            Discover products you'll actually love with AI-powered recommendations,
            smart search, and personalized shopping.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] hover:scale-105 transition-all duration-200 shadow-lg shadow-[#6D5DF6]/20">
              Explore Products
              <ArrowRight size={18} />
            </button>

            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-all duration-200">
              <MessageCircle size={18} />
              Talk to AI
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300"
              >
                <Icon size={16} className="text-[#5B8DEF]" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative h-[420px] md:h-[480px] flex items-center justify-center"
        >
          <div className="absolute w-72 h-72 bg-[#6D5DF6]/20 rounded-full blur-3xl top-0 left-10"></div>
          <div className="absolute w-72 h-72 bg-[#5B8DEF]/20 rounded-full blur-3xl bottom-0 right-10"></div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-5"
          >
            <div className="w-full h-32 rounded-xl bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF]"></div>
            <div className="mt-4 h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mt-2 h-3 w-1/2 rounded-full bg-gray-100 dark:bg-gray-700"></div>
            <div className="mt-4 flex items-center justify-between">
              <div className="h-6 w-16 rounded-full bg-gray-100 dark:bg-gray-700"></div>
              <div className="h-8 w-8 rounded-full bg-[#6D5DF6]/10 flex items-center justify-center">
                <Sparkles size={14} className="text-[#6D5DF6]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-6 right-4 z-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#5B8DEF]/10 flex items-center justify-center">
              <Bot size={16} className="text-[#5B8DEF]" />
            </div>
            <div>
              <div className="h-2 w-14 rounded-full bg-gray-200 dark:bg-gray-700 mb-1"></div>
              <div className="h-2 w-10 rounded-full bg-gray-100 dark:bg-gray-700"></div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-8 left-0 z-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#6D5DF6]/10 flex items-center justify-center">
              <Star size={16} className="text-[#6D5DF6]" />
            </div>
            <div>
              <div className="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700 mb-1"></div>
              <div className="h-2 w-10 rounded-full bg-gray-100 dark:bg-gray-700"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;