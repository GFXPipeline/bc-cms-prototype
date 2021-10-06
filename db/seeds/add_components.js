exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("components")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("components").insert([
        {
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Generic contact information",
          intro: "<p>Add introductory text here if applicable.</p>",
        },
      ]);
    });
};
