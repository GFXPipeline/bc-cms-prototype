import ButtonLink from "../../../components/ButtonLink";

// Prepares Components list data for display by the Table component
function getComponentsTableData(components, setComponentId) {
  const data = [];

  components.forEach((component) => {
    let date = "";

    if (component?.time_last_updated) {
      const componentDate = new Date(component?.time_last_updated);
      const offset = componentDate.getTimezoneOffset();
      const offsetDate = new Date(componentDate.getTime() - offset * 60 * 1000);
      date = offsetDate.toISOString().split("T")[0];
    }

    data.push({
      title: (
        <ButtonLink onClick={() => setComponentId(component?.id)}>
          {component?.title}
        </ButtonLink>
      ),
      status: component?.is_published ? "Published" : "Unpublished",
      type: component?.type_display_name,
      modified_date: date.toString(),
      modified_by: component?.last_modified_by_user,
    });
  });

  return data;
}

export default getComponentsTableData;
