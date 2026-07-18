const express = require("express");
const { createOrder, getOrders, getOrderById, cancelOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);
router.post("/", protect, createOrder);
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;