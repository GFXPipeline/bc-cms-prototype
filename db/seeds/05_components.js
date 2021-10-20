exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("components")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("components").insert([
        {
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Branch contact information",
          intro: "<p>Add <i>introductory</i> text here if applicable.</p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Office phone example",
              data: "1-250-555-1234",
            },
            {
              option_id: "ecc76fca-f04d-40e9-93f8-f8d317d76128",
              label_prefix: "Email example",
              data: "victoria@example.com",
            },
            {
              option_id: "d3c9186d-d781-49f0-aa15-dc2c6547220a",
              label_prefix: "Website example",
              data: "https://example.com",
            },
          ],
        },
        {
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC 100 Mile House",
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-395-7832",
            },
          ],
        },
      ]);
    });
};
