exports.up = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.string("nav_title");
  });
};

exports.down = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.dropColumn("nav_title");
  });
};
