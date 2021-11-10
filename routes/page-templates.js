const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const pageTemplatesRouter = express.Router();
pageTemplatesRouter.use(jwt());
pageTemplatesRouter.use(errorHandler);

// All page types
pageTemplatesRouter.get("/", (req, res) => {
  console.log("GET /api/page-templates/");

  knex("page_templates")
    .select("*")
    .orderBy("display_order", "asc")
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/page-templates knex call: ", error);
      res.status(401).send();
    });
});

module.exports = pageTemplatesRouter;
