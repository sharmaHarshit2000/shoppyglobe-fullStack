import { useSelector, useDispatch } from "react-redux";
import { FaCreditCard, FaPaypal, FaMoneyBillWaveAlt } from "react-icons/fa";
import { useState } from "react";
import { clearCart } from "../redux/cartSlice";

function Checkout() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    // Calculate total price from cart items
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // State for form input values
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        paymentMethod: "Credit Card", // Default selected payment method
    });

    const [orderPlaced, setOrderPlaced] = useState(false); // Flag to check if order is placed

    // Update form data on input change
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();

        // Check if any form field is empty
        if (Object.values(formData).some((field) => field.trim() === "")) {
            alert("Please fill all fields before placing the order");
            return;
        }

        // Place the order and clear the cart
        setOrderPlaced(true);
        dispatch(clearCart());
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700">🛒 Checkout</h2>

                {/* Show confirmation message if order is placed */}
                {orderPlaced ? (
                    <div className="text-center bg-green-100 p-10 rounded-2xl shadow-xl">
                        <h3 className="text-3xl font-bold text-green-700 mb-4">Order Successfully Placed!</h3>
                        <p className="text-gray-700 text-lg">Thank you for shopping with us. Your order will be delivered soon.</p>
                        <div className="text-green-600 text-6xl mt-6 animate-bounce">✅</div>
                    </div>
                ) : (
                    
                    <div className="bg-white shadow-xl rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Shipping Information</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name */}
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            {/* Email */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            {/* Address */}
                            <input
                                type="text"
                                name="address"
                                placeholder="Street Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            {/* City and Zip Code */}
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

                            {/* Payment Method Selection */}
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

                                {/* Cash Option */}
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

                            {/* Order Summary */}
                            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">🧾 Order Summary</h3>
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-gray-700 border-b pb-2">
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

                            {/* Submit Order Button */}
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
