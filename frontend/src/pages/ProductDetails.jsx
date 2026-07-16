import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getProductById, getSimilarProducts } from "../constants/products";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import SimilarProducts from "../components/SimilarProducts";

function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-2 text-gray-500">This product may have been removed or the link is incorrect.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-[#6D5DF6] font-medium">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    );
  }

  const similarProducts = getSimilarProducts(product);

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#6D5DF6] transition-colors duration-200">
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <div className="mt-6 grid md:grid-cols-2 gap-12">
          <ProductGallery icon={product.icon} />
          <ProductInfo product={product} />
        </div>

        <SimilarProducts products={similarProducts} />
      </div>
    </div>
  );
}

export default ProductDetails;