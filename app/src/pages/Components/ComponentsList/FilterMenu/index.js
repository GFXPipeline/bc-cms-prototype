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
      border-bottom: 5px solid #313132;
    }

    input[type="radio"]:focus + label {
      outline: 2px solid blue;
      outline-offset: 2px;
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
      margin-left: -156px;
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

function FilterMenu({
  isShowAll,
  selectedStatuses,
  selectedTypes,
  setIsShowAll,
  setSelectedStatuses,
  setSelectedTypes,
  types,
}) {
  function handleSelectedStatuses(e) {
    const selected = [...selectedStatuses];
    const value = e.target.value;

    if (selectedStatuses?.includes(value)) {
      const index = selectedStatuses.indexOf(value);
      selected.splice(index, 1);
    } else {
      selected.push(value);
    }

    setSelectedStatuses(selected);
  }

  function handleSelectedTypes(e) {
    const selected = [...selectedTypes];
    const value = e.target.value;

    if (selectedTypes?.includes(value)) {
      const index = selectedTypes.indexOf(value);
      selected.splice(index, 1);
    } else {
      selected.push(value);
    }

    setSelectedTypes(selected);
  }

  return (
    <StyledDiv>
      <div className={isShowAll ? "radio-group selected" : "radio-group"}>
        <input
          type="radio"
          id="all-components"
          name="components"
          value="all-components"
          checked={isShowAll}
          onChange={() => setIsShowAll(true)}
        />
        <label htmlFor="all-components">All</label>
      </div>
      <div className={!isShowAll ? "radio-group selected" : "radio-group"}>
        <input
          type="radio"
          id="my-components"
          name="components"
          value="my-components"
          checked={!isShowAll}
          onChange={() => setIsShowAll(false)}
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
            <input
              type="checkbox"
              name="status"
              id="published"
              value="published"
              checked={selectedStatuses?.includes("published")}
              onChange={handleSelectedStatuses}
            />
            <label htmlFor="published">Published</label>
          </div>
          <div className="checkbox-option">
            <input
              type="checkbox"
              name="status"
              id="unpublished"
              value="unpublished"
              checked={selectedStatuses?.includes("unpublished")}
              onChange={handleSelectedStatuses}
            />
            <label htmlFor="unpublished">Unpublished</label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Filter by type:</legend>
          {types &&
            Array.isArray(types) &&
            types.length > 0 &&
            types.map((type, index) => {
              return (
                <div
                  className="checkbox-option"
                  key={`checkbox-option-${index}`}
                >
                  <input
                    type="checkbox"
                    name="type"
                    id={type?.id}
                    value={type?.id}
                    checked={selectedTypes?.includes(type?.id)}
                    onChange={handleSelectedTypes}
                  />
                  <label htmlFor={type?.id}>{type?.display_name}</label>
                </div>
              );
            })}
        </fieldset>
      </DropdownPanel>
    </StyledDiv>
  );
}

export default FilterMenu;
