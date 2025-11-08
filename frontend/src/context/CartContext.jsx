import { createContext, useContext, useState, useEffect } from "react";
import axiosAuth from "../utils/axiosAuth"; 
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await axiosAuth.get("/cart");
      setCartCount(res.data.items.length || 0);
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    if (!token) {
      setCartCount(0);
    } else {
      fetchCartCount();
    }
  }, [token]);

  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount();
    };
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [token]);

  const addToCart = async (item) => {
    if (!token) return;
    try {
      await axiosAuth.post("/cart", { item });
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) return;
    try {
      await axiosAuth.delete(`/cart/${itemId}`);
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
