import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

// Add product to cart
// POST /api/cart
// Private
// Add product to cart
// POST /api/cart
// Private
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find the cart for the user
    let cart = await Cart.findOne({ user: req.user._id });

    // If no cart, create one
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex >= 0) {
      // Item exists, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // New item, add it to the cart
      cart.items.push({
        productId,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity,
      });
    }

    // Update the total amount
    await cart.updateTotalAmount();

    // Save the cart and return it
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Update item quantity in cart
// PUT /api/cart/:productId
// Private
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    await cart.updateTotalAmount();
    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
// DELETE /api/cart/:productId
// Private
// Remove item from cart with version handling
export const removeCartItem = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not in cart" });

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);
    // Update the total amount
    await cart.updateTotalAmount();

    // Save the cart with versioning control
    const updatedCart = await cart.save();
    res.json({ message: "Item removed from cart", cart: updatedCart });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get entire cart
export const getCart = async (req, res) => {
  try {
    // Try to find the user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    // If no cart exists, create one for the user
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [], totalAmount: 0 });
      await cart.save(); // Save the newly created empty cart
    }

    // Return the cart (now guaranteed to exist)
    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// cartController.js (or the relevant file where you define cart-related operations)
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from JWT token
    console.log("User ID:", userId); // Log the user ID to verify it's correct
    
    const result = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], totalAmount: 0 } }, // Clear the cart by emptying the items array
      { new: true }
    );

    console.log("Cart after clearing:", result); // Log the result to verify it's updated
    
    if (!result) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully", cart: result });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
