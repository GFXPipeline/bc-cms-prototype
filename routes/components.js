const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const componentsRouter = express.Router();
componentsRouter.use(jwt());
componentsRouter.use(errorHandler);

// Get a list of all components
componentsRouter.get("/", (req, res) => {
  console.log("GET /api/components");

  knex("components")
    .join("component_types", "component_types.id", "components.type")
    .select(
      "components.id",
      "components.title",
      "component_types.name",
      "component_types.display_name"
    )
    .then((results) => {
      console.log("results: ", results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/components knex call: ", error);
      res.status(401).send();
    });
});

// Get a list of all components of a certain type
componentsRouter.get("/type/:id", (req, res) => {
  console.log(`GET /api/components/type/${req?.params?.id}`);

  knex("components")
    .join("component_types", "component_types.id", "components.type")
    .select("components.id", "components.title", "component_types.name", "component_types.display_name")
    .then((results) => {
      console.log("results: ", results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(`error in GET /api/components/type/${req?.params?.id} knex call: `, error);
      res.status(401).send();
    });
});

module.exports = componentsRouter;
