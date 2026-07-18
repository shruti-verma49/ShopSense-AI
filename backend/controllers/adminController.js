const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({
      deliveryStatus: { $in: ["Placed", "Confirmed", "Packed", "Shipped", "Out For Delivery"] },
    });
    const deliveredOrders = await Order.countDocuments({ deliveryStatus: "Delivered" });

    const orders = await Order.find({});
    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    return res.status(200).json({
      success: true,
      stats: { totalUsers, totalProducts, totalOrders, pendingOrders, deliveredOrders, revenue },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while fetching dashboard stats", error: error.message });
  }
};

const getAllProductsAdmin = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const totalCount = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      count: products.length,
      totalCount,
      page: Number(page),
      totalPages: Math.ceil(totalCount / limit),
      products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while fetching products", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image, rating, stock } = req.body;

    if (!title || !description || price === undefined || !category || stock === undefined) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const product = await Product.create({ title, description, price, category, image, rating, stock });
    return res.status(201).json({ success: true, message: "Product created successfully", product });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while creating the product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { title, description, price, category, image, rating, stock } = req.body;
    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (image !== undefined) product.image = image;
    if (rating !== undefined) product.rating = rating;
    if (stock !== undefined) product.stock = stock;

    await product.save();
    return res.status(200).json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }
    return res.status(500).json({ success: false, message: "Something went wrong while updating the product", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    await product.deleteOne();
    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }
    return res.status(500).json({ success: false, message: "Something went wrong while deleting the product", error: error.message });
  }
};

const getAllOrdersAdmin = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    let orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });

    if (search) {
      const lowerSearch = search.toLowerCase();
      orders = orders.filter(
        (order) =>
          order._id.toString().toLowerCase().includes(lowerSearch) ||
          (order.user?.name || "").toLowerCase().includes(lowerSearch) ||
          (order.user?.email || "").toLowerCase().includes(lowerSearch)
      );
    }

    const totalCount = orders.length;
    const paginatedOrders = orders.slice((page - 1) * limit, page * limit);

    return res.status(200).json({
      success: true,
      count: paginatedOrders.length,
      totalCount,
      page: Number(page),
      totalPages: Math.ceil(totalCount / limit),
      orders: paginatedOrders,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while fetching orders", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { deliveryStatus } = req.body;
    const validStatuses = ["Placed", "Confirmed", "Packed", "Shipped", "Out For Delivery", "Delivered", "Cancelled"];

    if (!deliveryStatus || !validStatuses.includes(deliveryStatus)) {
      return res.status(400).json({ success: false, message: "A valid delivery status is required" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.deliveryStatus = deliveryStatus;

    if (deliveryStatus === "Cancelled") {
      order.orderStatus = "Cancelled";
    } else if (deliveryStatus === "Delivered") {
      order.orderStatus = "Delivered";
      if (order.paymentMethod === "COD") order.paymentStatus = "Paid";
    } else {
      order.orderStatus = "Processing";
    }

    await order.save();
    return res.status(200).json({ success: true, message: "Order status updated successfully", order });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid order ID format" });
    }
    return res.status(500).json({ success: false, message: "Something went wrong while updating order status", error: error.message });
  }
};

const getAllUsersAdmin = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;
    const query = search
      ? { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }] }
      : {};

    const totalCount = await User.countDocuments(query);
    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      count: users.length,
      totalCount,
      page: Number(page),
      totalPages: Math.ceil(totalCount / limit),
      users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while fetching users", error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrdersAdmin,
  updateOrderStatus,
  getAllUsersAdmin,
};