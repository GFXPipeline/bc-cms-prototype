import styled from "styled-components";

import DropdownPanel from "../../../../components/DropdownPanel";
import Icon from "../../../../components/Icon";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px;

  div.radio-group {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-right: 8px;

    input[type="radio"] {
      height: 0;
      margin: 0;
      opacity: 0.01;
      width: 0;
    }

    input[type="radio"] + label {
      align-items: center;
      border-bottom: 5px solid transparent;
      border-top: 5px solid transparent;
      cursor: pointer;
      display: flex;
      height: 44px;
      line-height: 44px;
      margin: 0;
      padding: 0 16px;

      &:hover {
        background-color: #d6d6d6;
      }
    }

    input[type="radio"]:checked + label {
      border-bottom: 5px solid #323231;
    }

    label {
      font-size: 16px;
    }
  }

  div.dropdown {
    margin-left: auto;

    button {
      background: none;
      border: none;
      cursor: pointer;
      height: 44px;
      margin-left: auto;
      width: 44px;

      &:hover {
        background-color: #d6d6d6;
      }

      svg {
        width: 20px;
      }
    }

    div.open {
      padding: 16px;
      width: 200px;

      fieldset {
        border: none;
        padding: 0;

        &:first-child {
          margin-bottom: 16px;
        }

        legend {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        div.checkbox-option {
          display: flex;
          flex-direction: row;
          align-items: center;

          input[type="checkbox"] {
            cursor: pointer;
            margin: 0;
          }

          label {
            cursor: pointer;
            font-size: 16px;
            padding-left: 8px;
          }
        }
      }
    }
  }
`;

function FilterMenu({ isShowAll, setIsShowAll }) {
  function handleChange(e) {
    const { value } = e.target;

    if (value === "all-components") {
      return setIsShowAll(true);
    }

    return setIsShowAll(false);
  }

  return (
    <StyledDiv>
      <div className={isShowAll ? "radio-group selected" : "radio-group"}>
        <input
          type="radio"
          id="all-components"
          name="components"
          value="all-components"
          onChange={handleChange}
        />
        <label htmlFor="all-components">All</label>
      </div>
      <div className={!isShowAll ? "radio-group selected" : "radio-group"}>
        <input
          type="radio"
          id="my-components"
          name="components"
          value="my-components"
          onChange={handleChange}
        />
        <label htmlFor="my-components">My Components</label>
      </div>
      <DropdownPanel
        className={"dropdown"}
        buttonAriaLabel={"Filters"}
        buttonContent={<Icon id="fa-filter.svg" />}
      >
        <fieldset>
          <legend>Filter by status:</legend>
          <div className="checkbox-option">
            <input type="checkbox" name="status" id="published" />
            <label htmlFor="published">Published</label>
          </div>
          <div className="checkbox-option">
            <input type="checkbox" name="status" id="unpublished" />
            <label htmlFor="unpublished">Unpublished</label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Filter by type:</legend>
          <div className="checkbox-option">
            <input type="checkbox" name="type" id="accordion" />
            <label htmlFor="accordion">Accordion</label>
          </div>
          <div className="checkbox-option">
            <input type="checkbox" name="type" id="alert" />
            <label htmlFor="alert">Alert</label>
          </div>
          <div className="checkbox-option">
            <input type="checkbox" name="type" id="callout" />
            <label htmlFor="callout">Callout</label>
          </div>
          <div className="checkbox-option">
            <input type="checkbox" name="type" id="contact-us" />
            <label htmlFor="contact-us">Contact Us</label>
          </div>
          <div className="checkbox-option">
            <input type="checkbox" name="type" id="promo-box" />
            <label htmlFor="promo-box">Promo Box</label>
          </div>
          <div className="checkbox-option">
            <input type="checkbox" name="type" id="related-links" />
            <label htmlFor="related-links">Related Links</label>
          </div>
          <div className="checkbox-option">
            <input type="checkbox" name="type" id="table" />
            <label htmlFor="table">Table</label>
          </div>
          <div className="checkbox-option">
            <input type="checkbox" name="type" id="text" />
            <label htmlFor="text">Text</label>
          </div>
        </fieldset>
      </DropdownPanel>
    </StyledDiv>
  );
}

export default FilterMenu;
