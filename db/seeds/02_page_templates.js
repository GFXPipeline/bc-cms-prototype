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
          data: "<p>Base Template</p>",
          intro: "<p>Intro to base template</p>",
        },
        {
          id: "baa8cd9f-7cd8-4214-a1a2-d881eb9cf335",
          name: "service-template",
          display_name: "Service Template",
          data: "<p>Service Template</p>",
          intro: "<p>Intro to service template</p>",
        },
        {
          id: "f1d6c13c-9bd9-458f-af6a-279f0905e580",
          name: "search-results-page-template",
          display_name: "Search Results Page Template",
          data: "<p>Search Results Page Template</p>",
          intro: "<p>Intro to search results page template</p>",
        },
        {
          id: "5aab5034-a398-4006-b9a1-7a165e096308",
          name: "forms-template",
          display_name: "Forms Template",
          data: "<p>Forms Template</p>",
          intro: "<p>Intro to forms template</p>",
        },
      ]);
    });
};
