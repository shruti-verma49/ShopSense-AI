const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const {
  getDashboardStats,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrdersAdmin,
  updateOrderStatus,
  getAllUsersAdmin,
  getAllReviewsAdmin,
  deleteReviewAdmin,
} = require("../controllers/adminController");

const router = express.Router();

router.use(protect, isAdmin);

router.get("/stats", getDashboardStats);

router.get("/products", getAllProductsAdmin);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.get("/orders", getAllOrdersAdmin);
router.put("/orders/:id/status", updateOrderStatus);

router.get("/users", getAllUsersAdmin);

router.get("/reviews", getAllReviewsAdmin);
router.delete("/reviews/:id", deleteReviewAdmin);

module.exports = router;