const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");

const recalcProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  const reviewCount = reviews.length;
  const rating = reviewCount > 0
    ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10
    : 0;
  await Product.findByIdAndUpdate(productId, { rating, reviewCount });
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { sort = "newest" } = req.query;

    let sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    else if (sort === "highest") sortOption = { rating: -1, createdAt: -1 };
    else if (sort === "lowest") sortOption = { rating: 1, createdAt: -1 };

    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort(sortOption);

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) * 10) / 10
      : 0;

    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      breakdown[r.rating] = (breakdown[r.rating] || 0) + 1;
    });

    return res.status(200).json({ success: true, averageRating, totalReviews, breakdown, reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while fetching reviews", error: error.message });
  }
};

const getReviewEligibility = async (req, res) => {
  try {
    const { productId } = req.params;

    const hasPurchased = await Order.exists({
      user: req.user.userId,
      "products.product": productId,
      orderStatus: { $ne: "Cancelled" },
    });

    const existingReview = await Review.findOne({ user: req.user.userId, product: productId });

    return res.status(200).json({
      success: true,
      hasPurchased: !!hasPurchased,
      hasReviewed: !!existingReview,
      existingReview: existingReview || null,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while checking review eligibility", error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, title, description } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }
    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ success: false, message: "Review title and description are required" });
    }

    const hasPurchased = await Order.exists({
      user: req.user.userId,
      "products.product": productId,
      orderStatus: { $ne: "Cancelled" },
    });
    if (!hasPurchased) {
      return res.status(403).json({ success: false, message: "You can review this product after purchasing it" });
    }

    const existingReview = await Review.findOne({ user: req.user.userId, product: productId });
    if (existingReview) {
      return res.status(409).json({ success: false, message: "You have already reviewed this product" });
    }

    const review = await Review.create({
      user: req.user.userId,
      product: productId,
      rating,
      title: title.trim(),
      description: description.trim(),
    });

    await recalcProductRating(productId);
    const populatedReview = await review.populate("user", "name");

    return res.status(201).json({ success: true, message: "Review submitted successfully", review: populatedReview });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "You have already reviewed this product" });
    }
    return res.status(500).json({ success: false, message: "Something went wrong while submitting your review", error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, description } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Not authorized to edit this review" });
    }

    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
      }
      review.rating = rating;
    }
    if (title !== undefined) {
      if (!title.trim()) return res.status(400).json({ success: false, message: "Review title cannot be empty" });
      review.title = title.trim();
    }
    if (description !== undefined) {
      if (!description.trim()) return res.status(400).json({ success: false, message: "Review description cannot be empty" });
      review.description = description.trim();
    }

    await review.save();
    await recalcProductRating(review.product);
    const populatedReview = await review.populate("user", "name");

    return res.status(200).json({ success: true, message: "Review updated successfully", review: populatedReview });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid review ID format" });
    }
    return res.status(500).json({ success: false, message: "Something went wrong while updating the review", error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this review" });
    }

    const productId = review.product;
    await review.deleteOne();
    await recalcProductRating(productId);

    return res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid review ID format" });
    }
    return res.status(500).json({ success: false, message: "Something went wrong while deleting the review", error: error.message });
  }
};

module.exports = { getProductReviews, getReviewEligibility, createReview, updateReview, deleteReview, recalcProductRating };