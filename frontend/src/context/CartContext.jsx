import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth(); // react to token updates
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(res.data.items.length || 0);
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      setCartCount(0);
    }
  };

  // React to token updates
  useEffect(() => {
    if (!token) {
      setCartCount(0); // Clear on logout
    } else {
      fetchCartCount(); // fetch on login
    }
  }, [token]);

  // Event-based cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount(); // Fetch updated cart count
    };
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [token]);

  const addToCart = async (item) => {
    if (!token) return;
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { item },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Dispatch the cartUpdated event to notify other parts of the app
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) return;
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Dispatch the cartUpdated event to notify other parts of the app
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Remove from cart failed:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartCount, fetchCartCount, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
