"use strict";

const express = require("express");
const router = express.Router();
const knex = require("../../db").handle;
const userService = require("../../_services/user.service");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/authenticate", (req, res) => {
  userService.authenticate(
    { username: req.body.username, password: req.body.password },
    res
  );
});

router.post("/create", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if username already exists
  knex()("users")
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
            knex()("users")
              .insert({
                username: username,
                hash: hash,
                is_admin: false,
              })
              .then((success) => {
                console.log(
                  `Inserted ${success?.rowCount} row into users table: ${username}`
                );
                res.status(200).json({
                  created: true,
                  username: username,
                });
              })
              .catch((err) => {
                console.error(
                  `Error inserting new user into users table: ${username}`
                );
                console.error(err.message);
              });
          })
          .catch((err) => {
            console.error("Error generating bcrypt hash:");
            console.error(err.message);
          });
      } else {
        // Else if username is already in the users table
        res.status(200).json({
          created: false,
          username: null,
        });
      }
    });
});

router.post("/update", (req, res) => {
  const username = req.body.username || "";
  const newPassword = req.body.password;

  // Check if username exists in database
  knex()("users")
    .select("*")
    .where("username", username)
    .then((rows) => {
      // If username isn't in users table, 4xx response
      if (rows?.length === 0) {
        console.log(`/update: No username ${username} found in database`);

        res.status(400).json({
          updated: false,
        });
      } else if (rows?.length === 1 && rows[0]?.username === username) {
        console.log(`/update: Username ${username} found in database`);

        bcrypt.hash(newPassword, saltRounds).then((hash) => {
          knex()("users")
            .where({ username: username })
            .update({ hash: hash })
            .then((success) => {
              console.log(
                `/update: Updated username in users table: ${username}`
              );

              res.status(200).json({
                updated: true,
                username: username,
              });
            })
            .catch((err) => {
              console.error(
                `/update: Error generating bcrypt hash for user ${username}:`
              );
              console.error(err.message);
            });
        });
      }
    });
});

module.exports = router;
