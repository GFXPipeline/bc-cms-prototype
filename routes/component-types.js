const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const componentTypesRouter = express.Router();
componentTypesRouter.use(jwt());
componentTypesRouter.use(errorHandler);

// Get a list of available component types
componentTypesRouter.get("/", (req, res) => {
  console.log("GET /api/component-types");

  knex("component_types")
    .select("id", "name", "display_name", "description")
    .then((results) => {
      console.log("results: ", results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/component-types knex call: ", error);
      res.status(401).send();
    });
});

module.exports = componentTypesRouter;
