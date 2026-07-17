const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching products",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the product",
      error: error.message,
    });
  }
};

module.exports = { getProducts, getProductById };