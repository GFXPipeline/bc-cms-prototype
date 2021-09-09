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

    &:last-child {
      margin-right: 0;
    }

    &.button-edit {
      margin-right: 42px;
    }

    &.push-left {
      margin-right: auto;
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

function PageActions({
  isPageOpen,
  isEditMode,
  setIsEditMode,
  onSave,
  onCancel,
}) {
  return (
    <StyledDiv>
      {isEditMode ? (
        <>
          <Button primary onClick={onSave}>
            Save
          </Button>
          <Button className="push-left" onClick={onCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <Button
          primary
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
          className="button-edit"
          disabled={!isPageOpen}
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
