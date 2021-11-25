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
        knex("page_deletions AS pd")
          .leftJoin("pages AS p", "p.id", "pd.page_id")
          .leftJoin("users AS ud", "ud.id", "pd.deleted_by_user")
          .leftJoin("users AS um", "um.id", "pd.last_modified_by_user")
          .select(
            "pd.id",
            "pd.page_id",
            { title: "p.title" },
            "pd.reason",
            "p.is_marked_for_deletion",
            "pd.is_delete_date_set",
            "pd.time_to_delete",
            "pd.is_notification_requested",
            "pd.is_subscriber_message_set",
            "pd.subscriber_message",
            { deleted_by_user_id: "pd.deleted_by_user" },
            { deleted_by_username: "ud.username" },
            { last_modified_by_user_id: "pd.last_modified_by_user" },
            { last_modified_by_username: "um.username" },
            "pd.time_created",
            "pd.time_last_updated"
          )
          .distinctOn("pd.page_id") // Limit the results to one instance of each page ID
          .orderBy("pd.page_id", "ASC")
          .orderBy("pd.time_created", "DESC") // Use the latest instance of a page ID
          .where({
            "p.is_marked_for_deletion": true,
            "pd.deleted_by_user": userId,
          })
          .orWhere({
            "p.is_marked_for_deletion": true,
            "pd.last_modified_by_user": userId,
          })
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
