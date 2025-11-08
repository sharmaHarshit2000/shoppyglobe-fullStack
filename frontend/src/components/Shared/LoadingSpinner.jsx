function LoadingSpinner() {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-center">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin shadow-xl drop-shadow-md mb-4"></div>
            <p className="text-blue-700 text-xl font-semibold animate-pulse">
                Loading...
            </p>
        </div>
    );
}

export default LoadingSpinner;
