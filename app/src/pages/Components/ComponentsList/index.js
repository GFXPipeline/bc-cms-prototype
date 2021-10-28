import styled from "styled-components";

// Global components
import LoadSpinner from "../../../components/LoadSpinner";
import SearchBar from "../../../components/SearchBar";
import Table from "../../../components/Table";

// Page components
import FilterMenu from "./FilterMenu";
import ComponentActions from "../ComponentActions";

// Page functions
import getComponentsTableData from "./getComponentsTableData";

const StyledDiv = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 450px;
`;

const Search = styled.div`
  margin: 16px;

  label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 8px;
  }
`;

const TableContainer = styled.div`
  background-color: #f2f2f2;
  flex-grow: 1;
  overflow: auto;

  mark.highlighted {
    background-color: #fcba19;
  }
`;

function ComponentsList({
  types,
  components,
  isLoadingComponentsList,
  isErrorComponentsList,
  isShowAll,
  search,
  selectedStatuses,
  selectedTypes,
  setIsShowAll,
  setSearch,
  setSelectedStatuses,
  setSelectedTypes,
  setComponentId,
}) {
  return (
    <StyledDiv>
      {/* Component search, filter, and actions */}
      <Search>
        <label htmlFor="search-components">
          Search components by title, type, or modified by
        </label>
        <SearchBar id="search-components" value={search} setValue={setSearch} />
      </Search>
      <FilterMenu
        isShowAll={isShowAll}
        selectedStatuses={selectedStatuses}
        selectedTypes={selectedTypes}
        setIsShowAll={setIsShowAll}
        setSelectedStatuses={setSelectedStatuses}
        setSelectedTypes={setSelectedTypes}
        types={types}
      />
      <ComponentActions />

      {/* Components list */}
      {isLoadingComponentsList ? (
        <LoadSpinner />
      ) : (
        components &&
        Array.isArray(components) &&
        components.length > 0 && (
          <TableContainer>
            <Table
              id="components-table"
              tableColumns={[
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
              ]}
              tableData={getComponentsTableData(
                components,
                setComponentId,
                search
              )}
            />
          </TableContainer>
        )
      )}
      {isErrorComponentsList && (
        <p className="error">Could not fetch components list.</p>
      )}
    </StyledDiv>
  );
}

export default ComponentsList;
