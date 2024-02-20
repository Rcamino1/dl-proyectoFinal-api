const express = require("express");
const { cartController } = require("../controllers/cart.controller.js");
const { authenticateToken } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/", authenticateToken, cartController.addItem);
router.put("/:productId", authenticateToken, cartController.updateItemQuantity);
router.get("/", authenticateToken, cartController.getCart);
router.delete("/:productId", authenticateToken, cartController.removeItem);

module.exports = router;
