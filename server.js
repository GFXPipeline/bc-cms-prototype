"use strict";

// Server
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const morgan = require("morgan");
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
const userService = require("./_services/user.service");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Environment
const ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;

// Database
const db = require("./db");
const knexConfig = require("./knexfile");
db.init(app, knexConfig[ENV]);
const knex = db.handle();

// Logging in development environment
if (ENV === "development") {
  knex.on("query", console.log);
  app.use(morgan("combined"));
}

// API routes
const apiRouter = express.Router();
apiRouter.use(jwt());
apiRouter.use(errorHandler);

// Single page
apiRouter.get("/page/:id", (req, res) => {
  console.log(`GET /api/page/${req.params.id}`);

  knex("pages")
    .select("*")
    .where("id", req.params.id)
    .then((results) => {
      console.log(`results in GET /api/page/${req.params.id}`);
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/pages/all knex call: ", error);
      res.status(401).send();
    });
});

apiRouter.post("/page", (req, res) => {
  console.log(`POST /api/page`);

  // Get the user ID based on the username
  knex("users")
    .select("id")
    .where("username", req?.body?.username)
    .then((rows) => {
      const userId = rows?.[0]?.id;
      const newPageId = uuidv4();

      // Insert new page
      knex("pages")
        .insert({
          id: newPageId,
          title: req?.body?.title,
          data: req?.body?.data,
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
        "error in POST /api/page knex action to get user ID: ",
        error
      );
      res.status(404).send();
    });
});

apiRouter.put("/page/:id", (req, res) => {
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
      console.log("rows in PUT /api/page check for page: ", rows);
      if (rows?.length > 0) {
        // Requested page ID exists, attempt the update
        knex("pages")
          .where("id", req.params.id)
          .update({
            data: req?.body?.data,
            title: req?.body?.title,
            last_modified_by_user: userId,
            time_last_updated: knex.fn.now(),
          })
          .then((success) => {
            // Page update success
            res.status(200).send("200");
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

apiRouter.delete("/page/:id", (req, res) => {
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
            marked_for_deletion: true,
            marked_for_deletion_by_user: userId,
            time_marked_for_deletion: knex.fn.now(),
          })
          .then((success) => {
            // Deletion request has been accepted for later processing
            res.status(202).send("202");
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

// All pages
apiRouter.get("/pages/all", (req, res) => {
  console.log("GET /api/pages/all");

  knex("pages")
    .select("*")
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("error in GET /api/pages/all knex call: ", error);
      res.status(401).send();
    });
});

apiRouter.get("/users/all", (req, res) => {
  console.log("GET /api/users/all");

  knex("users")
    .select("username")
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log("error in GET /api/users/all knex call: ", error);
      res.status(401).send();
    });
});

apiRouter.post("/users/authenticate", (req, res) => {
  console.log("POST /api/users/authenticate");

  userService.authenticate(
    { username: req.body.username, password: req.body.password },
    res
  );
});

apiRouter.post("/users/create", (req, res) => {
  console.log("POST /api/users/create");

  const username = req.body.username;
  const password = req.body.password;

  // Check if username already exists
  knex("users")
    .select("*")
    .where("username", username)
    .then((rows) => {
      // If username isn't in users table, insert new entry
      if (rows?.length === 0) {
        bcrypt
          .hash(password, saltRounds)
          .then((hash) => {
            // `hash` is a hashed password with leading salt. Ex:
            // salt: $2b$10$3euPcmQFCiblsZeEu5s7p.
            knex("users")
              .insert({
                username: username,
                hash: hash,
                is_admin: false,
              })
              .then((success) => {
                console.log(
                  `Inserted ${success?.rowCount} row into users table: ${username}`
                );
                res.status(201).json({
                  created: true,
                  username: username,
                });
              })
              .catch((error) => {
                console.log(
                  `error in POST /api/users/create while inserting new user into users table: ${username}`
                );
                console.log(error.message);
                res.status(200).json({
                  created: false,
                  username: null,
                });
              });
          })
          .catch((error) => {
            console.log(
              "error in POST /api/users/create while generating bcrypt hash:"
            );
            console.log(error.message);
          });
      } else {
        // Else if username is already in the users table
        res.status(200).json({
          created: false,
          username: null,
        });
      }
    })
    .catch((err) => {
      console.log(
        `Error in POST /api/users/create while checking username ${username}: `,
        err
      );
      res.status(401).send();
    });
});

apiRouter.post("/users/update", (req, res) => {
  console.log("POST /api/users/update");

  const username = req.body.username || "";
  const newPassword = req.body.password;

  // Check if username exists in database
  knex("users")
    .select("*")
    .where("username", username)
    .then((rows) => {
      // If username isn't in users table, 4xx response
      if (rows?.length === 0) {
        console.log(
          `/api/users/update: No username ${username} found in database`
        );

        res.status(400).json({
          updated: false,
        });
      } else if (rows?.length === 1 && rows[0]?.username === username) {
        console.log(
          `/api/users/update: Username ${username} found in database`
        );

        bcrypt
          .hash(newPassword, saltRounds)
          .then((hash) => {
            knex("users")
              .where({ username: username })
              .update({ hash: hash })
              .then((success) => {
                console.log(
                  `/api/users/update: Updated username in users table: ${username}`
                );

                res.status(200).json({
                  updated: true,
                  username: username,
                });
              })
              .catch((error) => {
                console.log(
                  `error in POST /api/users/update knex call updating user ${username}:`
                );
                console.log(error.message);
                res.status(401).send();
              });
          })
          .catch((error) => {
            console.log(
              `error in POST /api/users/update generating bcrypt hash for user ${username}: `,
              error
            );
            res.status(401).send();
          });
      }
    })
    .catch((error) => {
      console.log("error in POST /api/users/update knex call: ", error);
      res.status(401).send();
    });
});

app.use("/api", apiRouter);

// Use React app's build directory as static mount point
app.use(express.static(path.join(__dirname, "app", "build")));

// React routes
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
