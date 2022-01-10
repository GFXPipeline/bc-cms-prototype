
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contact_field_instances').del()
    .then(function () {
      // Inserts seed entries
      return knex('contact_field_instances').insert([
        {
          id: "c8cfe440-9600-4b12-91f4-b19bca25799c",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Office",
          data: "1-250-387-1337",
        },
        {
          id: "3a2d7d83-a389-447f-8bef-b3d5e5c7dc90",
          option_id: "ecc76fca-f04d-40e9-93f8-f8d317d76128",
          label_prefix: "Email example",
          data: "victoria@example.com",
        },
        {
          id: "95d54030-8490-45c6-b3c7-1d73519427e4",
          option_id: "d3c9186d-d781-49f0-aa15-dc2c6547220a",
          label_prefix: "Web",
          data: "https://example.com",
        },
        {
          id: "1847ce36-db21-43d9-8e5e-daba0f9eff6d",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-395-7832",
        },
        {
          id: "839d9886-482d-47b8-89e9-00572eba13ba",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-453-2412",
        },
        {
          id: "766ffd04-10a4-46c4-a986-cfb481bc1353",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-453-9622",
        },
        {
          id: "c3448389-c1a2-450c-ab3f-4c71e64c8f3f",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-651-7595",
        },
        {
          id: "f7d7008b-7cfc-4263-bb5a-c3b950320250",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-651-7707",
        },
        {
          id: "c070f50c-ad91-41a6-88d6-59ce82048d7c",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-799-5361",
        },
        {
          id: "029f8565-e9ba-48ec-81fc-293de01b6751",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-799-5450",
        },
        {
          id: "bd4e484d-9b58-49e2-9f52-0b5308bbf965",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-692-2528",
        },
        {
          id: "97e8f1af-5a1c-4322-8309-e08f49fadefe",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-692-2530",
        },
        {
          id: "09a2f697-0690-483b-b7d9-4ee3f4eeda94",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-286-7555",
        },
        {
          id: "f945b75c-0622-4c29-82e1-a1d005b37666",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-286-7573",
        },
        {
          id: "fd0655ae-b77c-4cb2-90ca-59f32107dc50",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-788-2239",
        },
        {
          id: "08ba4f75-5ef6-4c8f-8b24-0bcee0ce967e",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-788-3802",
        },
        {
          id: "ff4f4f0e-e32b-4ea5-bd75-98b71733cf78",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-604-795-8415",
        },
        {
          id: "40f8da83-7a73-4e4e-87a1-f253870812f5",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-604-795-8408",
        },
        {
          id: "1754d080-c62d-4a28-b92d-71934616ae9e",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-459-2268",
        },
        {
          id: "b0fd9dbc-797d-4a12-94b3-365a3104dad3",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-459-7082",
        },
        {
          id: "d5d43496-59e0-4199-bd3a-f30a8ce16517",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-897-7500",
        },
        {
          id: "28dc54b1-deab-479b-a830-e4a4765f420d",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-334-1209",
        },
        {
          id: "c355ddb1-78d2-479c-b7e0-f395a00e679e",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-417-6100",
        },
        {
          id: "b9d4ad44-773b-45dd-8fb2-1f362247aa06",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-426-1253",
        },
        {
          id: "203d7ae6-2000-48b5-a1f5-b5b39454653e",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-428-3212",
        },
        {
          id: "d1df218d-c43b-447f-9074-50f8e8ddfc2d",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-428-3211",
        },
        {
          id: "f2bd30f4-7f24-44d1-94ec-1e491ba4fbf2",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-784-2224",
        },
        {
          id: "5a7f4cf5-c1f8-4937-8c4b-4bf901a0f031",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-784-2211",
        },
        {
          id: "d0c4c752-279a-4696-a088-123dbf09f925",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-771-3700",
        },
        {
          id: "a5be2ad8-bad6-45b8-a19f-4d8768081b3a",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-771-3702",
        },
        {
          id: "f0cc7bda-8663-4e6c-a49b-2616d87c9357",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Phone",
          data: "1-250-746-1400",
        },
        {
          id: "962477b1-533a-4949-80d2-56becaf6d01f",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Fax",
          data: "1-250-746-1401",
        },
        {
          id: "161bd13d-4f86-4377-90a1-3c6bcb00a54b",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Toll Free",
          data: "1-877-388-4440",
        },
        {
          id: "6a5acf91-689f-4386-a37a-15295e80e7fe",
          option_id: "ecc76fca-f04d-40e9-93f8-f8d317d76128",
          label_prefix: "Email",
          data: "CTBTaxQuestions@gov.bc.ca",
        },
        {
          id: "7e58b21f-9dce-4dc9-b816-42be78f6c082",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Toll Free",
          data: "1-833-554-2323",
        },
        {
          id: "da41fe07-319b-4c10-92a0-8b3fc25bd506",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Outside North America",
          data: "1-604-660-2421",
        },
        {
          id: "2cc872b8-574e-4dd1-a029-0b6b4e3d6856",
          option_id: "2336e5ba-3ea7-407e-967b-13d1841396cf",
          label_prefix: "Telephone Device for the Deaf (TDD)",
          data: "711",
        },
      ]);
    });
};
