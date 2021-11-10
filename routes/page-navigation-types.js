const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const pageNavigationTypesRouter = express.Router();
pageNavigationTypesRouter.use(jwt());
pageNavigationTypesRouter.use(errorHandler);

// All page types
pageNavigationTypesRouter.get("/", (req, res) => {
  console.log("GET /api/page-navigation-types/");

  knex("page_navigation_types")
    .select("*")
    .orderBy("display_order", "asc")
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/page-navigation-types knex call: ", error);
      res.status(401).send();
    });
});

module.exports = pageNavigationTypesRouter;
