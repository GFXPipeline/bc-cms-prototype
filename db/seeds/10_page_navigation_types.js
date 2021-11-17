exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("page_navigation_types")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("page_navigation_types").insert([
        {
          id: "3e76a0c5-e6a5-45cb-a57e-ddcc24b99c08",
          name: "box-style-with-details",
          display_name: "Box style with details",
          display_order: 1,
          description:
            "<p>Includes:</p><ul><li>Page title</li><li>Page description</li><li>Coloured bar (optional)</li><li>Image (optional)</li></ul><p>Ideal for higher-level pages</p>",
          icon: "nav-style-box-with-details.svg",
        },
        {
          id: "824bcf9b-3756-4f2f-9d92-e72251749aff",
          name: "box-style-without-details",
          display_name: "Box style without details",
          display_order: 2,
          description:
            "<p>Includes:</p><ul><li>Page title</li><li>Coloured bar (optional)</li><li>Image (optional)</li></ul><p>Suitable for all page types. Ideal for landing pages.</p>",
          icon: "nav-style-box-without-details.svg",
        },
        {
          id: "a2ae9264-85ac-446c-9b9a-4214f79035b6",
          name: "regular-style-with-details",
          display_name: "Regular style with details",
          display_order: 3,
          description:
            "<p>Includes:</p><ul><li>Page title</li><li>Page description</li><li>Image (optional)</li></ul><p>Ideal for higher-level pages</p>",
          icon: "nav-style-regular-with-details.svg",
        },
        {
          id: "a301648f-eb86-4bd8-800a-bcacdd31c899",
          name: "regular-style-without-details",
          display_name: "Regular style without details",
          display_order: 4,
          description:
            "<p>Includes:</p><ul><li>Page title</li></ul><p>Ideal for information pages</p>",
          icon: "nav-style-regular-without-details.svg",
        },
      ]);
    });
};
