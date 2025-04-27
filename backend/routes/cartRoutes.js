import express from "express";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
  clearCart
} from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect middleware for Cart Routes
router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/:productId", protect, updateCartItem);

// Static before dynamic routes
router.delete("/clear", protect, clearCart);       
router.delete("/:productId", protect, removeCartItem);

export default router;
