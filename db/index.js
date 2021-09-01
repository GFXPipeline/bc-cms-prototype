require("dotenv").config();
const knexConfig = require("../knexfile");
const ENV = process.env.NODE_ENV || "development";
const knex = require("knex")(knexConfig[ENV]);

if (ENV === "development") {
  knex.on("query", console.log);
}

module.exports = knex;
