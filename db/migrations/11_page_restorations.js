exports.up = function (knex) {
  return knex.schema.createTable("page_restorations", (table) => {
    table
      .uuid("id")
      .defaultTo(knex.raw(`gen_random_uuid()`)) // Postgres built-in UUID v4 generator
      .notNullable()
      .primary();
    table.uuid("page_id").notNullable().references("id").inTable("pages");
    table
      .uuid("parent_page_id")
      .notNullable()
      .references("id")
      .inTable("pages");
    table.text("reason");
    table.uuid("created_by_user").references("id").inTable("users");
    table.dateTime("time_created").notNullable().defaultTo(knex.fn.now());
    table.dateTime("time_last_updated").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("page_restorations");
};
