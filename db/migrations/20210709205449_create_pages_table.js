exports.up = function (knex) {
  return knex.schema.createTable("pages", (table) => {
    table
      .uuid("id")
      .defaultTo(knex.raw(`gen_random_uuid()`)) // Postgres built-in UUID v4 generator
      .notNullable()
      .primary();
    table.string("title");
    table.string("author");
    table.dateTime("time_created").notNullable().defaultTo(knex.fn.now());
    table.dateTime("time_last_updated").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pages");
};
