const expressJwt = require("express-jwt");

function jwt() {
  const jwtSecret = process.env.JWT_SECRET;

  return expressJwt({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
    path: [
      // Public routes that don't require authentication
      "/api/pages/all", // TODO: Remove this after adding login to front-end
      "/api/users/authenticate",
      "/api/users/update", // TODO: Remove this after adding login to front-end
    ],
  });
}

module.exports = jwt;
