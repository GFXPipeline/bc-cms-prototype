exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table
      .uuid("id")
      .defaultTo(knex.raw(`gen_random_uuid()`)) // Postgres built-in UUID v4 generator
      .notNullable()
      .primary();
    table.string("username").notNullable().unique();
    table.string("hash").notNullable();
    table.boolean("is_admin").notNullable().defaultTo(false);
    table.dateTime("time_created").notNullable().defaultTo(knex.fn.now());
    table.dateTime("time_last_updated").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
