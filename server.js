"use strict";

// Server
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(jwt()); // JWT authentication to secure API
app.use(errorHandler);  // Global error handler

// Environment
const ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;

// Database
const db = require("./db");
const knexConfig = require("./knexfile");
db.init(app, knexConfig[ENV]);
const knex = db.handle();
if (ENV === "development") {
  knex.on("query", console.log);
}

// Routes
const userRoutes = require("./routes/user");
const pageRoutes = require("./routes/page");

// API routes
app.use("/api/users", userRoutes);
app.use("/api/pages", pageRoutes);

// Use React app's build directory as static mount point
app.use(express.static(path.join(__dirname, "app", "build")));

// React routes
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
