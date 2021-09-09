exports.up = function (knex) {
  return knex.schema.createTable("deletions", (table) => {
    table
      .uuid("id")
      .defaultTo(knex.raw(`gen_random_uuid()`)) // Postgres built-in UUID v4 generator
      .notNullable()
      .primary();
    table
      .uuid("page_id")
      .unique()
      .notNullable()
      .references("id")
      .inTable("pages");
    table.boolean("is_hard_delete").defaultTo(false);
    table.text("reason");
    table.boolean("is_delete_date_set").defaultTo(false);
    table.dateTime("time_to_delete");
    table.boolean("is_notification_requested").defaultTo(false);
    table.boolean("is_subscriber_message_set").defaultTo(false);
    table.text("subscriber_message");
    table.uuid("deleted_by_user").references("id").inTable("users");
    table.uuid("last_modified_by_user").references("id").inTable("users");
    table.dateTime("time_created").notNullable().defaultTo(knex.fn.now());
    table.dateTime("time_last_updated").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("deletions");
};
