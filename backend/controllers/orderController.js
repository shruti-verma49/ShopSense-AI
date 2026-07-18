const crypto = require("crypto");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Address = require("../models/Address");

const createOrder = async (req, res) => {
  try {
    const { addressId, paymentMethod, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!addressId) {
      return res.status(400).json({ success: false, message: "Please select a delivery address" });
    }

    const address = await Address.findById(addressId);
    if (!address || address.user.toString() !== req.user.userId) {
      return res.status(404).json({ success: false, message: "Shipping address not found" });
    }

    const cart = await Cart.findOne({ user: req.user.userId }).populate("products.product");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty" });
    }

    const method = paymentMethod === "Online" ? "Online" : "COD";

    let paymentId;
    let razorpayOrderId;
    let paymentStatus = "Pending";

    if (method === "Online") {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ success: false, message: "Missing required payment details" });
      }

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Payment verification failed — order not created" });
      }

      paymentId = razorpay_payment_id;
      razorpayOrderId = razorpay_order_id;
      paymentStatus = "Paid";
    }

    const orderProducts = cart.products.map((item) => ({
      product: item.product._id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const totalAmount = orderProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

    const newOrder = await Order.create({
      user: req.user.userId,
      products: orderProducts,
      totalAmount,
      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        houseNo: address.houseNo,
        street: address.street,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
      },
      paymentMethod: method,
      paymentId,
      razorpayOrderId,
      paymentStatus,
      deliveryStatus: "Placed",
      orderStatus: "Placed",
      estimatedDeliveryDate,
    });

    cart.products = [];
    await cart.save();

    return res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while creating the order", error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while fetching orders", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Not authorized to view this order" });
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid order ID format" });
    }
    return res.status(500).json({ success: false, message: "Something went wrong while fetching the order", error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Not authorized to cancel this order" });
    }

    const cancellableStatuses = ["Placed", "Confirmed"];
    if (!cancellableStatuses.includes(order.deliveryStatus)) {
      return res.status(400).json({ success: false, message: "This order can no longer be cancelled" });
    }

    order.deliveryStatus = "Cancelled";
    order.orderStatus = "Cancelled";
    await order.save();

    return res.status(200).json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid order ID format" });
    }
    return res.status(500).json({ success: false, message: "Something went wrong while cancelling the order", error: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById, cancelOrder };