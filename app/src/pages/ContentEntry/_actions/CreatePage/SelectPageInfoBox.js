import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: white;
  max-width: 465px;
  opacity: 1 !important;
`;

function SelectPageInfoBox() {
  return (
    <StyledDiv>
      <h2>Page types</h2>
      <strong>Topic Page</strong>
    </StyledDiv>
  );
}

export default SelectPageInfoBox;
