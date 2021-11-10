const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const pageReviewRouter = express.Router();
pageReviewRouter.use(jwt());
pageReviewRouter.use(errorHandler);

// Get page review schedule for all pages
pageReviewRouter.get("/", (req, res) => {
  console.log("GET /api/page-review");

  knex("pages")
    .select(
      "id",
      "title",
      "time_last_updated",
      "review_frequency_months",
      "is_marked_for_deletion"
    )
    .whereNot("is_marked_for_deletion", true)
    .orderBy("time_last_updated", "desc")
    .then((results) => {
      console.log("results: ", results);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/page-review knex call: ", error);
      res.status(401).send();
    });
});

// Get page review schedule for a single user
pageReviewRouter.get("/:username", (req, res) => {
  console.log(`GET /api/page-review/${req?.params?.username}`);

  // Get the user ID based on the username
  knex("users")
    .select("id")
    .where("username", req?.params?.username)
    .then((rows) => {
      console.log("rows: ", rows);
      const userId = rows?.[0]?.id;

      // Get pages for user
      knex("pages")
        .select("id", "title", "time_last_updated", "review_frequency_months")
        .where({
          created_by_user: userId,
          is_marked_for_deletion: false,
        })
        .orWhere({
          owned_by_user: userId,
          is_marked_for_deletion: false,
        })
        .orWhere({
          last_modified_by_user: userId,
          is_marked_for_deletion: false,
        })
        .orderBy("time_last_updated", "desc")
        .then((results) => {
          console.log("results: ", results);
          res.status(200).json(results);
        })
        .catch((error) => {
          console.log(
            `error in GET /api/page-review/${userId} knex call: `,
            error
          );
          res.status(401).send();
        });
    })
    .catch((error) => {
      console.log(
        `error in GET /api/page-review/${req?.params?.username} knex action to get user ID: `,
        error
      );
      res.status(404).send();
    });
});

module.exports = pageReviewRouter;
