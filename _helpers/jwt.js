const expressJwt = require("express-jwt");

function jwt() {
  const jwtSecret = process.env.JWT_SECRET;

  return expressJwt({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
    path: [
      // Public routes that don't require authentication
      "/",
      "/api/users/authenticate",
    ],
  });
}

module.exports = jwt;
