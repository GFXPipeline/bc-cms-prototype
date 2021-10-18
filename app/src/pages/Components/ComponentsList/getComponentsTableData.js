import ButtonLink from "../../../components/ButtonLink";

// Prepares Components list data for display by the Table component
function getComponentsTableData(components, setComponentId) {
  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Modified Date",
      accessor: "modified_date",
    },
    {
      Header: "Modified By",
      accessor: "modified_by",
    },
  ];

  const data = [];

  components.forEach((component) => {
    data.push({
      title: (
        <ButtonLink onClick={() => setComponentId(component?.id)}>
          {component?.title}
        </ButtonLink>
      ),
      status: component?.status,
      type: component?.display_name,
      modified_date: component?.modified_date,
      modified_by: component?.modified_by,
    });
  });

  return {
    columns,
    data,
  };
}

export default getComponentsTableData;
