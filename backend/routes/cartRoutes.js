import express from "express";
import { body, validationResult } from "express-validator";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
  clearCart,
} from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCart);

// POST: Add product to cart
router.post(
  "/",
  [
    // Validate that productId is a valid MongoDB ObjectId and quantity is a positive integer
    body("productId").isMongoId().withMessage("Invalid product ID"),
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  protect,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await addToCart(req, res);
    } catch (error) {
      next(error); // Pass the error to the global handler
    }
  }
);

// PUT: Update cart item quantity
router.put(
  "/:productId",
  [
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  protect,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await updateCartItem(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Static before dynamic routes
router.delete("/clear", protect, clearCart);
router.delete("/:productId", protect, removeCartItem);

export default router;
