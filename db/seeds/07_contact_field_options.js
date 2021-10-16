exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("contact_field_options")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("contact_field_options").insert([
        {
          id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          type_id: "922054b8-5b9c-4b81-a64a-cbbed2d80074",
          name: "office",
          display_name: "Office",
        },
        {
          id: "bb29754e-381c-4716-883e-794bec296ab6",
          type_id: "922054b8-5b9c-4b81-a64a-cbbed2d80074",
          name: "phone",
          display_name: "Phone",
        },
        {
          id: "1e570d72-5d71-48b5-8edd-a2c0e0cf1c06",
          type_id: "922054b8-5b9c-4b81-a64a-cbbed2d80074",
          name: "branch",
          display_name: "Branch",
        },
        {
          id: "868a015e-ee23-48f2-9030-864ccf72aa21",
          type_id: "922054b8-5b9c-4b81-a64a-cbbed2d80074",
          name: "main",
          display_name: "Main",
        },
        {
          id: "6431320b-b097-481e-91b6-344c5c802cb5",
          type_id: "922054b8-5b9c-4b81-a64a-cbbed2d80074",
          name: "mobile",
          display_name: "Mobile",
        },
        {
          id: "e03013ae-67f0-4a3f-9d27-80d81bcf8d02",
          type_id: "cfa900b8-92ee-489d-80ec-bfa4e8cd4390",
          name: "address",
          display_name: "Address",
        },
        {
          id: "1b3dbe10-2d2b-4da5-bce0-4c669f9e31dc",
          type_id: "cfa900b8-92ee-489d-80ec-bfa4e8cd4390",
          name: "courier",
          display_name: "Courier",
        },
        {
          id: "1543b3fc-b727-48b9-800e-4eb1d98e8e14",
          type_id: "cfa900b8-92ee-489d-80ec-bfa4e8cd4390",
          name: "hr",
          display_name: "HR",
        },
        {
          id: "c420620b-d8ea-4962-9495-42dbea21237e",
          type_id: "cfa900b8-92ee-489d-80ec-bfa4e8cd4390",
          name: "mailing",
          display_name: "Mailing",
        },
        {
          id: "7fa1f92b-c765-4c6c-9206-6f31c36ee80a",
          type_id: "cfa900b8-92ee-489d-80ec-bfa4e8cd4390",
          name: "purchasing",
          display_name: "Purchasing",
        },
        {
          id: "e850508e-76bc-4058-8cb0-6c0c9c41fe81",
          type_id: "cfa900b8-92ee-489d-80ec-bfa4e8cd4390",
          name: "receiving",
          display_name: "Receiving",
        },
        {
          id: "4f75ebcf-f75c-495a-b973-b20baeb29365",
          type_id: "cfa900b8-92ee-489d-80ec-bfa4e8cd4390",
          name: "shipping",
          display_name: "Shipping",
        },
        {
          id: "5248cce0-553d-4930-8e46-cb36491c068b",
          type_id: "cfa900b8-92ee-489d-80ec-bfa4e8cd4390",
          name: "street",
          display_name: "Street",
        },
        {
          id: "ecc76fca-f04d-40e9-93f8-f8d317d76128",
          type_id: "cc7bf849-27d3-4550-8e2f-9d52be3573d3",
          name: "email",
          display_name: "Email",
        },
        {
          id: "d3c9186d-d781-49f0-aa15-dc2c6547220a",
          type_id: "629329ae-3297-429d-bec5-8e2f3948698a",
          name: "website",
          display_name: "Website",
        },
      ]);
    });
};
