exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("page_deletions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("page_deletions").insert([
        {
          id: "05a37aa2-dfd1-4f87-9874-7fe8079f3f46",
          page_id: "8e15d5e0-c278-4254-baa5-a17f8d47cced",
          is_hard_delete: true,
          reason: "This tax has been replaced by PST.",
          is_delete_date_set: false,
          time_to_delete: "2021-09-28T07:00:00+00:00",
          is_notification_requested: false,
          is_subscriber_message_set: false,
          subscriber_message: null,
          deleted_by_user: "15e2f70d-da94-4c5e-a85f-07a9831f319b",
          last_modified_by_user: "15e2f70d-da94-4c5e-a85f-07a9831f319b",
        },
        {
          id: "4f760346-cf67-4f60-92f8-1d4d29377d8b",
          page_id: "6f1288db-32c2-497d-8fc5-77adf317a1b1",
          is_hard_delete: true,
          reason: "Merged into Invasive Species page.",
          is_delete_date_set: false,
          time_to_delete: "2021-09-28T07:00:00+00:00",
          is_notification_requested: false,
          is_subscriber_message_set: false,
          subscriber_message: null,
          deleted_by_user: "15e2f70d-da94-4c5e-a85f-07a9831f319b",
          last_modified_by_user: "15e2f70d-da94-4c5e-a85f-07a9831f319b",
        },
        {
          id: "104d1a0f-3e72-460d-8f09-0bdf6ddf44c4",
          page_id: "7a9a5e81-05a0-4c99-b667-0eedf9ea801d",
          is_hard_delete: true,
          reason: "Merged into our Invasive Species content.",
          is_delete_date_set: false,
          time_to_delete: "2021-09-28T07:00:00+00:00",
          is_notification_requested: false,
          is_subscriber_message_set: false,
          subscriber_message: null,
          deleted_by_user: "15e2f70d-da94-4c5e-a85f-07a9831f319b",
          last_modified_by_user: "15e2f70d-da94-4c5e-a85f-07a9831f319b",
        },
      ]);
    });
};
