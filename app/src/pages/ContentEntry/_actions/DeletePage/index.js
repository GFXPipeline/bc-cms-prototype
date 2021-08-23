import { useState } from "react";
import styled from "styled-components";

// App-level components
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";

const StyledModal = styled(Modal)`
  .Modal {
    width: 100%;
    max-width: 550px;

    form {
      h1 {
        margin: 0 0 22px 0;
      }

      fieldset {
        border: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        margin: 0 0 25px 0;

        label {
          cursor: pointer;
        }

        &.radio-delete-type {
          display: flex;
          flex-direction: column;

          div.radio-option {
            align-items: center;
            border: 1px solid transparent;
            display: flex;
            flex-direction: row;
            padding: 16px;

            &.selected {
              border: 1px solid #707070;
            }

            input[type="radio"] {
              margin: 0 15px 0 0;
            }

            div.label-description {
              span {
                font-size: 16px;
              }

              p {
                font-size: 13px;
                margin: 8px 0 0 0;
              }
            }
          }
        }
      }

      div.control-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    p.success {
      background-color: #dff0d8;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #2d4821;
      padding: 15px;
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

function DeletePage({ id, isOpen, setIsOpen }) {
  const [deleteType, setDeleteType] = useState("soft-delete");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleDeletePage(event) {
    event.preventDefault();
    setIsSubmitting(true);

    // Call pageService.delete(id)
    // Set success or error
  }

  return (
    <StyledModal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel={"Delete"}>
      <form id="delete-page">
        <h1>Delete</h1>
        <fieldset className="radio-delete-type">
          <div
            className={
              deleteType === "soft-delete"
                ? "radio-option selected"
                : "radio-option"
            }
          >
            <input
              type="radio"
              id="soft-delete"
              name="delete-type"
              value="soft-delete"
              checked={deleteType === "soft-delete"}
              onChange={() => setDeleteType("soft-delete")}
            />
            <div className="label-description">
              <label htmlFor="soft-delete">Soft</label>
              <p>
                Page will be greyed out and inaccessible publicly. Will be hard
                deleted after a period of time.
              </p>
            </div>
          </div>
          <div
            className={
              deleteType === "hard-delete"
                ? "radio-option selected"
                : "radio-option"
            }
          >
            <input
              type="radio"
              id="hard-delete"
              name="delete-type"
              value="hard-delete"
              checked={deleteType === "hard-delete"}
              onChange={() => setDeleteType("hard-delete")}
            />
            <div className="label-description">
              <label htmlFor="hard-delete">Hard</label>
              <p>
                This will permanently delete the page and remove it from the
                content list.
              </p>
            </div>
          </div>
        </fieldset>
        <div className="control-buttons">
          <Button
            onClick={(e) => handleDeletePage(e)}
            primary
            disabled={isSubmitting}
          >
            Delete
          </Button>
          <Button onClick={() => setIsOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </form>
      {isError && (
        <p className="error">Error attempting to mark page for deletion</p>
      )}
      {isSuccess && (
        <p className="success">
          Selected page has been marked for{" "}
          {deleteType === "soft-delete" ? "soft" : "hard"} deletion.
        </p>
      )}
    </StyledModal>
  );
}

export default DeletePage;
