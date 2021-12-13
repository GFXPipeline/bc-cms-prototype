import styled from "styled-components";
import Highlighter from "react-highlight-words";
import { NavLink } from "react-router-dom";

// Global components
import LoadSpinner from "../../../components/LoadSpinner";
import SearchBar from "../../../components/SearchBar";

// Page components
import FilterMenu from "./FilterMenu";
import Table from "./Table";
import ComponentActions from "../ComponentActions";

// Page functions
import getComponentsTableData from "./getComponentsTableData";

const StyledDiv = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 450px;
  transition: flex-grow 1s ease-in-out;

  &.expanded {
    flex-grow: 1;
  }
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

  a {
    color: #313132;

    &:hover {
      text-decoration: none;
    }

    &.active {
      ::before {
        content: "▶ ";
      }
    }
  }

  mark.highlighted {
    background-color: #fcba19;
  }

  span.inline-block {
    display: inline-block;
  }
`;

function ComponentsList({
  types,
  components,
  handleCreate,
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
  ...props
}) {
  return (
    <StyledDiv {...props}>
      {/* Component search, filter, and actions */}
      <Search>
        <label htmlFor="search-components">
          Search components by name, type, or modified by
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
      <ComponentActions handleCreate={handleCreate} />

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
                  Header: "Name",
                  accessor: "name",
                  Cell: ({ row }) => {
                    return (
                      <NavLink
                        to={`/components/${row?.original?.id}`}
                        activeClassName="active"
                      >
                        <Highlighter
                          highlightClassName="highlighted"
                          searchWords={[search]}
                          autoEscape={true}
                          textToHighlight={row?.values?.name}
                        />
                      </NavLink>
                    );
                  },
                },
                {
                  Header: "Type",
                  accessor: "type",
                  Cell: ({ row }) => {
                    return (
                      <Highlighter
                        highlightClassName="highlighted"
                        searchWords={[search]}
                        autoEscape={true}
                        textToHighlight={row?.values?.type}
                      />
                    );
                  },
                },
                {
                  Header: "Status",
                  accessor: "status",
                },
                {
                  Header: "Modified Date",
                  accessor: "modified_date",
                  Cell: ({ row }) => {
                    return (
                      <>
                        <span className="inline-block">
                          {row?.original?.modified_date_date}
                        </span>{" "}
                        <span className="inline-block">
                          {row?.original?.modified_date_time}
                        </span>
                      </>
                    );
                  },
                },
                {
                  Header: "Modified By",
                  accessor: "modified_by",
                  Cell: ({ row }) => {
                    return (
                      <Highlighter
                        highlightClassName="highlighted"
                        searchWords={[search]}
                        autoEscape={true}
                        textToHighlight={row?.values?.modified_by}
                      />
                    );
                  },
                },
              ]}
              tableData={getComponentsTableData(components)}
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
