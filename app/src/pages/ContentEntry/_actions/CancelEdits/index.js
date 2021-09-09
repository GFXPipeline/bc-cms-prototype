import styled from "styled-components";

import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";

const StyledModal = styled(Modal)`
  .Modal {
    width: 100%;
    max-width: 550px;

    div.control-buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    p.success {
      background-color: #dff0d8;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #2d4821;
      padding: 15px;

      a {
        color: #2d4821;
        cursor: pointer;
        text-decoration: underline;

        &:hover {
          text-decoration: none;
        }
      }
    }

    p.error {
      background-color: #f2dede;
      border: 1px solid #ebccd1;
      border-radius: 4px;
      color: #a12622;
      padding: 15px;
    }
  }

  // Over-ride react-tooltip defaults
  .__react_component_tooltip.show {
    opacity: 1 !important;
    padding: 0;
    pointer-events: auto;
  }
`;

function CancelEdits({ isOpen, setIsOpen, onConfirm }) {
  return (
    <StyledModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1>Cancel</h1>
      <p>
        Are you sure you would like to reset this item? All changes will be
        lost.
      </p>
      <div className="control-buttons">
        <Button primary onClick={onConfirm}>
          Confirm
        </Button>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </div>
    </StyledModal>
  );
}

export default CancelEdits;
