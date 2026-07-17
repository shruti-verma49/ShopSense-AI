// JWT verification logic will be implemented in a future checkpoint

const protect = (req, res, next) => {
  next();
};

module.exports = { protect };