const express = require("express");
const jwt = require("../_helpers/jwt");
const errorHandler = require("../_helpers/error-handler");
const knex = require("../db");

const userRouter = express.Router();
userRouter.use(jwt());
userRouter.use(errorHandler);

userRouter.get("/:username", (req, res) => {
  console.log(`GET /api/user/${req?.params?.username}`);

  // If username was supplied, look it up in database
  if (req?.params?.username) {
    knex("users")
      .select([
        "id",
        "username",
        "is_admin",
        "time_created",
        "time_last_updated",
      ])
      .where("username", req?.params?.username)
      .then((rows) => {
        if (rows?.length > 0) {
          res.status(200).send(rows[0]);
        } else {
          res.status(404).send("404");
        }
      })
      .catch((error) => {
        console.log(
          `error in GET /api/user/${req?.params?.username} knex call: `,
          error
        );
        res.status(500).send("500");
      });
  } else {
    // No username parameter provided
    res.status(404).send("404");
  }
});

module.exports = userRouter;
