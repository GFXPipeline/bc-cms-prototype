exports.up = function (knex) {
  return knex.schema.createTable("page_component_mapping", (table) => {
    table.uuid("page_id").references("id").inTable("pages").notNullable();
    table
      .uuid("component_id")
      .references("id")
      .inTable("components")
      .notNullable();
    table.primary(["page_id", "component_id"]);
    table.uuid("created_by_user").references("id").inTable("users");
    table.dateTime("time_created").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("page_component_mapping");
};
