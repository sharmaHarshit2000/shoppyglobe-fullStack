import express from "express";
import {
  getProducts,
  getProductById,
  createProduct, // 👈 Import it here
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct); // 👈 Add POST route here

export default router;
