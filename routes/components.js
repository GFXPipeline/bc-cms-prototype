const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const componentsRouter = express.Router();
componentsRouter.use(jwt());
componentsRouter.use(errorHandler);

// All pages
componentsRouter.get("/all", (req, res) => {
  console.log("GET /api/components/all");

  knex("components")
    .select("id", "title")
    .then((results) => {
      console.log("results: ", results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/components/all knex call: ", error);
      res.status(401).send();
    });
});

module.exports = componentsRouter;
