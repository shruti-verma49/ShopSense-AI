const express = require("express");
const { getCart, updateCart } = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCart);
router.put("/", updateCart);

module.exports = router;