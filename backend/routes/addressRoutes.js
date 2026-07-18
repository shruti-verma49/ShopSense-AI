const express = require("express");
const { getAddresses, addAddress, updateAddress, deleteAddress } = require("../controllers/addressController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getAddresses);
router.post("/", protect, addAddress);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);

module.exports = router;