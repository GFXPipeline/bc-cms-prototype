exports.up = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.dropColumn("marked_for_deletion_by_user");
    table.dropColumn("time_marked_for_deletion");
  });
};

exports.down = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.uuid("marked_for_deletion_by_user").references("id").inTable("users");
    table.dateTime("time_deleted").notNullable().defaultTo(knex.fn.now());
  });
};
