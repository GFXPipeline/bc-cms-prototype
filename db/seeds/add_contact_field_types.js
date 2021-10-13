exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("contact_field_types")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("contact_field_types").insert([
        {
          id: "922054b8-5b9c-4b81-a64a-cbbed2d80074",
          name: "phone",
          display_name: "Phone",
          description: "Telephone number",
        },
        {
          id: "cfa900b8-92ee-489d-80ec-bfa4e8cd4390",
          name: "address",
          display_name: "Address",
          description: "Physical address",
        },
        {
          id: "cc7bf849-27d3-4550-8e2f-9d52be3573d3",
          name: "email",
          display_name: "Email",
          description: "Email address",
        },
        {
          id: "629329ae-3297-429d-bec5-8e2f3948698a",
          name: "website",
          display_name: "Website",
          description: "Web address",
        },
      ]);
    });
};
