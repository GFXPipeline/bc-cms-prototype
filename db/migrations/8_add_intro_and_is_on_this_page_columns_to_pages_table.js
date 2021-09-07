exports.up = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.text("intro");
    table.boolean("is_on_this_page").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.dropColumn("intro");
    table.dropColumn("is_on_this_page");
  });
};
