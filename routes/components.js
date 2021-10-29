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
    .join("component_types", "component_types.id", "components.type_id")
    .leftJoin("users", "users.id", "components.last_modified_by_user") // leftJoin to include all components regardless of user status
    .select(
      "components.id",
      "components.name",
      "components.title",
      "components.time_last_updated",
      "components.is_published",
      { owned_by_user: "users.username" },
      { last_modified_by_user: "users.username" },
      { type_id: "component_types.id" },
      { type_name: "component_types.name" },
      { type_display_name: "component_types.display_name" }
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
    .join("component_types", "component_types.id", "components.type_id")
    .select(
      "components.id",
      { name: "components.name" },
      { type_name: "component_types.name" },
      { type_display_name: "component_types.display_name" }
    )
    .where("component_types.id", req?.params?.id)
    .then((results) => {
      console.log("results: ", results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(
        `error in GET /api/components/type/${req?.params?.id} knex call: `,
        error
      );
      res.status(401).send();
    });
});

module.exports = componentsRouter;
