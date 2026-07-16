import { motion } from "framer-motion";
import { products } from "../constants/products";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            AI Recommended Products
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Personalized picks based on trending items and what shoppers like you are loving right now.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;