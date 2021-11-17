import styled from "styled-components";

import Button from "../../../../../components/Button";

const StyledDiv = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  height: 90%;
  justify-content: space-around;
  max-height: 90%;
  max-width: 1600px;
  min-height: 80%;
  padding: 0px;
  position: absolute;
  width: 100%;

  h2 {
    text-align: center;
  }

  div.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;
  }
`;

function CancelPrompt({ handleCleanup, setIsCancelling }) {
  return (
    <StyledDiv aria-modal={true}>
      <div>
        <h2>Cancel?</h2>
        <p>Closing this window will lose your configurations.</p>
        <p>Do you wish to continue?</p>
        <div className="buttons">
          <Button onClick={handleCleanup}>Yes</Button>
          <Button primary onClick={() => setIsCancelling(false)}>
            No
          </Button>
        </div>
      </div>
    </StyledDiv>
  );
}

export default CancelPrompt;
