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

// Get the contact field type ID for a given contact field option
contactFieldTypesRouter.get("/option/:optionId", (req, res) => {
  console.log(`GET /api/contact-field-types/option/${req?.params?.optionId}`);

  knex("contact_field_options")
    .join("contact_field_types", "contact_field_types.id", "contact_field_options.type_id")
    .select("contact_field_types.name", "contact_field_options.type_id")
    .where("contact_field_options.id", req?.params?.optionId)
    .then((results) => {
      console.log("results: ", results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(`error in GET /api/contact-field-types/option/${req?.params?.optionId} knex call: `, error);
      res.status(401).send();
    });
})

module.exports = contactFieldTypesRouter;
