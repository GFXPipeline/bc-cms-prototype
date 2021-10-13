const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const contactFieldOptionsRouter = express.Router();
contactFieldOptionsRouter.use(jwt());
contactFieldOptionsRouter.use(errorHandler);

// Get a list of available component types
contactFieldOptionsRouter.get("/", (req, res) => {
  console.log("GET /api/contact-field-options");

  knex("contact_field_options")
    .select("id", "type_id", "name", "display_name")
    .then((results) => {
      console.log("results: ", results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/contact-field-options knex call: ", error);
      res.status(401).send();
    });
});

module.exports = contactFieldOptionsRouter;
