exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("page_templates")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("page_templates").insert([
        {
          id: "24790997-22fd-4751-9bc5-043fcbf45af1",
          name: "base-template-1",
          display_name: "Base Template 1",
          display_order: 1,
          description:
            "This is the description of base template 1 and when it should be used in web content.",
          icon: "bc-base-template-1.svg",
          page_description: "Page description",
          page_data:
            '<h2 id="first-heading">First heading</h2><p>This is the base template.</p>',
        },
        {
          id: "707e8573-d714-48a3-99fc-c685a4274c73",
          name: "base-template-2",
          display_name: "Base Template 2",
          display_order: 2,
          description:
            "This is the description of base template 2 and when it should be used in web content.",
          icon: "bc-base-template-2.svg",
          page_description: "Page description",
          page_data:
            '<h2 id="first-heading">First heading</h2><p>This is the base template.</p>',
        },
        {
          id: "e324a4c4-c716-44f0-affa-9cb5c21556ff",
          name: "base-template-3",
          display_name: "Base Template 3",
          display_order: 3,
          description:
            "This is the description of base template 3 and when it should be used in web content.",
          icon: "bc-base-template-3.svg",
          page_description: "Page description",
          page_data:
            '<h2 id="first-heading">First heading</h2><p>This is the base template.</p>',
        },
        {
          id: "7bbfc350-a178-4bc7-a530-e1e09c6cd524",
          name: "base-template-4",
          display_name: "Base Template 4",
          display_order: 4,
          description:
            "This is the description of base template 4 and when it should be used in web content.",
          icon: "bc-base-template-4.svg",
          page_description: "Page description",
          page_data:
            '<h2 id="first-heading">First heading</h2><p>This is the base template.</p>',
        },
      ]);
    });
};
