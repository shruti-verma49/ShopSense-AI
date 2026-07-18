const express = require("express");
const {
  getProductReviews,
  getReviewEligibility,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:productId", getProductReviews);
router.get("/:productId/eligibility", protect, getReviewEligibility);
router.post("/:productId", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;