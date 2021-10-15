import styled from "styled-components";

// Global components
import ButtonLink from "../../../components/ButtonLink";
import LoadSpinner from "../../../components/LoadSpinner";
import SearchBar from "../../../components/SearchBar";
import Select from "../../../components/Select";

// Page components
import FilterMenu from "./FilterMenu";
import ComponentActions from "../ComponentActions";

const StyledDiv = styled.div`
  background-color: #f2f2f2;
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

function ComponentsList({
  types,
  components,
  handleSelectType,
  isLoadingTypes,
  isErrorTypes,
  isLoadingComponentsList,
  isErrorComponentsList,
  isShowAll,
  search,
  setIsShowAll,
  setSearch,
  selectedType,
  setComponentId,
}) {
  return (
    <StyledDiv>
      {/* Component search */}
      <Search>
        <label htmlFor="search-components">
          Search components by title, status, type, or modified by
        </label>
        <SearchBar id="search-components" value={search} setValue={setSearch} />
      </Search>

      <FilterMenu isShowAll={isShowAll} setIsShowAll={setIsShowAll} />
      <ComponentActions />

      {/* Component types */}
      {isLoadingTypes ? (
        <LoadSpinner />
      ) : (
        <>
          <label htmlFor="select-component-type">Select a component type</label>
          <Select
            id="select-component-type"
            name="select-component-type"
            onChange={handleSelectType}
            value={selectedType}
            options={[
              { label: " ", disabled: true },
              { id: "all", label: "All", value: "all" },
              ...types,
            ]}
          />
        </>
      )}
      {isErrorTypes && (
        <p className="error">Could not fetch component types list.</p>
      )}

      {/* Components */}
      {isLoadingComponentsList ? (
        <LoadSpinner />
      ) : (
        components &&
        Array.isArray(components) &&
        components.length > 0 && (
          <>
            <h2>Components</h2>
            <ul>
              {components
                ?.sort((a, b) => {
                  const titleA = a?.title.toUpperCase();
                  const titleB = b?.title.toUpperCase();
                  if (titleA < titleB) {
                    return -1;
                  }
                  if (titleA > titleB) {
                    return 1;
                  }
                  return 0;
                })
                ?.map((component, index) => {
                  return (
                    <li key={index}>
                      <ButtonLink onClick={() => setComponentId(component?.id)}>
                        {component?.title}
                      </ButtonLink>
                    </li>
                  );
                })}
            </ul>
          </>
        )
      )}
      {isErrorComponentsList && (
        <p className="error">Could not fetch components list.</p>
      )}
    </StyledDiv>
  );
}

export default ComponentsList;
