"use strict";

const express = require("express");
const router = express.Router();
const knex = require("../../db").handle;

router.get("/all", (req, res) => {
  knex()("pages")
    .select("*")
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
