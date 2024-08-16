// error-middleware.js

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500; // Default to 500 if status is not set
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
