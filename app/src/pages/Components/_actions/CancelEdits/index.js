import { useState } from "react";
import styled from "styled-components";

import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";

const StyledModal = styled(Modal)`
  .Overlay {
    z-index: 1;
  }

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
  }
`;

function CancelEdits({ isOpen, setIsOpen, handleCancel }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleConfirm() {
    setIsSubmitting(true);
    handleCancel();
    setIsSuccess(true);
  }

  function handleCleanup() {
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsOpen(false);
  }

  return (
    <StyledModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1>Cancel</h1>
      <p>
        Are you sure you would like to reset this item? All changes will be
        lost.
      </p>
      <div className="control-buttons">
        <Button
          primary
          onClick={handleConfirm}
          disabled={isSubmitting || isSuccess}
        >
          Confirm
        </Button>
        <Button onClick={handleCleanup}>Close</Button>
      </div>
      {isSuccess && (
        <p className="success">
          Unsaved edits to this component have been discarded.
        </p>
      )}
    </StyledModal>
  );
}

export default CancelEdits;
