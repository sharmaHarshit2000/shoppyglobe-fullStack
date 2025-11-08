import Product from "../models/Product.js";
import Cart from "../models/Cart.js";


export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find the cart for the logged-in user
    let cart = await Cart.findOne({ user: req.user._id });

    // If no cart exists for the user, create a new one
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if the product is already present in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex >= 0) {
      // If item exists, update its quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If item does not exist, add it as a new entry
      cart.items.push({
        productId,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity,
      });
    }

    // Recalculate the total amount after adding the product
    await cart.updateTotalAmount();

    // Save the updated cart
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the specific product item in the cart
    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    // Update the item's quantity
    item.quantity = quantity;

    // Update total amount again after quantity change
    await cart.updateTotalAmount();
    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const removeCartItem = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find index of the item to remove
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not in cart" });

    // Remove item from the cart items array
    cart.items.splice(itemIndex, 1);

    // Recalculate total after removal
    await cart.updateTotalAmount();

    // Save updated cart
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
    // Try finding the cart for the user
    let cart = await Cart.findOne({ user: req.user._id });

    // If no cart exists, create an empty cart for the user
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [], totalAmount: 0 });
      await cart.save();
    }

    // Return the cart
    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Clear all items from cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from JWT token

    const result = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], totalAmount: 0 } }, // Empty the cart and reset totalAmount
      { new: true } // Return the updated cart
    );

    if (!result) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully", cart: result });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
