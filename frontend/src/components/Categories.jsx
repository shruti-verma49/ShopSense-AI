import { motion } from "framer-motion";
import { Laptop, Shirt, Footprints, Home, Palette, BookOpen, Gamepad2, Watch, ArrowRight } from "lucide-react";

function Categories() {
  const categories = [
    { icon: Laptop, name: "Electronics", description: "Gadgets & devices for everyday life", count: "320+ Products" },
    { icon: Shirt, name: "Fashion", description: "Trending styles for every season", count: "540+ Products" },
    { icon: Footprints, name: "Footwear", description: "Comfort meets everyday style", count: "180+ Products" },
    { icon: Home, name: "Home & Living", description: "Make your space feel like home", count: "260+ Products" },
    { icon: Palette, name: "Beauty", description: "Skincare, makeup & self-care picks", count: "210+ Products" },
    { icon: BookOpen, name: "Books", description: "Stories, guides & everything between", count: "150+ Products" },
    { icon: Gamepad2, name: "Gaming", description: "Gear for casual and pro players", count: "190+ Products" },
    { icon: Watch, name: "Accessories", description: "Small details that finish the look", count: "230+ Products" },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Browse our most popular shopping categories.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(({ icon: Icon, name, description, count }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              className="group cursor-pointer bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF] flex items-center justify-center">
                <Icon size={26} className="text-white" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">{name}</h3>
              <p className="mt-1 text-sm text-gray-500">{description}</p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">{count}</span>
                <ArrowRight
                  size={18}
                  className="text-[#6D5DF6] group-hover:translate-x-1 transition-transform duration-200"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;