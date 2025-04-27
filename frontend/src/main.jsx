import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const AppWithCart = () => {
  const { token } = useAuth(); //Get the token change

  return (
    <CartProvider key={token}> {/*Re-render CartProvider when token changes */}
      <App />
    </CartProvider>
  );
};


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppWithCart />
    </AuthProvider>
  </StrictMode>
);
