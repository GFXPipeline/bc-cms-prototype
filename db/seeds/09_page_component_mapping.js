exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("page_component_mapping")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("page_component_mapping").insert([
        {
          page_id: "10600817-fcc0-4aa4-b407-674b6568dcc9",
          component_id: "41d5fad9-931f-456d-be69-664259939dea",
          created_by_user: "15e2f70d-da94-4c5e-a85f-07a9831f319b",
        },
      ]);
    });
};
