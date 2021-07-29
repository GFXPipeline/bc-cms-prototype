import styled from "styled-components";

import Button from "../../../components/Button";

const StyledDiv = styled.div`
  border: 1px solid #707070;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding: 20px;

  button {
    font-size: 16px;
    font-weight: 700;
    margin-right: 7px;

    &:first-child {
      margin-right: 42px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

function PageActions() {
  return (
    <StyledDiv>
      <Button primary>Edit</Button>
      <Button>View PROD</Button>
      <Button>View QA</Button>
      <Button>Preview</Button>
      <Button>Publish</Button>
      <Button>Unpublish</Button>
      <Button>Lock</Button>
      <Button>Copy</Button>
      <Button>Link</Button>
    </StyledDiv>
  );
}

export default PageActions;
