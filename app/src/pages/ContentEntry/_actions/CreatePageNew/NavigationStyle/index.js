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
    margin: 0 0 18px 0;
  }

  p.panel-description {
    margin: 0 0 18px 0;
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

    @media (max-width: 1250px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  div.nav-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    button.no-nav {
      align-items: center;
      border: 2px solid transparent;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      font-size: 16px;
      font-weight: 700;
      line-height: 27px;

      div.checkbox {
        border: 3px solid #3c3c3c;
        border-radius: 2px;
        content: "";
        display: inline-block;
        height: 24px;
        margin-right: 12px;
        text-align: center;
        width: 24px;
      }

      &.checked {
        border-color: blue;

        div.checkbox {
          background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='check' class='svg-inline--fa fa-check fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='currentColor' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'%3E%3C/path%3E%3C/svg%3E");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 16px 16px;
        }
      }
    }

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
    height: 100%;
    justify-content: space-around;
    width: 233px;

    svg {
      color: #3c3c3c;
      max-height: 190px;
      width: 220px;
    }
  }

  div.description {
    margin-left: 16px;
    text-align: left;
    width: 50%;

    div.text {
      p {
        font-size: 15px;
        margin: 10px 0;

        &:last-child {
          margin-bottom: 0px;
        }
      }

      ul {
        margin: 10px 0;

        li {
          font-size: 15px;
        }
      }
    }
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

function NavigationStyle({
  availableNavTypes,
  isError,
  isLoading,
  navType,
  setNavType,
  setTab,
}) {
  return (
    <StyledDiv>
      <h3>Navigation style</h3>
      <p className="panel-description">
        Choose a navigation style. The navigation style shows how the children
        pages will be displayed.
      </p>
      <div className="options">
        {isLoading && <LoadSpinner />}
        {availableNavTypes &&
          Array.isArray(availableNavTypes) &&
          availableNavTypes.length > 0 &&
          availableNavTypes.map((style, index) => {
            return (
              <Button
                key={`option-${index}`}
                onClick={() => setNavType(style?.name)}
                className={navType === style?.name ? "selected" : null}
              >
                <div className="icon">
                  <Icon id={style?.icon} />
                </div>
                <div className="description">
                  <label htmlFor={`nav-style-${style?.name}`}>
                    {style?.display_name}
                  </label>
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: style?.description }}
                  />
                </div>
              </Button>
            );
          })}
      </div>
      <div className="nav-buttons">
        <button
          className="no-nav"
          className={navType === "none" ? "no-nav checked" : "no-nav"}
          onClick={() => setNavType("none")}
        >
          <div className="checkbox" />
          <span>No navigation</span>
        </button>
        <button
          className="next"
          onClick={() => setTab("content-review-schedule")}
          disabled={!navType}
        >
          Next »
        </button>
      </div>
    </StyledDiv>
  );
}

export default NavigationStyle;
