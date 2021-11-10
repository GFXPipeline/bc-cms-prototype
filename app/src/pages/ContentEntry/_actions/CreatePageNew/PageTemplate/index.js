import styled from "styled-components";

import Icon from "../../../../../components/Icon";
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
    align-items: center;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 50%;

    svg {
      color: #3c3c3c;
      height: 200px;
      max-width: 255px;
    }
  }

  div.description {
    padding: 16px;
    width: 50%;
  }
`;

function PageTemplate({
  availablePageTemplates,
  isLoadingPageTemplates,
  pageTemplate,
  setPageTemplate,
}) {
  return (
    <StyledDiv>
      <h3>Page templates</h3>
      <p>Choose a page template category. Page templates are...</p>
      <fieldset>
        {isLoadingPageTemplates && <LoadSpinner />}
        {availablePageTemplates &&
          Array.isArray(availablePageTemplates) &&
          availablePageTemplates.length > 0 &&
          availablePageTemplates.map((template, index) => {
            return (
              <Option
                key={`option-${index}`}
                className={pageTemplate === template?.name ? "selected" : null}
              >
                <div className="icon">
                  <Icon id={template?.icon} />
                </div>
                <div className="description">
                  <input
                    type="radio"
                    id={`page-template-${template?.name}`}
                    checked={pageTemplate === template?.name}
                    onChange={() => setPageTemplate(template?.name)}
                  />
                  <label htmlFor={`page-template-${template?.name}`}>
                    {template?.display_name}
                  </label>
                  <p>{template?.description}</p>
                </div>
              </Option>
            );
          })}
      </fieldset>
    </StyledDiv>
  );
}

export default PageTemplate;
