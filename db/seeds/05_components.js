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
          name: "Government Communications & Public Engagement",
          title: "Contact GCPE",
          intro: "<p>Contact us by phone or email.</p>",
          fields: [
            "c8cfe440-9600-4b12-91f4-b19bca25799c",
            "3a2d7d83-a389-447f-8bef-b3d5e5c7dc90",
            "95d54030-8490-45c6-b3c7-1d73519427e4",
          ],
        },
        {
          id: "531abe08-97ec-434c-b411-555f4f93baf3",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC 100 Mile House",
          title: "Contact Information",
          intro: "<p></p>",
          fields: [
            "1847ce36-db21-43d9-8e5e-daba0f9eff6d",
          ],
        },
        {
          id: "9173141b-5891-4ad5-9986-9b31f45facf6",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Ashcroft",
          title: "Contact Information",
          intro: "<p></p>",
          fields: [
            "839d9886-482d-47b8-89e9-00572eba13ba",
            "766ffd04-10a4-46c4-a986-cfb481bc1353",
          ],
        },
        {
          id: "62572b87-31a2-4fc2-9709-213359d243eb",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Atlin",
          title: "Contact Information",
          is_published: true,
          intro: "<p></p>",
          fields: [
            "c3448389-c1a2-450c-ab3f-4c71e64c8f3f",
            "f7d7008b-7cfc-4263-bb5a-c3b950320250",
          ],
        },
        {
          id: "c9adba08-12bc-44ea-8dcb-c2f07c2a5e05",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Bella Coola",
          title: "Contact Information",
          intro: "<p></p>",
          fields: [
            "c070f50c-ad91-41a6-88d6-59ce82048d7c",
            "029f8565-e9ba-48ec-81fc-293de01b6751",
          ],
        },
        {
          id: "79b6d9d5-5139-434c-866e-20b609ede200",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Burns Lake",
          title: "Contact Information",
          is_published: true,
          intro: "<p></p>",
          fields: [
            "bd4e484d-9b58-49e2-9f52-0b5308bbf965",
            "97e8f1af-5a1c-4322-8309-e08f49fadefe",
          ],
        },
        {
          id: "74ea9f56-c3fe-43c1-a5d7-9ec799d89708",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Campbell River",
          title: "Contact Information",
          intro: "<p></p>",
          fields: [
            "09a2f697-0690-483b-b7d9-4ee3f4eeda94",
            "f945b75c-0622-4c29-82e1-a1d005b37666",
          ],
        },
        {
          id: "d3cc34bf-4914-4dd5-8c75-53afbf4f1a10",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Chetwynd",
          title: "Contact Information",
          is_published: true,
          intro: "<p></p>",
          fields: [
            "fd0655ae-b77c-4cb2-90ca-59f32107dc50",
            "08ba4f75-5ef6-4c8f-8b24-0bcee0ce967e",
          ],
        },
        {
          id: "3f2a90fb-1ada-433d-b0c0-6dae478e0a79",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Chilliwack",
          title: "Contact Information",
          intro: "<p></p>",
          fields: [
            "ff4f4f0e-e32b-4ea5-bd75-98b71733cf78",
            "40f8da83-7a73-4e4e-87a1-f253870812f5",
          ],
        },
        {
          id: "8edbd192-d8fc-4166-94cd-a12c06b6bf9e",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Clinton",
          title: "Contact Information",
          is_published: true,
          intro: "<p></p>",
          fields: [
            "1754d080-c62d-4a28-b92d-71934616ae9e",
            "b0fd9dbc-797d-4a12-94b3-365a3104dad3",
          ],
        },
        {
          id: "29d18f24-27e0-4810-95bf-dade5c00bc11",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Courtenay",
          title: "Contact Information",
          is_published: true,
          intro: "<p></p>",
          fields: [
            "d5d43496-59e0-4199-bd3a-f30a8ce16517",
            "28dc54b1-deab-479b-a830-e4a4765f420d",
          ],
        },
        {
          id: "bed7dec6-795a-404c-8842-66a5561b4f01",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Cranbrook",
          title: "Contact Information",
          is_published: true,
          intro: "<p></p>",
          fields: [
            "c355ddb1-78d2-479c-b7e0-f395a00e679e",
            "b9d4ad44-773b-45dd-8fb2-1f362247aa06",
          ],
        },
        {
          id: "72c0dbfb-c8f2-4215-98a5-25042e503652",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Creston",
          title: "Contact Information",
          intro: "<p></p>",
          fields: [
            "203d7ae6-2000-48b5-a1f5-b5b39454653e",
            "d1df218d-c43b-447f-9074-50f8e8ddfc2d",
          ],
        },
        {
          id: "cac64ebd-1972-4085-9f95-edceac8a4161",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Dawson Creek",
          title: "Contact Information",
          intro: "<p></p>",
          fields: [
            "f2bd30f4-7f24-44d1-94ec-1e491ba4fbf2",
            "5a7f4cf5-c1f8-4937-8c4b-4bf901a0f031",
          ],
        },
        {
          id: "41c71cd8-b4b7-41c1-95c7-27424ff74f80",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Dease Lake",
          title: "Contact Information",
          intro: "<p></p>",
          fields: [
            "d0c4c752-279a-4696-a088-123dbf09f925",
            "a5be2ad8-bad6-45b8-a19f-4d8768081b3a",
          ],
        },
        {
          id: "9de1ab29-1ed1-45a1-aa61-8df5749c6e93",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Service BC Duncan",
          title: "Contact Information",
          is_published: true,
          intro: "<p></p>",
          fields: [
            "f0cc7bda-8663-4e6c-a49b-2616d87c9357",
            "962477b1-533a-4949-80d2-56becaf6d01f",
          ],
        },
        {
          id: "41d5fad9-931f-456d-be69-664259939dea",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Consumer Taxation",
          title: "Contact the CTPB",
          is_published: true,
          intro:
            "<p>Our hours of operation are Monday through Friday, 8:30am - 4:30pm.</p>",
          fields: [
            "161bd13d-4f86-4377-90a1-3c6bcb00a54b",
            "6a5acf91-689f-4386-a37a-15295e80e7fe",
          ],
        },
        {
          id: "83bfe102-4f09-4190-9766-b44d772e52d5",
          type_id: "d632b0f5-99b8-4a73-a1ac-02f6117388db",
          name: "Speculation and Vacancy Tax",
          title: "Get help with the speculation and vacancy tax",
          is_published: true,
          intro: "<p>If you would like to speak with an agent, call us at:</p>",
          fields: [
            "7e58b21f-9dce-4dc9-b816-42be78f6c082",
            "da41fe07-319b-4c10-92a0-8b3fc25bd506",
            "2cc872b8-574e-4dd1-a029-0b6b4e3d6856",
          ],
        },
      ]);
    });
};
