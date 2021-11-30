exports.up = function (knex) {
  return knex.schema.createTable("pages", (table) => {
    table
      .uuid("id")
      .defaultTo(knex.raw(`gen_random_uuid()`)) // Postgres built-in UUID v4 generator
      .notNullable()
      .primary();
    table.uuid("parent_page_id").references("id").inTable("pages");
    table.uuid("page_type").references("id").inTable("page_types");
    table.string("title");
    table.string("nav_title");
    table.text("intro");
    table.text("data");
    table.boolean("is_on_this_page").defaultTo(false);
    table.boolean("is_published").defaultTo(false);
    table.boolean("is_marked_for_deletion").defaultTo(false);
    table.integer("review_frequency_months");
    table.uuid("created_by_user").references("id").inTable("users");
    table.uuid("owned_by_user").references("id").inTable("users");
    table.uuid("last_modified_by_user").references("id").inTable("users");
    table.dateTime("time_created").notNullable().defaultTo(knex.fn.now());
    table.dateTime("time_last_updated").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pages");
};
