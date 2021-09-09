import styled from "styled-components";

import Button from "../../../components/Button";

const StyledDiv = styled.div`
  border: 1px solid #707070;
  display: flex;
  flex-direction: row;
  min-height: 86px;
  overflow-x: auto;
  padding: 20px;

  button {
    font-size: 16px;
    font-weight: 700;
    margin-right: 7px;
    min-height: 44px;
    white-space: nowrap;

    &:first-child {
      margin-right: 42px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  @media (max-width: 1505px) {
    button {
      &:first-child {
        margin-right: auto;
      }

      &:nth-child(2) {
        margin-left: 7px;
      }
    }
  }
`;

function PageActions({ isEditMode, setIsEditMode }) {
  return (
    <StyledDiv>
      {isEditMode ? (
        <Button primary>Save</Button>
      ) : (
        <Button
          primary
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
        >
          Edit
        </Button>
      )}
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
