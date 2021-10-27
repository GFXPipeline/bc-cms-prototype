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

    p.error {
      background-color: #f2dede;
      border: 1px solid #ebccd1;
      border-radius: 4px;
      color: #a12622;
      padding: 15px;
    }
  }
`;

function CancelEdits({ isOpen, setIsOpen, clearEdits }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleConfirm() {
    setIsError(false);
    setIsSubmitting(true);

    clearEdits()
      .then((success) => {
        setIsSubmitting(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setIsError(true);
      });
  }

  function handleCleanup() {
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsError(false);
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
        <Button onClick={handleCleanup}>
          {isSuccess ? "Close" : "Close without cancelling"}
        </Button>
      </div>
      {isSuccess && (
        <>
          <p className="success">
            Unsaved edits to this page have been discarded.
          </p>
          <Button primary onClick={handleCleanup}>
            Close this dialog
          </Button>
        </>
      )}
      {isError && (
        <p className="error">
          Error re-loading page data. Unsaved edits remain.
        </p>
      )}
    </StyledModal>
  );
}

export default CancelEdits;
