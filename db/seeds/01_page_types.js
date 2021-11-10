exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("page_types")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("page_types").insert([
        {
          id: "34ba5b97-15b0-4393-bd03-7258407c2d8a",
          name: "information",
          display_name: "Information",
          display_order: 1,
          description:
            "This is the description of the information page type and when it should be used in web content.",
          icon: "noun-info.svg",
        },
        {
          id: "cbfa5133-ab18-4788-9c78-275e9d96257a",
          name: "service",
          display_name: "Service",
          display_order: 2,
          description:
            "This is the description of the service page type and when it should be used in web content.",
          icon: "fa-hands-helping.svg",
        },
        {
          id: "59df13a9-2a9e-434b-aa24-addb612628d2",
          name: "form",
          display_name: "Form",
          display_order: 3,
          description:
            "This is the description of the form page type and when it should be used in web content.",
          icon: "md-list-box.svg",
        },
        {
          id: "8d7a6086-16f5-478e-af60-db436b0469e1",
          name: "search",
          display_name: "Search",
          display_order: 4,
          description:
            "This is the description of the search page type and when it should be used in web content.",
          icon: "fa-search.svg",
        },
      ]);
    });
};
