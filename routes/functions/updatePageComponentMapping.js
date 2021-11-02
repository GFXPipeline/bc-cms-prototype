const knex = require("../../db");

function updatePageComponentMapping(pageId, componentIds) {
  // Get mappings for this page that are already in the database
  knex("page_component_mapping")
    .select("*")
    .where("page_id", pageId)
    .then((mappings) => {
      const toUpsert = [];
      const toDelete = [];

      // The provided component IDs are either new and need to be inserted,
      // or existing and needed to have time_last_updated set to now.
      componentIds.forEach((id) => {
        toUpsert.push({
          page_id: pageId,
          component_id: id,
          time_last_updated: knex.fn.now(),
        });
      });

      // If an existing mapping isn't in the new component IDs,
      // it no longer exists in the page HTML data and should be deleted.
      mappings.forEach((mapping) => {
        if (!componentIds.includes(mapping?.component_id)) {
          toDelete.push(mapping?.component_id);
        }
      });

      // We don't care about the order of operations for upserts and deletes,
      // so these can be fired and forgotten.
      toUpsert.forEach((mapping) => {
        console.log(
          "Attempting to upsert page_id: ",
          pageId,
          ", component_id: ",
          mapping?.component_id
        );

        knex("page_component_mapping")
          .insert(mapping)
          .onConflict(["page_id", "component_id"])
          .merge()
          .returning("*")
          .then((entry) => {
            console.log("entry: ", entry);
          })
          .catch((error) => {
            console.log("error with entry: ", error);
          });
      });

      toDelete.forEach((componentId) => {
        console.log(
          "Attempting to delete page_id: ",
          pageId,
          ", component_id: ",
          componentId
        );

        knex("page_component_mapping")
          .where({
            page_id: pageId,
            component_id: componentId,
          })
          .del()
          .then((rows) => {
            console.log("deleted: ", rows, componentId);
          })
          .catch((error) => {
            console.log("error with deletion: ", error);
          });
      });
    })
    .catch((error) => {
      console.log("error selecting existing mappings: ", error);
    });
}

module.exports = updatePageComponentMapping;
