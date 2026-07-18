import { useState } from "react";
import StarRating from "./StarRating";

function ReviewForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!rating || rating < 1 || rating > 5) newErrors.rating = "Please select a rating";
    if (!title.trim()) newErrors.title = "Review title is required";
    if (!description.trim()) newErrors.description = "Review description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ rating, title: title.trim(), description: description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Rating</label>
        <div className="mt-1.5">
          <StarRating rating={rating} size={24} interactive onChange={setRating} />
        </div>
        {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Review Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sum up your experience"
          className="mt-1.5 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#6D5DF6]"
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Review Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Share details of your experience with this product"
          className="mt-1.5 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#6D5DF6]"
        />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200 disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : initialData ? "Update Review" : "Submit Review"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ReviewForm;