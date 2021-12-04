const express = require("express");
const { v4: uuidv4 } = require("uuid");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const getComponentsInHtmlData = require("./functions/getComponentsInHtmlData");
const updatePageComponentMapping = require("./functions/updatePageComponentMapping");

const pageRouter = express.Router();
pageRouter.use(jwt());
pageRouter.use(errorHandler);

// Single page
pageRouter.get("/:id", (req, res) => {
  console.log(`GET /api/page/${req.params.id}`);

  knex("pages")
    .select("*")
    .where("id", req.params.id)
    .then((results) => {
      console.log(`results in GET /api/page/${req.params.id}`);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(`error in GET /api/page/${req.params.id} knex call: `, error);
      res.status(401).send();
    });
});

// Create new page route
pageRouter.post("/", (req, res) => {
  console.log(`POST /api/page`);

  // Get the user ID based on the username
  knex("users")
    .select("id")
    .where("username", req?.body?.username)
    .then((rows) => {
      const userId = rows?.[0]?.id;
      const newPageId = uuidv4();
      const newPageTemplate = req?.body?.template || "base-template";
      const newPageType = req?.body?.name || "topic";

      // Get the page type ID
      knex("page_types")
        .select("id")
        .where("name", newPageType)
        .then((rows) => {
          const newPageTypeId = rows?.[0]?.id;

          // If request didn't contain page data, get data from template and insert
          if (!req?.body?.data) {
            knex("page_templates")
              .select("data")
              .where("name", newPageTemplate)
              .then((row) => {
                knex("pages")
                  .insert({
                    id: newPageId,
                    title: req?.body?.title,
                    nav_title: req?.body?.navTitle,
                    intro: row?.[0]?.intro,
                    data: row?.[0]?.data,
                    page_type: newPageTypeId,
                    review_frequency_months: parseInt(
                      req?.body?.reviewFrequencyMonths
                    ),
                    created_by_user: userId,
                    owned_by_user: userId,
                    last_modified_by_user: userId,
                  })
                  .then((rows) => {
                    res.status(200).send(newPageId);
                  })
                  .catch((error) => {
                    console.log(
                      "error in POST /api/page knex action to insert page: ",
                      error
                    );
                    res.status(404).send();
                  });
              })
              .catch((error) => {
                console.log(
                  "error in POST /api/page knex action to get template data: ",
                  error
                );
                res.status(404).send();
              });
          } else {
            // Else the request contains page data, insert using that data
            knex("pages")
              .insert({
                id: newPageId,
                title: req?.body?.title,
                nav_title: req?.body?.navTitle,
                data: req?.body?.data,
                page_type: newPageTypeId,
                created_by_user: userId,
                owned_by_user: userId,
                last_modified_by_user: userId,
              })
              .then((rows) => {
                res.status(200).send(newPageId);
              })
              .catch((error) => {
                console.log(
                  "error in POST /api/page knex action to insert page: ",
                  error
                );
                res.status(404).send();
              });
          }
        })
        .catch((error) => {
          console.log(
            "error in POST /api/page knex action to get page_type ID: ",
            error
          );
          res.status(404).send();
        });
    })
    .catch((error) => {
      console.log(
        "error in POST /api/page knex action to get user ID: ",
        error
      );
      res.status(404).send();
    });
});

