exports.up = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.text("intro");
  });
};

exports.down = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.dropColumn("intro");
  });
};
