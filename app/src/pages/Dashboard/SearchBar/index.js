import styled from "styled-components";

import Button from "../../../components/Button";

const StyledDiv = styled.div`
  margin: 30px 0;
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

        {/* Open the targeted item */}
        <Button primary disabled>
          Open
        </Button>

        {/* Expand the advanced search panel below the search bar */}
        <Button primary disabled>
          Advanced Search
        </Button>
      </div>
    </StyledDiv>
  );
}

export default SearchBar;
