"use strict";

// Server
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

// Use React app's build directory as static mount point
app.use(express.static(path.join(__dirname, 'app', 'build')));

// API routes
app.get("/api/pages", (req, res) => {
  knex("pages")
    .select(["*"])
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(error);
    });
});

// React routes
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
