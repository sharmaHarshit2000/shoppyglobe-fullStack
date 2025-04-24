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

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/:productId", protect, updateCartItem);

// static before dynamic
router.delete("/clear", protect, clearCart);        // Must be BEFORE 
router.delete("/:productId", protect, removeCartItem);

export default router;
