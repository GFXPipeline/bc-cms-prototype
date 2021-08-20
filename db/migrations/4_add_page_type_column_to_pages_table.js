exports.up = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.uuid("page_type").references("id").inTable("page_types");
  });
};

exports.down = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.dropColumn("page_type");
  });
};
