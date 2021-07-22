exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("pages")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("pages").insert([
        {
          title: "Hello World!",
          data: "<p>This is the first page.</p>",
        },
      ]);
    });
};
