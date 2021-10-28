exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("components")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("components").insert([
        {
          id: "58243bcc-a9d0-405c-8a73-33e81d520ad9",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Government Communications & Public Engagement",
          intro: "<p>Contact GCPE.</p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Office",
              data: "1-250-387-1337",
            },
            {
              option_id: "ecc76fca-f04d-40e9-93f8-f8d317d76128",
              label_prefix: "Email example",
              data: "victoria@example.com",
            },
            {
              option_id: "d3c9186d-d781-49f0-aa15-dc2c6547220a",
              label_prefix: "Web",
              data: "https://example.com",
            },
          ],
        },
        {
          id: "531abe08-97ec-434c-b411-555f4f93baf3",
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
        {
          id: "9173141b-5891-4ad5-9986-9b31f45facf6",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Ashcroft",
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-453-2412",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-453-9622",
            },
          ],
        },
        {
          id: "62572b87-31a2-4fc2-9709-213359d243eb",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Atlin",
          is_published: true,
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-651-7595",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-651-7707",
            },
          ],
        },
        {
          id: "c9adba08-12bc-44ea-8dcb-c2f07c2a5e05",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Bella Coola",
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-799-5361",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-799-5450",
            },
          ],
        },
        {
          id: "79b6d9d5-5139-434c-866e-20b609ede200",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Burns Lake",
          is_published: true,
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-692-2528",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-692-2530",
            },
          ],
        },
        {
          id: "74ea9f56-c3fe-43c1-a5d7-9ec799d89708",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Campbell River",
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-286-7555",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-286-7573",
            },
          ],
        },
        {
          id: "d3cc34bf-4914-4dd5-8c75-53afbf4f1a10",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Chetwynd",
          is_published: true,
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-788-2239",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-788-3802",
            },
          ],
        },
        {
          id: "3f2a90fb-1ada-433d-b0c0-6dae478e0a79",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Chilliwack",
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-604-795-8415",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-604-795-8408",
            },
          ],
        },
        {
          id: "8edbd192-d8fc-4166-94cd-a12c06b6bf9e",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Clinton",
          is_published: true,
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-459-2268",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-459-7082",
            },
          ],
        },
        {
          id: "29d18f24-27e0-4810-95bf-dade5c00bc11",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Courtenay",
          is_published: true,
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-897-7500",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-334-1209",
            },
          ],
        },
        {
          id: "bed7dec6-795a-404c-8842-66a5561b4f01",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Cranbrook",
          is_published: true,
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-417-6100",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-426-1253",
            },
          ],
        },
        {
          id: "72c0dbfb-c8f2-4215-98a5-25042e503652",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Creston",
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-428-3212",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-428-3211",
            },
          ],
        },
        {
          id: "cac64ebd-1972-4085-9f95-edceac8a4161",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Dawson Creek",
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-784-2224",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-784-2211",
            },
          ],
        },
        {
          id: "41c71cd8-b4b7-41c1-95c7-27424ff74f80",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Dease Lake",
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-771-3700",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-771-3702",
            },
          ],
        },
        {
          id: "9de1ab29-1ed1-45a1-aa61-8df5749c6e93",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Service BC Duncan",
          is_published: true,
          intro: "<p></p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Phone",
              data: "1-250-746-1400",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Fax",
              data: "1-250-746-1401",
            },
          ],
        },
        {
          id: "41d5fad9-931f-456d-be69-664259939dea",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Consumer Taxation",
          is_published: true,
          intro:
            "<p>Our hours of operation are Monday through Friday, 8:30am - 4:30pm.</p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Toll Free",
              data: "1-877-388-4440",
            },
            {
              option_id: "ecc76fca-f04d-40e9-93f8-f8d317d76128",
              label_prefix: "Email",
              data: "CTBTaxQuestions@gov.bc.ca",
            },
          ],
        },
        {
          id: "83bfe102-4f09-4190-9766-b44d772e52d5",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          title: "Speculation and Vacancy Tax",
          is_published: true,
          intro: "<p>If you would like to speak with an agent, call us at:</p>",
          fields: [
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Toll Free",
              data: "1-833-554-2323",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Outside North America",
              data: "1-604-660-2421",
            },
            {
              option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
              label_prefix: "Telephone Device for the Deaf (TDD)",
              data: "711",
            },
          ],
        },
      ]);
    });
};