// Clone page route
pageRouter.post("/:id", (req, res) => {
  console.log(`POST /page/id/${req?.params?.id}`);

  // Check that the user doing the submission exists and store user ID
  let userId;
  knex("users")
    .select("id")
    .where("username", req?.body?.username)
    .then((rows) => {
      console.log("rows in PUT /api/page check for user: ", rows);
      if (rows?.length > 0) {
        userId = rows[0]?.id;
      } else {
        // Username not in database, return early
        return res.status(404).send("404 user not found");
      }
    })
    .catch((error) => {
      // Error getting username from database, return early
      console.log("error in PUT /api/page check for user: ", error);
      return res.status(500).send("500");
    });

  // Check that requested page to clone exists
  knex("pages")
    .select("*")
    .where("id", req?.params?.id)
    .then((rows) => {
      // Attempt the insertion here
      const { parent_page_id, data, intro, nav_title, title } = rows[0];
      const numberOfCopies = parseInt(req?.body?.numberOfCopies || 1);
      let newPageIds = [];
      let newPageRecords = [];

      // Generate UUIDs for the pages to be created
      for (let x = 0; x < numberOfCopies; x++) {
        newPageIds.push(uuidv4());
      }

      // Generate an array of pages to be inserted in a single Knex action
      newPageIds.forEach((id, index) => {
        newPageRecords.push({
          id: id,
          parent_page_id: parent_page_id,
          title: `${title} - copy ${index + 1}`,
          nav_title: `${nav_title} - copy ${index + 1}`,
          intro: intro,
          data: data,
          created_by_user: userId,
          owned_by_user: userId,
          last_modified_by_user: userId,
        });
      });

      knex("pages")
        .insert(newPageRecords)
        .then((success) => {
          return res.status(200).send(newPageIds);
        })
        .catch((error) => {
          console.log(
            `error in POST /api/page/${req?.params?.id} insertion attempt: `,
            error
          );
        });
    })
    .catch((error) => {
      console.log(
        `error in POST /api/page/${req?.params?.id} check for existing page: `,
        error
      );
      return res.status(404).send("404");
    });
});

// Update page route
pageRouter.put("/:id", (req, res) => {
  console.log(`PUT /api/page/${req.params.id}`);

  // Check that the user doing the submission exists and store user ID
  let userId;
  knex("users")
    .select("id")
    .where("username", req?.body?.username)
    .then((rows) => {
      console.log("rows in PUT /api/page check for user: ", rows);
      if (rows?.length > 0) {
        userId = rows[0]?.id;
      } else {
        // Username not in database, return early
        return res.status(404).send("404 user not found");
      }
    })
    .catch((error) => {
      // Error getting username from database, return early
      console.log("error in PUT /api/page check for user: ", error);
      return res.status(500).send("500");
    });

  // Check that submitted page ID exists
  knex("pages")
    .select("*")
    .where("id", req.params.id)
    .then((rows) => {
      console.log(`Page ID ${req.params.id} found in pages table.`);
      if (rows?.length > 0) {
        // Requested page ID exists, attempt the update
        knex("pages")
          .where("id", req.params.id)
          .update({
            data: req?.body?.data,
            intro: req?.body?.intro,
            is_on_this_page: req?.body?.isOnThisPage,
            title: req?.body?.title,
            nav_title: req?.body?.navTitle,
            last_modified_by_user: userId,
            time_last_updated: knex.fn.now(),
          })
          .then((success) => {
            // Send page update success
            res.status(200).send("200");

            if (req?.body?.data) {
              // Check for component usage
              const components = getComponentsInHtmlData(req.body.data);

              // Update the page_component_mapping table with current components
              updatePageComponentMapping(req.params.id, components);
            }
          })
          .catch((error) => {
            // Page update failure
            console.log("error in PUT /api/page update page: ", error);
            res.status(500).send("500");
          });
      } else {
        // No page matches the requested ID
        res.status(404).send("404 page not found");
      }
    })
    .catch((error) => {
      console.log("error in PUT /api/page check for page: ", error);
      res.status(500).send("500");
    });
});

