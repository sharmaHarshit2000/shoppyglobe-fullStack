import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaCreditCard, FaPaypal, FaMoneyBillWaveAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Checkout() {
    const { token } = useAuth();

    // Local states to store cart items, order status, and form data
    const [cartItems, setCartItems] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        paymentMethod: "Credit Card",
    });

    // Fetch cart data from backend when component mounts or token changes
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCartItems(response.data.items); // Save only items array to state
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        };

        if (token) fetchCart();
    }, [token]);

    // Calculate total price dynamically based on cart items
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Handle changes in the form inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission (placing order)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if all fields are filled
        if (Object.values(formData).some((field) => field.trim() === "")) {
            alert("Please fill all fields before placing the order");
            return;
        }

        try {
            setOrderPlaced(true); // Show success message immediately

            // Clear cart data on backend
            await axios.delete("/cart/clear", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCartItems([]); // Clear cart items from frontend state

            // Dispatch a custom event to update cart icon count in header
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Error placing order or clearing cart:", error);
            alert("Failed to place order or clear cart.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700">🛒 Checkout</h2>

                {/* If order is placed, show success message, else show form */}
                {orderPlaced ? (
                    <div className="text-center bg-green-100 p-10 rounded-2xl shadow-xl">
                        <h3 className="text-3xl font-bold text-green-700 mb-4">Order Successfully Placed!</h3>
                        <p className="text-gray-700 text-lg">Thank you for shopping with us. Your order will be delivered soon.</p>
                        <div className="text-green-600 text-6xl mt-6 animate-bounce">✅</div>
                    </div>
                ) : (
                    <div className="bg-white shadow-xl rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Shipping Information</h3>

                        {/* Shipping Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name input */}
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            {/* Email input */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            {/* Address input */}
                            <input
                                type="text"
                                name="address"
                                placeholder="Street Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            {/* City and Zip input */}
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-1/2 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />

                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="Zip Code"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="w-1/2 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Payment method selection */}
                            <h3 className="text-xl font-semibold mt-6 text-gray-700">💳 Payment Method</h3>
                            <div className="flex items-center space-x-4">

                                {/* Credit Card Option */}
                                <label className={`flex items-center cursor-pointer border p-3 rounded-lg w-1/3 bg-gray-100 hover:bg-blue-100 transition ${formData.paymentMethod === "Credit Card" ? "ring-2 ring-blue-500" : ""}`}>
                                    <FaCreditCard className="text-blue-600 text-xl mr-2" />
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Credit Card"
                                        checked={formData.paymentMethod === "Credit Card"}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    Credit Card
                                </label>

                                {/* Paypal Option */}
                                <label className={`flex items-center cursor-pointer border p-3 rounded-lg w-1/3 bg-gray-100 hover:bg-blue-100 transition ${formData.paymentMethod === "Paypal" ? "ring-2 ring-blue-500" : ""}`}>
                                    <FaPaypal className="text-blue-600 text-xl mr-2" />
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Paypal"
                                        checked={formData.paymentMethod === "Paypal"}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    Paypal
                                </label>

                                {/* Cash on Delivery Option */}
                                <label className={`flex items-center cursor-pointer border p-3 rounded-lg w-1/3 bg-gray-100 hover:bg-blue-100 transition ${formData.paymentMethod === "Cash on delivery" ? "ring-2 ring-blue-500" : ""}`}>
                                    <FaMoneyBillWaveAlt className="text-blue-600 text-xl mr-2" />
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Cash on delivery"
                                        checked={formData.paymentMethod === "Cash on delivery"}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    Cash
                                </label>
                            </div>

                            {/* Order Summary Section */}
                            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">🧾 Order Summary</h3>
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex justify-between text-gray-700 border-b pb-2">
                                        <span>{item.title} (x{item.quantity})</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Total Price */}
                            <div className="flex justify-between font-bold text-xl mt-6 text-gray-900 border-t pt-4">
                                <span>Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>

                            {/* Place Order Button */}
                            <button
                                type="submit"
                                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300 text-lg font-semibold shadow-md hover:scale-[1.02]"
                            >
                                🛒 Place Order
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkout;
