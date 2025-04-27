import LoadingSpinner from "../Shared/LoadingSpinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "../../utils/axiosInstance";

function ProductDetail() {
    const { id } = useParams(); // Get the product ID from the URL params
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch product details from backend API
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                const data = await response.json();
                setProduct(data);
                // Default selected image: use thumbnail if available, otherwise first image
                setSelectedImage(data.thumbnail || data.images?.[0]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login to add items to your cart.");
                return;
            }

            // Send productId and quantity to backend API for adding to cart
            const response = await axios.post(
                "http://localhost:5000/api/cart",
                {
                    productId: product._id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send user token in header for authentication
                    },
                }
            );

            toast.success(`${product.title} added to cart!`, {
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
            });

            // Dispatch a custom event so that Header can update cart item count
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("Failed to add to cart. Try again.");
        }
    };

    // Show loading spinner while fetching product
    if (loading) return <LoadingSpinner />;

    // Show error message if fetching product fails
    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center mt-6 max-w-md mx-auto font-semibold text-lg">
                <p className="flex items-center justify-center space-x-2">
                    <span>⚠️</span>
                    <span>Error: {error}</span>
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg font-sans">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Product Images Section */}
                <div className="flex flex-col items-center md:w-1/2">
                    <img
                        src={selectedImage}
                        alt={product.title}
                        className="w-full rounded-lg shadow-lg transition transform hover:scale-105"
                    />
                    <div className="flex gap-2 mt-4">
                        {/* Thumbnail images for selecting different product views */}
                        {product.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Thumbnail"
                                className="w-16 h-16 rounded-md cursor-pointer border-2 border-gray-300 hover:border-blue-500"
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-wide">{product.title}</h1>
                    <p className="text-gray-600 mt-2 text-lg">{product.description}</p>
                    <p className="mt-2 font-semibold text-blue-700 text-lg">
                        <span className="font-bold">Brand:</span> {product.brand || "N/A"}
                    </p>

                    {/* Product Tags */}
                    <div className="mt-4 flex gap-2 flex-wrap">
                        {product.tags?.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Rating and Discount Info */}
                    <p className="text-yellow-500 mt-1 text-lg font-semibold">⭐ {product.rating} / 5</p>
                    <p className="mt-2 text-lg font-bold text-red-600">{product.discountPercentage}% Off</p>

                    {/* Price and Discounted Price */}
                    <div className="mt-4">
                        <p className="text-2xl font-bold text-green-600">${product.price}</p>
                        {product.discountPercentage > 0 && (
                            // Show original price with line-through if discount available
                            <p className="text-gray-500 text-sm line-through">
                                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                            </p>
                        )}
                    </div>

                    {/* Stock Information */}
                    <p className={`mt-2 text-lg font-medium ${product.stock > 10 ? "text-gray-600" : "text-red-500"}`}>
                        {product.stock > 10 ? "✔️ In Stock" : " ⚠️ Limited Stock"}
                    </p>

                    {/* Warranty, Shipping, Return Policy, Weight and Dimensions */}
                    <div className="mt-4 text-lg text-gray-600">
                        <span className="font-bold text-gray-700">Warranty:</span> {product.warrantyInformation}
                    </div>
                    <div className="text-lg text-gray-600">
                        <span className="font-bold text-gray-700">Shipping:</span> {product.shippingInformation}
                    </div>
                    <div className="text-lg text-gray-600">
                        <span className="font-bold text-gray-700">Return Policy:</span> {product.returnPolicy}
                    </div>
                    <div className="text-lg text-gray-600">
                        <span className="font-bold text-gray-700">Weight:</span> {product.weight}g
                    </div>
                    <div className="text-lg text-gray-600">
                        <span className="font-bold text-gray-700">Dimensions:</span>{" "}
                        {product.dimensions?.width}cm x {product.dimensions?.height}cm x {product.dimensions?.depth}cm
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-md"
                    >
                        Add to Cart <FaShoppingCart size={22} />
                    </button>
                </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                <div className="mt-4 space-y-4">
                    {product.reviews?.map((review, index) => (
                        <div key={index} className="p-4 border rounded-md shadow-sm bg-gray-50">
                            <p className="font-semibold text-gray-800 text-lg">{review.reviewerName}</p>
                            <p className="text-yellow-500 text-lg">⭐ {review.rating} / 5</p>
                            <p className="text-gray-600 mt-1 text-lg">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
