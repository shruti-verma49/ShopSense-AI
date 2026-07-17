const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId }).populate("products.product");

    if (!cart) {
      cart = await Cart.create({ user: req.user.userId, products: [] });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the cart",
      error: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "productId is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const quantityToAdd = quantity && quantity > 0 ? quantity : 1;

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.userId,
        products: [{ product: productId, quantity: quantityToAdd }],
      });
    } else {
      const existingItem = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        cart.products.push({ product: productId, quantity: quantityToAdd });
      }

      await cart.save();
    }

    const populatedCart = await cart.populate("products.product");

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: populatedCart,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding to cart",
      error: error.message,
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: "A valid quantity (1 or more) is required" });
    }

    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.products.find((item) => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await cart.populate("products.product");

    return res.status(200).json({
      success: true,
      message: "Cart item updated",
      cart: populatedCart,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the cart",
      error: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const itemExists = cart.products.some((item) => item.product.toString() === productId);
    if (!itemExists) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    cart.products = cart.products.filter((item) => item.product.toString() !== productId);
    await cart.save();

    const populatedCart = await cart.populate("products.product");

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: populatedCart,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong while removing from cart",
      error: error.message,
    });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };