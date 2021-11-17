import { useState } from "react";
import styled from "styled-components";

import Icon from "../../../../../components/Icon";
import LoadSpinner from "../../../../../components/LoadSpinner";

const StyledDiv = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px 24px 0 24px;

  h3 {
    font-size: 30px;
    margin-top: 0px;
  }

  div.options {
    border: none;
    column-gap: 20px;
    display: grid;
    flex-grow: 1;
    grid-template-columns: repeat(2, 1fr);
    margin: 0px;
    overflow-y: auto;
    padding: 0px;
    row-gap: 20px;

    @media (max-width: 1100px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  div.nav-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    button {
      background: none;
      border: none;
      cursor: pointer;
      display: inline-block;
      font-size: 16px;
      font-weight: 700;
      height: 44px;

      &:disabled {
        cursor: not-allowed;
      }

      &:hover {
        background-color: #d6d6d6;
        text-decoration: underline;
      }

      &.next {
        margin-left: auto;
        margin-right: 0px;
      }
    }
  }
`;

const Button = styled.button`
  align-items: stretch;
  background-color: #f6f6f6;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 20px;

  &.selected {
    border-color: blue;
  }

  label {
    font-size: 16px;
    font-weight: 700;
  }

  div.icon {
    align-items: center;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    max-height: 174px;
    width: 50%;

    svg {
      color: #3c3c3c;
      height: 200px;
      max-width: 255px;
    }
  }

  div.description {
    padding: 16px;
    text-align: left;
    width: 50%;
  }

  &:hover {
    background-color: #e6e6e6;

    div.description {
      label {
        text-decoration: underline;
      }
    }
  }
`;

function PageTemplate({
  availablePageTemplates,
  isLoadingPageTemplates,
  pageTemplate,
  pageTemplateType,
  setPageTemplate,
  setPageTemplateType,
  setTab,
}) {
  const [step, setStep] = useState(1);

  return (
    <StyledDiv>
      {step === 1 && (
        <>
          <div className="intro">
            <h3>Page templates</h3>
            <p>Choose a page template category. Page templates are...</p>
          </div>
          <div className="options">
            {isLoadingPageTemplates && <LoadSpinner />}
            {availablePageTemplates &&
              Array.isArray(availablePageTemplates) &&
              availablePageTemplates.length > 0 && (
                <Button
                  id="page-template-type-base"
                  onClick={() => setPageTemplateType("base-template")}
                  className={
                    pageTemplateType === "base-template" ? "selected" : null
                  }
                >
                  <div className="icon">
                    <Icon id={"bc-base-template-1.svg"} />
                  </div>
                  <div className="description">
                    <label htmlFor={`page-template-type-base`}>
                      Base templates
                    </label>
                    <p>
                      This is the description of the base templates and when it
                      should be used in web content.
                    </p>
                  </div>
                </Button>
              )}
          </div>
          <div className="nav-buttons">
            <button
              className="next"
              onClick={() => setStep(2)}
              disabled={!pageTemplateType}
            >
              Select a base template »
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="intro">
            <h3>Base templates</h3>
            <p>Choose a page template. Page templates are...</p>
          </div>
          <div className="options">
            {isLoadingPageTemplates && <LoadSpinner />}
            {availablePageTemplates &&
              Array.isArray(availablePageTemplates) &&
              availablePageTemplates.length > 0 &&
              availablePageTemplates.map((template, index) => {
                return (
                  <Button
                    key={`option-${index}`}
                    onClick={() => setPageTemplate(template?.name)}
                    className={
                      pageTemplate === template?.name ? "selected" : null
                    }
                  >
                    <div className="icon">
                      <Icon id={template?.icon} />
                    </div>
                    <div className="description">
                      <label htmlFor={`page-template-${template?.name}`}>
                        {template?.display_name}
                      </label>
                      <p>{template?.description}</p>
                    </div>
                  </Button>
                );
              })}
          </div>
          <div className="nav-buttons">
            <button className="back" onClick={() => setStep(1)}>
              « Back to page templates
            </button>
            <button
              className="next"
              onClick={() => setTab("navigation-style")}
              disabled={!pageTemplate}
            >
              Next »
            </button>
          </div>
        </>
      )}
    </StyledDiv>
  );
}

export default PageTemplate;
