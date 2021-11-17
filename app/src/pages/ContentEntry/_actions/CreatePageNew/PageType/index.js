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

  span {
    font-size: 16px;
    font-weight: 700;
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
      height: 100px;
      max-width: 100px;
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
      span {
        text-decoration: underline;
      }
    }
  }
`;

function PageType({
  availablePageTypes,
  isLoadingPageTypes,
  pageType,
  setPageType,
  setTab,
}) {
  return (
    <StyledDiv>
      <div className="intro">
        <h3>Page types</h3>
        <p>Choose a page type. Page types are...</p>
      </div>
      <div className="options">
        {isLoadingPageTypes && <LoadSpinner />}
        {availablePageTypes &&
          Array.isArray(availablePageTypes) &&
          availablePageTypes.length > 0 &&
          availablePageTypes.map((type, index) => {
            console.log("type: ", type);
            return (
              <Button
                key={`button-${index}`}
                onClick={() => setPageType(type?.name)}
                className={pageType === type?.name ? "selected" : null}
              >
                <div className="icon">
                  <Icon id={type?.icon} />
                </div>
                <div className="description">
                  <span>{type?.display_name}</span>
                  <p>{type?.description}</p>
                </div>
              </Button>
            );
          })}
      </div>
      <div className="nav-buttons">
        <button
          className="next"
          onClick={() => setTab("page-template")}
          disabled={!pageType}
        >
          Next »
        </button>
      </div>
    </StyledDiv>
  );
}

export default PageType;
