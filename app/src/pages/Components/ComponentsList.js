import styled from "styled-components";
import ButtonLink from "../../components/ButtonLink";
import LoadSpinner from "../../components/LoadSpinner";
import Select from "../../components/Select";

const StyledDiv = styled.div`
  background-color: white;
  margin: 16px;
  min-width: 300px;

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
  selectedType,
  setComponentId,
}) {
  return (
    <StyledDiv>
      <h1>Component Library</h1>
      <p>Reusable components for use across many pages.</p>

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
              {components?.map((component, index) => {
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
