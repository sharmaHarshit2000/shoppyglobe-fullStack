import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const AppWithCart = () => {
  const { token } = useAuth(); // 🔁 Listen to token change

  return (
    <CartProvider key={token}> {/* 🧠 Re-render CartProvider when token changes */}
      <Provider store={store}>
        <App />
      </Provider>
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
