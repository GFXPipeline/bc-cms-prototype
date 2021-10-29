import Highlighter from "react-highlight-words";
import { NavLink } from "react-router-dom";

// Prepares Components list data for display by the Table component
function getComponentsTableData(components, search) {
  const alphaComponents = components.sort((a, b) => {
    const nameA = a?.name?.toLowerCase();
    const nameB = b?.name?.toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const data = [];

  alphaComponents.forEach((component) => {
    let date = "";

    if (component?.time_last_updated) {
      const componentDate = new Date(component?.time_last_updated);
      const offset = componentDate.getTimezoneOffset();
      const offsetDate = new Date(componentDate.getTime() - offset * 60 * 1000);
      date = offsetDate.toISOString().split("T")[0];
    }

    data.push({
      name: (
        <NavLink to={`/components/${component?.id}`} activeClassName="active">
          <Highlighter
            highlightClassName="highlighted"
            searchWords={[search]}
            autoEscape={true}
            textToHighlight={component?.name}
          />
        </NavLink>
      ),
      status: component?.is_published ? "Published" : "Unpublished",
      type: (
        <Highlighter
          highlightClassName="highlighted"
          searchWords={[search]}
          autoEscape={true}
          textToHighlight={component?.type_display_name}
        />
      ),
      modified_date: date.toString(),
      modified_by: (
        <Highlighter
          highlightClassName="highlighted"
          searchWords={[search]}
          autoEscape={true}
          textToHighlight={component?.last_modified_by_user || ""}
        />
      ),
    });
  });

  return data;
}

export default getComponentsTableData;
