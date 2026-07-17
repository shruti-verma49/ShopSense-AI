// Cart CRUD logic will be implemented in a future checkpoint

const getCart = async (req, res) => {
  res.status(501).json({ message: "Get cart endpoint not implemented yet" });
};

const updateCart = async (req, res) => {
  res.status(501).json({ message: "Update cart endpoint not implemented yet" });
};

module.exports = { getCart, updateCart };