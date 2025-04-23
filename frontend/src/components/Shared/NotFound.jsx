import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 text-gray-800 px-4">
            {/* 404 Error Code */}
            <h1 className="text-[9rem] font-extrabold text-blue-600 drop-shadow-xl animate-bounce">404</h1>

            {/* Error Message */}
            <p className="text-3xl font-bold mt-4 text-gray-800">Oops! Page Not Found</p>
            <p className="text-lg mt-2 text-gray-500 max-w-xl text-center">
                The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
            </p>

            {/* Button to Home */}
            <Link
                to="/"
                className="mt-6 px-6 py-3 flex items-center gap-2 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105"
            >
                <FaArrowLeft /> Go Back Home
            </Link>
        </div>
    );
}

export default NotFound;
