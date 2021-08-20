exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("page_types")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("page_types").insert([
        {
          name: "topic",
          display_name: "Topic",
        },
        {
          name: "theme",
          display_name: "Theme",
        },
        {
          name: "enhanced-search",
          display_name: "Enhanced Search",
        },
        {
          name: "form",
          display_name: "Form",
        },
        {
          name: "header-footer",
          display_name: "Header/Footer",
        },
        {
          name: "olr-policy",
          display_name: "OLR Policy",
        },
        {
          name: "search-detail",
          display_name: "Search Detail",
        },
        {
          name: "service",
          display_name: "Service",
        },
        {
          name: "simple-service",
          display_name: "Simple Service",
        },
      ]);
    });
};
