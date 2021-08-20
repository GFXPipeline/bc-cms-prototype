exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("page_templates")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("page_templates").insert([
        {
          name: "base-template",
          display_name: "Base Template",
          data: "<p>Base Template</p>",
        },
        {
          name: "service-template",
          display_name: "Service Template",
          data: "<p>Service Template</p>",
        },
        {
          name: "search-results-page-template",
          display_name: "Search Results Page Template",
          data: "<p>Search Results Page Template</p>",
        },
        {
          name: "forms-template",
          display_name: "Forms Template",
          data: "<p>Forms Template</p>",
        },
      ]);
    });
};
