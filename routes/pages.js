const express = require("express");
const app = express();
const ENV = process.env.NODE_ENV || "development";
const fs = require("fs");
const path = require("path");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");

// Database
const db = require("../db");
const knexConfig = require("../knexfile");
db.init(app, knexConfig[ENV]);
const knex = db.handle();

// Queries
const getCurrentPages = fs
  .readFileSync(
    path.join(__dirname, "..", "db", "queries", "get_current_pages.sql")
  )
  .toString();

const pagesRouter = express.Router();
pagesRouter.use(jwt());
pagesRouter.use(errorHandler);

// All pages
pagesRouter.get("/all", (req, res) => {
  console.log("GET /api/pages/all");

  knex
    .raw(getCurrentPages)
    .then((results) => {
      res.status(200).json(results?.rows);
    })
    .catch((error) => {
      console.log("error in GET /api/pages/all knex call: ", error);
      res.status(401).send();
    });
});

module.exports = pagesRouter;
