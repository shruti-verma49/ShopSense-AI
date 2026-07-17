// Product CRUD logic will be implemented in a future checkpoint

const getProducts = async (req, res) => {
  res.status(501).json({ message: "Get products endpoint not implemented yet" });
};

const getProductById = async (req, res) => {
  res.status(501).json({ message: "Get product by id endpoint not implemented yet" });
};

module.exports = { getProducts, getProductById };