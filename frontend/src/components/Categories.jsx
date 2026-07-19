import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Laptop, Shirt, Gamepad2, Headphones, Watch, Backpack, BookOpen, ArrowRight } from "lucide-react";
import { fetchProducts } from "../services/productService";

const BASE_CATEGORIES = [
  { icon: Laptop, name: "Electronics", description: "Phones, laptops, tablets & cameras" },
  { icon: Shirt, name: "Fashion", description: "Clothing and footwear for everyone" },
  { icon: Gamepad2, name: "Gaming", description: "Consoles, controllers & gaming gear" },
  { icon: Headphones, name: "Audio", description: "Headphones, earbuds & speakers" },
  { icon: Watch, name: "Wearables", description: "Smartwatches and fitness bands" },
  { icon: Backpack, name: "Accessories", description: "Bags, cases, chargers & more" },
  { icon: BookOpen, name: "Books", description: "Fiction, business & self-help reads" },
];

function Categories() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const withCounts = BASE_CATEGORIES.map((category) => ({
      ...category,
      count: products.filter((p) => p.category === category.name).length,
    }));
    return withCounts.sort((a, b) => b.count - a.count);
  }, [products]);

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Browse our most popular shopping categories.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(({ icon: Icon, name, description, count }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
            >
              <Link
                to={`/products?category=${encodeURIComponent(name)}`}
                className="group block bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF] flex items-center justify-center">
                  <Icon size={26} className="text-white" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{count} Products</span>
                  <ArrowRight
                    size={18}
                    className="text-[#6D5DF6] group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;