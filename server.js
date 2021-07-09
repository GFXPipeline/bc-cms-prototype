"use strict";

// Server
const express = require("express");
const cors = require("cors");
const app = express();
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

// GET route to index
app.get("/", (req, res) => {
  knex("pages")
    .select(["*"])
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
