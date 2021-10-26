import styled from "styled-components";

import Button from "../../../components/Button";

const StyledDiv = styled.div`
  margin-top: 32px;
  max-width: 1387px;
  min-width: 900px;

  div.input-field {
    display: flex;
    flex-direction: row;

    input[type="text"] {
      flex-grow: 1;
    }

    button {
      margin-left: 8px;
    }
  }
`;

function SearchBar() {
  return (
    <StyledDiv>
      <label htmlFor="dashboard-search">Open item by URL or ID</label>
      <div className="input-field">
        <input type="text" id="dashboard-search" />
        <Button primary>Open</Button>
        <Button primary>Advanced Search</Button>
      </div>
    </StyledDiv>
  );
}

export default SearchBar;
