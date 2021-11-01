// Prepares Components list data for display by the Table component
function getComponentsTableData(components) {
  const alphaComponents = components.sort((a, b) => {
    const nameA = a?.name?.toLowerCase();
    const nameB = b?.name?.toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const data = [];

  alphaComponents.forEach((component) => {
    let datetime = "";
    let date = "";
    let time = "";

    if (component?.time_last_updated) {
      const componentDate = new Date(component?.time_last_updated);
      const offset = componentDate.getTimezoneOffset();
      const offsetDate = new Date(componentDate.getTime() - offset * 60 * 1000);
      date = offsetDate.toISOString().split("T")[0];
      const hours = offsetDate.getHours();
      const minutes =
        offsetDate.getMinutes < 10
          ? "0" + offsetDate.getMinutes()
          : offsetDate.getMinutes();
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
      const amPm = hours >= 12 ? "PM" : "AM";
      time = `${displayHours}:${displayMinutes} ${amPm}`;
      datetime = `${date} ${time}`;
    }

    data.push({
      id: component?.id,
      name: component?.name,
      status: component?.is_published ? "Published" : "Unpublished",
      type: component?.type_display_name,
      modified_date: datetime.toString(),
      modified_date_date: date.toString(),
      modified_date_time: time.toString(),
      modified_by: component?.last_modified_by_user || "",
    });
  });

  return data;
}

export default getComponentsTableData;
