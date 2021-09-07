exports.up = function (knex) {
  return knex.schema.table("page_templates", (table) => {
    table.text("intro");
  });
};

exports.down = function (knex) {
  return knex.schema.table("page_templates", (table) => {
    table.dropColumn("intro");
  });
};