pageRouter.delete("/:id", (req, res) => {
  console.log(`DELETE /api/page/${req?.params?.id}`);

  // Check that the user doing the submission exists and store user ID
  let userId;
  knex("users")
    .select("id")
    .where("username", req?.body?.username)
    .then((rows) => {
      console.log("rows in DELETE /api/page check for user: ", rows);
      if (rows?.length > 0) {
        userId = rows[0]?.id;
        console.log("userId: ", userId);
      } else {
        // Username not in database, return early
        return res.status(404).send("404 user not found");
      }
    })
    .catch((error) => {
      // Error getting username from database, return early
      console.log("error in DELETE /api/page check for user: ", error);
      return res.status(500).send("500");
    });

  // Check that submitted page ID exists
  knex("pages")
    .select("*")
    .where("id", req.params.id)
    .then((rows) => {
      console.log("rows in DELETE /api/page check for page: ", rows);
      if (rows?.length > 0) {
        // Requested page ID exists, attempt to mark for deletion
        knex("pages")
          .where("id", req.params.id)
          .update({
            is_marked_for_deletion: true,
          })
          .then((success) => {
            // Page is marked for deletion in pages table,
            // create entry in deletions table.
            knex("page_deletions")
              .insert({
                page_id: req.params.id,
                is_hard_delete:
                  req?.body?.deleteType === "hard-delete" ? true : false,
                reason: req?.body?.reason,
                is_delete_date_set: req?.body?.isDeleteDateSet,
                time_to_delete: req?.body?.time_to_delete || new Date(),
                is_notification_requested: req?.body?.isNotificationRequested,
                is_subscriber_message_set: req?.body?.isSubscriberMessageSet,
                subscriber_message: req?.body?.subscriberMessage,
                deleted_by_user: userId,
                last_modified_by_user: userId,
              })
              .then((success) => {
                console.log(
                  `Inserted ${success?.rowCount} row into deletions table for page ID: ${req.params.id}`
                );
                res.status(202).send("202");
              })
              .catch((error) => {
                console.log(
                  "error in DELETE /api/page create deletion: ",
                  error
                );
                res.status(500).send("500");
              });
          })
          .catch((error) => {
            // Deletion request failed
            console.log("error in DELETE /api/page update page: ", error);
            res.status(500).send("500");
          });
      } else {
        // No page matches the requested ID
        res.status(404).send("404 page not found");
      }
    })
    .catch((error) => {
      console.log("error in DELETE /api/page check for page: ", error);
      res.status(500).send("500");
    });
});

pageRouter.post("/undelete/:id", (req, res) => {
  // Check that the user doing the submission exists and store user ID
  let userId;
  knex("users")
    .select("id")
    .where("username", req?.body?.username)
    .then((rows) => {
      console.log("rows in POST /api/page/undelete check for user: ", rows);
      if (rows?.length > 0) {
        userId = rows[0]?.id;
        console.log("userId: ", userId);

        // Check that page exists before attempting undelete
        knex("pages")
          .select("*")
          .where("id", req.params.id)
          .then((rows) => {
            console.log(
              "rows in POST /api/page/undelete check for page: ",
              rows
            );
            if (rows?.length > 0) {
              // Requested page ID exists, attempt to mark for deletion
              knex("pages")
                .where("id", req?.params?.id)
                .update({
                  is_marked_for_deletion: false,
                })
                .then((success) => {
                  res.status(200).send(`Un-deleted ${req?.params?.id}`);

                  // Check for `reason` on body of request, use that to populate page_restorations
                  return knex("page_restorations").insert({
                    page_id: req?.params?.id,
                    reason: req?.body?.reason || "",
                    created_by_user: userId,
                  });
                })
                .catch((error) => {
                  return res
                    .status(500)
                    .send(`Couldn't un-delete ${req?.params?.id}`);
                });
            } else {
              // Page ID not in database
              return res.status(404).send("404 page not found");
            }
          })
          .catch((error) => {
            return res.status(500).send("500");
          });
      } else {
        // Username not in database, return early
        return res.status(404).send("404 user not found");
      }
    })
    .catch((error) => {
      // Error getting username from database, return early
      console.log("error in POST /api/page/undelete check for user: ", error);
      return res.status(500).send("500");
    });
});

module.exports = pageRouter;
