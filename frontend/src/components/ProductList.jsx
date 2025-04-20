import { useState } from "react";
import ProductItem from "./ProductItem";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "./LoadingSpinner";

function ProductList() {
    // ✅ Corrected API URL (removed extra 'https://')
    const { loading, error, data } = useFetch("http://localhost:5000/api/products");
    const [searchQuery, setSearchQuery] = useState("");

    if (loading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-20 px-4">
                <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg text-center font-semibold text-lg animate-bounce">
                    ❌ Oops! Something went wrong.
                </div>
                <div className="text-gray-700 mt-4 text-center text-base bg-red-100 px-4 py-2 rounded-md max-w-lg">
                    <span className="font-semibold">Error:</span> {error}
                </div>
            </div>
        );
    }

    // ✅ Guard in case `data` is undefined, and handle the case where `data` might be an array directly
    const allProducts = Array.isArray(data) ? data : [];

    // ✅ Filter products based on search input
    const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto py-12 px-4">
            {/* Welcome Message */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-sm">
                    🛍 Welcome to <span className="text-blue-600">ShoppyGlobe</span>
                </h1>
                <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto font-semibold">
                    Discover high quality products at the best prices. Shop now and enjoy amazing deals! ✨
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-10">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductItem key={product._id || product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 font-medium text-lg">
                    No products found matching "<span className="font-bold">{searchQuery}</span>"
                </div>
            )}
        </div>
    );
}

export default ProductList;
