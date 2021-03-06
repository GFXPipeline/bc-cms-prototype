"use strict";

require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      ssl: false,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  // Heroku has `DATABASE_URL` environment variable
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  test: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      ssl: false,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
