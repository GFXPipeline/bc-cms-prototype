import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: white;
  font-size: 16px;
  max-width: 465px;
  opacity: 1 !important;

  div {
    max-height: 340px;
    overflow-y: auto;
    padding: 8px 21px;
  }
`;

function SelectPageInfoBox() {
  return (
    <StyledDiv>
      <div>
        <h2>Page types</h2>
        <strong>Topic Page</strong>
      </div>
    </StyledDiv>
  );
}

export default SelectPageInfoBox;
