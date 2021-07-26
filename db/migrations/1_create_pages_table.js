exports.up = function (knex) {
  return knex.schema.createTable("pages", (table) => {
    table
      .uuid("id")
      .defaultTo(knex.raw(`gen_random_uuid()`)) // Postgres built-in UUID v4 generator
      .notNullable()
      .primary();
    table.string("title");
    table.text("data");
    table.uuid("created_by_user").references("id").inTable("users");
    table.uuid("owned_by_user").references("id").inTable("users");
    table.uuid("last_modified_by_user").references("id").inTable("users");
    table.boolean("marked_for_deletion").defaultTo(false);
    table.uuid("marked_for_deletion_by_user").references("id").inTable("users");
    table.dateTime("time_created").notNullable().defaultTo(knex.fn.now());
    table.dateTime("time_last_updated").notNullable().defaultTo(knex.fn.now());
    table.dateTime("time_marked_for_deletion");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pages");
};
