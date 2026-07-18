import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import StarRating from "../../components/StarRating";
import { getAdminReviewsApi, deleteReviewAdminApi } from "../../services/adminService";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminReviewsApi({ page, limit: 10 });
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      toast.error("Could not load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review? This action cannot be undone.")) return;
    try {
      await deleteReviewAdminApi(id);
      toast.success("Review deleted");
      loadReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete review");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews</h1>

      <div className="mt-6 space-y-4">
        {isLoading ? (
          <p className="text-gray-400 text-sm">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-400 text-sm">No reviews found.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.product?.title || "Unknown product"}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    by {review.user?.name} ({review.user?.email})
                  </p>
                  <div className="mt-1.5">
                    <StarRating rating={review.rating} size={14} />
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <h4 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">{review.title}</h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{review.description}</p>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium ${
                page === i + 1 ? "bg-[#6D5DF6] text-white" : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default Reviews;