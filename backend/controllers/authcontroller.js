// Authentication logic (register, login) will be implemented in a future checkpoint

const registerUser = async (req, res) => {
  res.status(501).json({ message: "Register endpoint not implemented yet" });
};

const loginUser = async (req, res) => {
  res.status(501).json({ message: "Login endpoint not implemented yet" });
};

module.exports = { registerUser, loginUser };