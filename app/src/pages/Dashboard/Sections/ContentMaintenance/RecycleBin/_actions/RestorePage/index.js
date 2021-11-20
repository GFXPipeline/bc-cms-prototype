import { useState } from "react";
import styled from "styled-components";

// Global components
import Button from "../../../../../../../components/Button";
import Modal from "../../../../../../../components/Modal";
import TextInput from "../../../../../../../components/TextInput";
import { pageService } from "../../../../../../../_services";

const StyledModal = styled(Modal)`
  .Overlay {
    z-index: 1;
  }

  .Modal {
    width: 100%;
    max-width: 550px;

    h1 {
      margin: 0 0 22px 0;
    }

    label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      margin: 0 0 8px 0;
    }

    div.location {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;
      width: 100%;

      input[type="text"] {
        flex-grow: 1;
      }
    }

    div.reason {
      display: flex;
      flex-direction: column;
      margin: 0 0 16px 0;

      textarea {
        border: 2px solid #3e3e3e;
        display: block;
        font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
        font-size: 16px;
        padding: 13px 16px;
        resize: none;

        &::placeholder {
          color: #949494;
        }

        &:disabled {
          border-color: #6f6f6f;
          cursor: not-allowed;
        }
      }
    }

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

function RestorePage({ id, isOpen, setIsOpen, onAfterClose }) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleCleanup() {
    setReason("");
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsError(false);
    setIsOpen(false);
  }

  function handleRestore() {
    setIsSubmitting(true);

    pageService
      .undelete({
        id: id,
        reason: reason,
      })
      .then((success) => {
        setIsSubmitting(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setIsError(true);
      });
  }

  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onAfterClose={onAfterClose}
    >
      <h1>Restore</h1>
      <label>Restore location: *</label>
      <div className="location">
        <TextInput disabled />
        <Button primary disabled>
          Browse
        </Button>
      </div>
      <div className="reason">
        <label>Reason to restore: *</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={"Enter reason for restoration."}
          rows={3}
          required
          disabled={isSubmitting || isSuccess}
        />
      </div>
      <div className="control-buttons">
        <Button
          primary
          onClick={handleRestore}
          disabled={!reason || isSubmitting || isSuccess}
        >
          Restore
        </Button>
        <Button onClick={handleCleanup}>
          {isSuccess ? "Close" : "Cancel"}
        </Button>
      </div>
      {isSuccess && <p className="success">Page has been restored.</p>}
      {isError && <p className="error">Error. Page failed to restore.</p>}
    </StyledModal>
  );
}

export default RestorePage;
