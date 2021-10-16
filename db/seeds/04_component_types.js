exports.seed = function (knex) {
  // Delete entries in dependent table `components` first
  return knex("components")
    .del()
    .then(function () {
      return knex("component_types")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("component_types").insert([
            {
              id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
              name: "contact-information",
              display_name: "Contact information",
              description:
                "Add structured contact information that can be re-used across many pages",
            },
          ]);
        });
    });
};
