import { Pencil, Trash2 } from "lucide-react";
import StarRating from "./StarRating";

function ReviewCard({ review, isOwner, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white">{review.user?.name || "Anonymous"}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
          <div className="mt-1.5">
            <StarRating rating={review.rating} size={14} />
          </div>
        </div>

        {isOwner && (
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => onEdit(review)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#6D5DF6] transition-colors duration-200">
              <Pencil size={16} />
            </button>
            <button onClick={() => onDelete(review._id)} className="p-2 rounded-lg text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors duration-200">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <h4 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">{review.title}</h4>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{review.description}</p>
    </div>
  );
}

export default ReviewCard;