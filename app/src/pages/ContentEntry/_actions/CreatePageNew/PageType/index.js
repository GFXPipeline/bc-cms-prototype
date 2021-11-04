import styled from "styled-components";

import LoadSpinner from "../../../../../components/LoadSpinner";

const StyledDiv = styled.div`
  background-color: #ffffff;
  padding: 24px;

  h3 {
    font-size: 30px;
    margin-top: 0px;
  }

  fieldset {
    border: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 25px;
    margin: 0px;
    padding: 0px;
  }
`;

const Option = styled.div`
  background-color: #f6f6f6;
  border: 1px solid transparent;
  display: flex;
  flex-direction: row;
  max-width: 583px;
  padding: 20px;

  &:focus-within {
    outline: 2px solid blue;
  }

  &.selected {
    border-color: #707070;
  }

  input[type="radio"] {
    margin: 0px;
    opacity: 0.01;
    width: 0px;
  }

  input[type="radio"]:checked + label {
    text-decoration: underline;
  }

  label {
    font-size: 16px;
    font-weight: 700;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  div.icon {
    background-color: white;
    width: 50%;
  }

  div.description {
    padding: 16px;
    width: 50%;
  }
`;

function PageType({
  availablePageTypes,
  isLoadingPageTypes,
  pageType,
  setPageType,
}) {
  return (
    <StyledDiv>
      <h3>Page types</h3>
      <fieldset>
        {isLoadingPageTypes && <LoadSpinner />}
        {availablePageTypes &&
          Array.isArray(availablePageTypes) &&
          availablePageTypes.length > 0 &&
          availablePageTypes.map((type, index) => {
            return (
              <Option
                key={`option-${index}`}
                className={pageType === type?.name ? "selected" : null}
              >
                <div className="icon"></div>
                <div className="description">
                  <input
                    type="radio"
                    id={`page-type-${type?.name}`}
                    checked={pageType === type?.name}
                    onChange={() => setPageType(type?.name)}
                  />
                  <label htmlFor={`page-type-${type?.name}`}>
                    {type?.display_name}
                  </label>
                  <p>{type?.description}</p>
                </div>
              </Option>
            );
          })}
      </fieldset>
    </StyledDiv>
  );
}

export default PageType;
