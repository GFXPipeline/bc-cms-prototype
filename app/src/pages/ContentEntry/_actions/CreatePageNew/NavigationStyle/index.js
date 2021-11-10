import styled from "styled-components";

import Icon from "../../../../../components/Icon";
import LoadSpinner from "../../../../../components/LoadSpinner";

const StyledDiv = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;

  h3 {
    font-size: 30px;
    margin: 0 0 18px 0;
  }

  p.panel-description {
    margin: 0 0 18px 0;
  }

  fieldset {
    border: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 25px;
    margin: 0px;
    padding: 0px;

    div.radio-option {
      align-items: center;
      display: flex;
      flex-direction: row;

      &:focus-within {
        outline: 3px solid blue;
      }

      input[type="radio"] {
        margin: 0px;
        opacity: 0.01;
        width: 0.01px;
      }

      input[type="radio"] + label {
        align-items: center;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        font-size: 16px;
        font-weight: 700;
        line-height: 27px;

        &::before {
          border: 3px solid #3c3c3c;
          border-radius: 2px;
          content: "";
          display: inline-block;
          height: 20px;
          margin-right: 12px;
          text-align: center;
          width: 20px;
        }
      }

      input[type="radio"]:checked + label {
        text-decoration: underline;

        &::before {
          background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='check' class='svg-inline--fa fa-check fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='currentColor' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'%3E%3C/path%3E%3C/svg%3E");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 16px 16px;
        }
      }
    }
  }
`;

const Option = styled.div`
  background-color: #f6f6f6;
  border: 1px solid transparent;
  display: flex;
  flex-direction: row;
  max-width: 600px;
  padding: 20px;
  width: 583px;

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
    height: 100%;
    justify-content: space-around;
    width: 233px;

    svg {
      color: #3c3c3c;
      max-height: 180px;
      width: 220px;
    }
  }

  div.description {
    margin-left: 16px;
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
`;

function NavigationStyle({
  availableNavTypes,
  isError,
  isLoading,
  navType,
  setNavType,
}) {
  return (
    <StyledDiv>
      <h3>Navigation style</h3>
      <p className="panel-description">
        Choose a navigation style. The navigation style shows how the children
        pages will be displayed.
      </p>
      <fieldset>
        {isLoading && <LoadSpinner />}
        {availableNavTypes &&
          Array.isArray(availableNavTypes) &&
          availableNavTypes.length > 0 &&
          availableNavTypes.map((style, index) => {
            return (
              <Option
                key={`option-${index}`}
                className={navType === style?.name ? "selected" : null}
              >
                <div className="icon">
                  <Icon id={style?.icon} />
                </div>
                <div className="description">
                  <input
                    type="radio"
                    id={`nav-style-${style?.name}`}
                    checked={navType === style?.name}
                    onChange={() => setNavType(style?.name)}
                  />
                  <label htmlFor={`nav-style-${style?.name}`}>
                    {style?.display_name}
                  </label>
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: style?.description }}
                  />
                </div>
              </Option>
            );
          })}
        <div className="radio-option">
          <input
            type="radio"
            id="nav-style-none"
            checked={navType === "none"}
            onChange={() => setNavType("none")}
          />
          <label htmlFor="nav-style-none">No navigation</label>
        </div>
      </fieldset>
    </StyledDiv>
  );
}

export default NavigationStyle;
