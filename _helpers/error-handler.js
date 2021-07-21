function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // Send a custom application error
    return res.status(400).json({ message: err });
  }

  if (err?.name === "UnauthorizedError") {
    // JWT authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  // Default 500 error
  return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
