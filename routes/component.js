const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const componentRouter = express.Router();
componentRouter.use(jwt());
componentRouter.use(errorHandler);

// Read component
componentRouter.get("/:id", (req, res) => {
  console.log(`GET /api/component/${req.params.id}`);

  knex("components")
    .join("component_types", "component_types.id", "components.type_id")
    .select(
      "components.*",
      { type_name: "component_types.name" },
      { type_display_name: "component_types.display_name" }
    )
    .where("components.id", req.params.id)
    .then((results) => {
      console.log(`results in GET /api/component/${req.params.id}: `, results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(
        `error in GET /api/component/${req.params.id} knex call: `,
        error
      );
      res.status(401).send();
    });
});

// Update component
componentRouter.put("/:id", (req, res) => {
  console.log(`PUT /api/component/${req.params.id}`);

  // Check that the user doing the submission exists and store user ID
  let userId;
  knex("users")
    .select("id")
    .where("username", req?.body?.username)
    .then((rows) => {
      console.log(
        `rows in PUT /api/component/${req.params.id} check for user: `,
        rows
      );
      if (rows?.length > 0) {
        userId = rows[0]?.id;

        // Check that submitted component ID exists
        knex("components")
          .select("*")
          .where("id", req.params.id)
          .then((rows) => {
            console.log(
              `rows in PUT /api/component/${req.params.id} check for page: `,
              rows
            );
            if (rows?.length > 0) {
              // Requested component ID exists, attempt the update
              knex("components")
                .where("id", req.params.id)
                .update({
                  name: req?.body?.name,
                  title: req?.body?.title,
                  intro: req?.body?.intro,
                  fields: req?.body?.fields,
                  last_modified_by_user: userId,
                  time_last_updated: knex.fn.now(),
                })
                .then((success) => {
                  // Component update success
                  res.status(200).send("200");
                })
                .catch((error) => {
                  // Component update failure
                  console.log(
                    `error in PUT /api/component/${req.params.id} update component: `,
                    error
                  );
                  res.status(500).send("500");
                });
            } else {
              // No component matches the requested ID
              res.status(404).send("404 component not found");
            }
          })
          .catch((error) => {
            console.log(
              `error in PUT /api/component/${req.params.id} check for page: `,
              error
            );
            res.status(500).send("500");
          });
      } else {
        // Username not in database, return early
        return res.status(404).send("404 user not found");
      }
    })
    .catch((error) => {
      // Error getting username from database, return early
      console.log(
        `error in PUT /api/component/${req.params.id} check for user: `,
        error
      );
      return res.status(500).send("500");
    });
});

module.exports = componentRouter;
