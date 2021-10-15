import styled from "styled-components";

import Icon from "../../../../components/Icon";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;

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
      font-weight: 700;
    }
  }

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
      <button>
        <Icon id="fa-filter.svg" />
      </button>
    </StyledDiv>
  );
}

export default FilterMenu;
