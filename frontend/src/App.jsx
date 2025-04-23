import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "./components/Shared/LoadingSpinner";

import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Shared/Footer";

const Header = lazy(() => import("./components/Shared/Header"));
const ProductList = lazy(() => import("./components/Product/ProductList"));
const ProductDetail = lazy(() => import("./components/Product/ProductDetail"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Checkout = lazy(() => import("./components/Cart/Checkout"));
const NotFound = lazy(() => import("./components/Shared/NotFound"));
const Login = lazy(() => import("./components/Auth/Login"));
const Signup = lazy(() => import("./components/Auth/Signup"));
const ProtectedRoute = lazy(() => import("./components/Shared/ProtectedRoute"));

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        <main className="mt-8 mb-20 px-4 sm:px-6 md:px-8">
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Public Routes */}
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Protected Routes */}
            <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
            <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer/>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
