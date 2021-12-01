const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const pagesRouter = express.Router();
pagesRouter.use(jwt());
pagesRouter.use(errorHandler);

// Queries
const getPageTree = fs
  .readFileSync(
    path.join(__dirname, "..", "db", "queries", "get_page_tree.sql")
  )
  .toString();

// All pages
pagesRouter.get("/all", (req, res) => {
  console.log("GET /api/pages/all");

  knex("pages")
    .select("*")
    .where("is_marked_for_deletion", false)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/pages/all knex call: ", error);
      res.status(401).send();
    });
});

pagesRouter.get("/tree", (req, res) => {
  console.log("GET /api/pages/tree");

  knex
    .raw(getPageTree)
    .then((results) => {
      res.status(200).json(results?.rows[0]);
    })
    .catch((error) => {
      console.log("error in GET /api/pages/tree knex call: ", error);
      res.status(401).send();
    });
});

module.exports = pagesRouter;
