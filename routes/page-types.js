const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const pageTypesRouter = express.Router();
pageTypesRouter.use(jwt());
pageTypesRouter.use(errorHandler);

// All page types
pageTypesRouter.get("/", (req, res) => {
  console.log("GET /api/page-types/");

  knex("page_types")
    .select("*")
    .orderBy("display_order", "asc")
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/page-types knex call: ", error);
      res.status(401).send();
    });
});

module.exports = pageTypesRouter;
