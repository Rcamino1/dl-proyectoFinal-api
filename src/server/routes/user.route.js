const express = require("express");
const userController = require("../controllers/user.controller.js");
const { authenticateToken, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", authenticateToken, isAdmin, userController.getAllUsers);
router.get("/:id", authenticateToken, userController.getUserById);
router.put("/:id", authenticateToken, isAdmin, userController.updateUser);
router.delete("/:id", authenticateToken, isAdmin, userController.deleteUser);

module.exports = router;
