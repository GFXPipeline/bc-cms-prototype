import styled from "styled-components";

import Button from "../../../../../components/Button";
import TextInput from "../../../../../components/TextInput";

const StyledDiv = styled.div`
  padding: 24px;

  h3 {
    font-size: 30px;
    margin: 0 0 18px 0;
  }

  label {
    display: block;
    font-size: 16px;
    margin: 0 0 18px 0;
  }

  div.location-input {
    display: flex;
    flex-direction: row;
    width: 575px;
  }
`;

function PageLocation({ location, setLocation }) {
  return (
    <StyledDiv>
      <h3>Page location</h3>
      <label htmlFor="page-location">Select where to create the page(s):</label>
      <div className="location-input">
        <TextInput
          id="page-location"
          disabled
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button primary disabled>
          Browse
        </Button>
      </div>
    </StyledDiv>
  );
}

export default PageLocation;
