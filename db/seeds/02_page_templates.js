exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("page_templates")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("page_templates").insert([
        {
          id: "24790997-22fd-4751-9bc5-043fcbf45af1",
          name: "base-template",
          display_name: "Base Template",
          display_order: 1,
          description:
            "This is the description of the base page template and when it should be used in web content.",
          data: "<p>Base Template</p>",
          intro: "<p>Intro to base template</p>",
        },
      ]);
    });
};
