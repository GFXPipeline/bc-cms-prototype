exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: "15e2f70d-da94-4c5e-a85f-07a9831f319b",
          username: "admin",
          hash: "$2b$10$P6EhtQ0PyewGrJK6E0HbrurVWd6jlVuVPGSW/Snsq/j/cRGDiGlpu",
          is_admin: true,
        },
        {
          id: "43e41ff4-87cd-4829-98b1-3d511e97aa50",
          username: "ali",
          hash: "$2b$10$P6EhtQ0PyewGrJK6E0HbrurVWd6jlVuVPGSW/Snsq/j/cRGDiGlpu",
          is_admin: true,
        },
        {
          id: "38751629-6513-4efb-89b7-5a1d31469e3a",
          username: "victoria",
          hash: "$2b$10$P6EhtQ0PyewGrJK6E0HbrurVWd6jlVuVPGSW/Snsq/j/cRGDiGlpu",
          is_admin: true,
        },
      ]);
    });
};
