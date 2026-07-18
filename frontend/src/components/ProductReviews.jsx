import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import {
  getProductReviewsApi,
  getReviewEligibilityApi,
  createReviewApi,
  updateReviewApi,
  deleteReviewApi,
} from "../services/reviewService";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

function ProductReviews({ productId }) {
  const [reviewData, setReviewData] = useState({ averageRating: 0, totalReviews: 0, breakdown: {}, reviews: [] });
  const [eligibility, setEligibility] = useState(null);
  const [sort, setSort] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const loadReviews = async () => {
    try {
      const response = await getProductReviewsApi(productId, sort);
      setReviewData(response.data);
    } catch (error) {
      toast.error("Could not load reviews");
    }
  };

  const loadEligibility = async () => {
    if (!currentUser) return;
    try {
      const response = await getReviewEligibilityApi(productId);
      setEligibility(response.data);
    } catch (error) {
      // Not critical if this fails
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([loadReviews(), loadEligibility()]).finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingReview) {
        await updateReviewApi(editingReview._id, formData);
        toast.success("Review updated");
      } else {
        await createReviewApi(productId, formData);
        toast.success("Review submitted");
      }
      setIsFormOpen(false);
      setEditingReview(null);
      await loadReviews();
      await loadEligibility();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await deleteReviewApi(id);
      toast.success("Review deleted");
      await loadReviews();
      await loadEligibility();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete review");
    }
  };

  const { averageRating, totalReviews, breakdown, reviews } = reviewData;

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ratings & Reviews</h2>

      <div className="mt-6 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{averageRating || 0}</span>
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </p>

            <div className="mt-4 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = breakdown?.[star] || 0;
                const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-8 text-gray-500 dark:text-gray-400">{star}★</span>
                    <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="w-6 text-gray-400 dark:text-gray-500">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {!isFormOpen && (
            <div className="mt-4">
              {!currentUser ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">Log in to write a review.</p>
              ) : eligibility?.hasReviewed ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">You've already reviewed this product.</p>
              ) : eligibility?.hasPurchased ? (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
                >
                  Write a Review
                </button>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">You can review this product after purchasing it.</p>
              )}
            </div>
          )}

          {isFormOpen && (
            <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <ReviewForm
                initialData={editingReview}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingReview(null);
                }}
                isSubmitting={isSubmitting}
              />
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 outline-none focus:border-[#6D5DF6]"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          <div className="mt-4 space-y-4">
            {isLoading ? (
              <p className="text-sm text-gray-400">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-sm text-gray-400">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  isOwner={currentUser && review.user?._id === currentUser._id}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;