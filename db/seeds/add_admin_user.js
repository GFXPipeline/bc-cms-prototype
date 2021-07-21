exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "admin",
          hash: "$2b$10$P6EhtQ0PyewGrJK6E0HbrurVWd6jlVuVPGSW/Snsq/j/cRGDiGlpu",
          is_admin: true,
        },
      ]);
    });
};
