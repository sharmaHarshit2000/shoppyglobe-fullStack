import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import CartItem from "./CartItem";
import { updateCartItemApi, removeCartItemApi } from "../../api/cartAPI";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart data when component mounts
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Notify header or other components that cart has changed
  const notifyHeader = () => {
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  // Update quantity of a cart item
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return; // Prevent quantity below 1
    try {
      const updatedCart = await updateCartItemApi(productId, newQty);
      setCart(updatedCart);
      notifyHeader();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Remove an item from the cart
  const removeItem = async (productId) => {
    try {
      const updatedCart = await removeCartItemApi(productId);
      setCart(updatedCart.cart);
      notifyHeader();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete("/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data.cart);
      toast.success("Your cart has been cleared!");
      notifyHeader();
    } catch (err) {
      console.error("Error clearing cart:", err);
      toast.error("Failed to clear cart. Please try again.");
    }
  };

  // Calculate total price dynamically
  const totalPrice = cart?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center bg-gray-50">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-10">Your Shopping Cart 🛒</h2>

      {/* If cart is empty */}
      {!cart || cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-6 bg-white p-10 rounded-xl shadow-lg">
          <FaShoppingCart className="text-5xl text-gray-400" />
          <p className="text-gray-500 text-lg font-semibold">Your cart is empty. Start shopping now!</p>
          <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105">
            🛍️ Start Shopping
          </Link>
        </div>
      ) : (
        // If cart has items
        <div className="space-y-6 w-full max-w-3xl">
          {cart.items.map((item) => (
            <CartItem key={item.productId} item={item} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />
          ))}

          {/* Cart Summary Section */}
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Cart Total</h3>
              <span className="text-2xl font-bold text-green-600">${totalPrice?.toFixed(2)}</span>
            </div>

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300 transform hover:scale-105 mb-4"
            >
              🗑️ Clear Cart
            </button>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              ✅ Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
