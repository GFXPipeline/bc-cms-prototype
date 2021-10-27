const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const recycleBinRouter = express.Router();
recycleBinRouter.use(jwt());
recycleBinRouter.use(errorHandler);

// Get recycled pages for a single user
recycleBinRouter.get("/:username/pages", (req, res) => {
  console.log(`GET /api/${req?.params?.username}/pages`);

  // Check that the username exists and store user ID
  let userId;
  knex("users")
    .select("id")
    .where("username", req?.params?.username)
    .then((rows) => {
      console.log(
        `rows in GET /api/recycle-bin/${req?.params?.username}/pages check for user: `,
        rows
      );
      if (rows?.length > 0) {
        userId = rows[0]?.id;

        // Select all page deletions table entries created by or last modified by user
        knex("page_deletions")
          .select("*")
          .where("deleted_by_user", userId)
          .orWhere("last_modified_by_user", userId)
          .then((rows) => {
            console.log(
              `rows in GET /api/recycle-bin/${req?.params?.username}/pages: `,
              rows
            );

            res.status(200).send(rows);
          })
          .catch((error) => {
            console.log(
              `error in GET /api/recycle-bin/${req?.params?.username}/pages: `,
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
        `error in GET /api/recycle-bin/${req?.params?.username}/pages: `,
        error
      );
      return res.status(500).send("500");
    });
});

module.exports = recycleBinRouter;
