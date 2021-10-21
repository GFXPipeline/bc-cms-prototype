import styled from "styled-components";

import Icon from "../Icon";

const StyledDiv = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0px;
  border: 2px solid #3e3e3e;
  display: flex;
  flex-direction: row;

  &.disabled {
    border-color: #6f6f6f;
  }

  input[type="text"] {
    border: none;
    font-size: 16px;
    height: 44px;
    padding: 4px;
    width: 100%;

    &:disabled {
      &:hover {
        cursor: not-allowed;
      }
    }
  }

  button {
    background-color: white;
    border: none;
    cursor: pointer;
    height: 44px;
    padding: 0;
    width: 44px;

    svg {
      width: 12px;
    }

    &:hover {
      background-color: #d6d6d6;
    }
  }
`;

function SearchBar({ disabled, value, setValue, ...props }) {
  return (
    <StyledDiv>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        {...props}
      />
      {value && (
        <button onClick={() => setValue("")}>
          <Icon id={"fa-times.svg"} />
        </button>
      )}
    </StyledDiv>
  );
}

export default SearchBar;
