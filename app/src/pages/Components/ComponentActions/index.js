import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: white;
  border: 1px solid #707070;
  display: flex;
  flex-direction: row;
  min-height: 46px;
  overflow-x: auto;

  button {
    background-color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-right: 7px;
    min-height: 44px;
    padding: 0 16px;
    white-space: nowrap;

    &:last-child {
      margin-left: auto;
      margin-right: 0;
    }

    &:hover {
      text-decoration: underline;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

function ComponentActions({handleCreate}) {
  return (
    <StyledDiv>
      <button onClick={handleCreate}>Create</button>
      <button disabled>Clone</button>
      <button disabled>Delete</button>
      <button disabled>Restore</button>
    </StyledDiv>
  );
}

export default ComponentActions;
