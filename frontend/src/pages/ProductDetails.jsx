import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchProductById, fetchProducts } from "../services/productService";
import { getRecommendedProducts } from "../utils/productRecommendations";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import SimilarProducts from "../components/SimilarProducts";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setNotFound(false);

      try {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
        addRecentlyViewed(fetchedProduct.id);

        const allProducts = await fetchProducts();
        const recommended = getRecommendedProducts(fetchedProduct, allProducts, 4);
        setSimilarProducts(recommended);
      } catch (error) {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center text-gray-400 dark:text-gray-500">
        Loading product...
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">This product may have been removed or the link is incorrect.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-[#6D5DF6] font-medium">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#6D5DF6] transition-colors duration-200">
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