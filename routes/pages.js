const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const pagesRouter = express.Router();
pagesRouter.use(jwt());
pagesRouter.use(errorHandler);

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

module.exports = pagesRouter;
