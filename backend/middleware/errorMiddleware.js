const errorHandler = (err, req, res, next) => {
  // Set custom status code if provided by thrown error
  const statusCode = err.statusCode || 500;

  // Use the error's own message if available
  const message = err.message || "Internal Server Error";
  
  // Send a JSON response with the error details
  res.status(statusCode).json({
    message,
    // Only show stack error in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
