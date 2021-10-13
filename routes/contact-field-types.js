const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const contactFieldTypesRouter = express.Router();
contactFieldTypesRouter.use(jwt());
contactFieldTypesRouter.use(errorHandler);

// Get a list of available component types
contactFieldTypesRouter.get("/", (req, res) => {
  console.log("GET /api/contact-field-types");

  knex("contact_field_types")
    .select("id", "name", "display_name", "description")
    .then((results) => {
      console.log("results: ", results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/contact-field-types knex call: ", error);
      res.status(401).send();
    });
});

module.exports = contactFieldTypesRouter;
