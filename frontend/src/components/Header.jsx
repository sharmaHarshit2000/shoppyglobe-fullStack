import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, user, logout } = useAuth();
  const { cartCount, fetchCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    fetchCartCount(); // Reset cart count on logout
    navigate("/login");
  };

  // ✅ Fetch cart count on login or when cartUpdated event is triggered
  useEffect(() => {
    if (token) {
      fetchCartCount();
    }

    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [token, fetchCartCount]);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <Link
          to="/"
          className="text-3xl md:text-4xl font-extrabold tracking-wide hover:scale-105 transform transition duration-300"
        >
          Shoopy<span className="text-yellow-400">Globe</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-10 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-300 transition duration-300 ease-in-out">
            Home
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 hover:text-yellow-300 transition duration-300 ease-in-out"
          >
            Cart
            <FaCartShopping className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-md ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user && (
            <>
              <span className="text-lg">{user.fullName}</span> {/* Display the full name */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-3xl transition-transform duration-300 focus:outline-none"
        >
          <GiHamburgerMenu className={`${isMenuOpen ? "rotate-90" : ""} transition duration-300`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 bg-white text-gray-800 rounded-b-xl shadow-lg ${isMenuOpen ? "max-h-52 opacity-100 py-4 px-6" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div className="flex flex-col gap-4">
          <Link to="/" className="hover:text-blue-700 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-blue-700 text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Cart
            <FaCartShopping className="text-xl" />
            {cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          {user && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="text-left text-lg font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
