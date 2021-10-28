exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("page_types")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("page_types").insert([
        {
          id: "34ba5b97-15b0-4393-bd03-7258407c2d8a",
          name: "topic",
          display_name: "Topic",
        },
        {
          id: "2d5f6aa3-6943-4522-96b0-3f655dadeeb2",
          name: "theme",
          display_name: "Theme",
        },
        {
          id: "c3c68c91-7741-4f6a-b863-bceb4865e4a2",
          name: "enhanced-search",
          display_name: "Enhanced Search",
        },
        {
          id: "59df13a9-2a9e-434b-aa24-addb612628d2",
          name: "form",
          display_name: "Form",
        },
        {
          id: "d1d31c2c-e8b2-47da-b1b5-904866c0c306",
          name: "header-footer",
          display_name: "Header/Footer",
        },
        {
          id: "8830b05b-9b98-4184-9c7c-bfd52edc7bf1",
          name: "olr-policy",
          display_name: "OLR Policy",
        },
        {
          id: "8d7a6086-16f5-478e-af60-db436b0469e1",
          name: "search-detail",
          display_name: "Search Detail",
        },
        {
          id: "cbfa5133-ab18-4788-9c78-275e9d96257a",
          name: "service",
          display_name: "Service",
        },
        {
          id: "f2900e1d-8541-42a2-b498-f4e9feccab06",
          name: "simple-service",
          display_name: "Simple Service",
        },
      ]);
    });
};
