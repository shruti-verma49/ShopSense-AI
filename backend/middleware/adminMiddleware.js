const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while verifying admin access", error: error.message });
  }
};

module.exports = { isAdmin };