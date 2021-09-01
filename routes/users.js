const express = require("express");
const app = express();
const ENV = process.env.NODE_ENV || "development";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const userService = require("../_services/user.service");

// Database
const db = require("../db");
const knexConfig = require("../knexfile");
db.init(app, knexConfig[ENV]);
const knex = db.handle();

const usersRouter = express.Router();
usersRouter.use(jwt());
usersRouter.use(errorHandler);

usersRouter.get("/all", (req, res) => {
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

usersRouter.post("/authenticate", (req, res) => {
  console.log("POST /api/users/authenticate");

  userService.authenticate(
    { username: req.body.username, password: req.body.password },
    res
  );
});

usersRouter.post("/create", (req, res) => {
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

usersRouter.post("/update", (req, res) => {
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

module.exports = usersRouter;
