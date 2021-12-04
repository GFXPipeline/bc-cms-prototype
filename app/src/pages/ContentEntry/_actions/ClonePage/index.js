import { useEffect, useState } from "react";
import styled from "styled-components";

import { pageService } from "../../../../_services";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import NumberInput from "../../../../components/NumberInput";
import TextInput from "../../../../components/TextInput";

const StyledModal = styled(Modal)`
  .Overlay {
    z-index: 1;
  }

  .Modal {
    width: 100%;
    max-width: 550px;

    form {
      h1 {
        margin: 0 0 36px 0;
      }

      div.page-title {
        margin: 0 0 16px 0;

        label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }
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

        input {
          cursor: pointer;
          margin-right: 16px;

          &:disabled {
            cursor: not-allowed;
          }
        }

        &.disabled {
          label {
            cursor: not-allowed;
          }
        }

        &.radio-fieldset {
          display: flex;
          flex-direction: column;

          div.radio-group {
            margin: 0 0 25px 70px;

            input:disabled,
            label.disabled {
              cursor: not-allowed;
            }
          }
        }

        &.number-of-copies {
          display: flex;
          flex-direction: column;

          label {
            font-size: 13px;
            margin-bottom: 8px;
          }

          input {
            height: 44px;
            width: 50px;
          }
        }

        &.control-where-to-clone {
          display: block;

          label {
            display: block;
            font-size: 13px;
            margin-bottom: 8px;
          }

          div.input-container {
            display: flex;
            flex-direction: row;
            width: 100%;

            input {
              height: 44px;
              margin: 0;
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

function ClonePage({ id, isOpen, setIsOpen, onAfterClose }) {
  const [title, setTitle] = useState("(Fetching page title)");
  const [isWithChildrenPages, setIsWithChildrenPages] = useState(false);
  // const [isLangSelectEnabled, setIsLangSelectEnabled] = useState(false);
  // const [langSelected, setLangSelected] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleWithChildrenPagesCheck(event) {
    event.target.checked
      ? setIsWithChildrenPages(true)
      : setIsWithChildrenPages(false);
  }

  // function handleLangVersionCheck(event) {
  //   event.target.checked
  //     ? setIsLangSelectEnabled(true)
  //     : setIsLangSelectEnabled(false);
  // }

  function handleClonePage(event) {
    event.preventDefault();
    setIsSubmitting(true);

    pageService
      .clone({
        id: id,
        languages: [], // Blank for now
        numberOfCopies: numberOfCopies,
        isWithChildrenPages: isWithChildrenPages,
      })
      .then((newPageId) => {
        setIsSuccess(true);
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsSubmitting(false);
        throw error;
      });
  }

  function handleCleanup() {
    setIsWithChildrenPages(false);
    setNumberOfCopies(1);
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsError(false);
    setIsOpen(false);
  }

  // Get the data for the selected page
  useEffect(() => {
    if (id) {
      pageService
        .read(id)
        .then((response) => {
          setTitle(response?.title || "");
        })
        .catch((error) => {
          console.log("Error in ClonePage modal: ", error);
          setTitle("(Error fetching page title)");
        });
    }
  }, [id]);

  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentLabel={"Clone"}
      onAfterClose={onAfterClose}
    >
      <form id="clone-page">
        <h1>Clone</h1>
        <div className="page-title">
          <label htmlFor="title">Page title:</label>
          <TextInput id="title" value={title} disabled />
        </div>
        <fieldset
          className={
            isSubmitting || isSuccess
              ? "with-children disabled"
              : "with-children"
          }
        >
          <div>
            <label htmlFor="option-with-children-pages">
              <input
                type="checkbox"
                id="option-with-children-pages"
                value="with-children-pages"
                onChange={(e) => handleWithChildrenPagesCheck(e)}
                disabled={isSubmitting || isSuccess}
              />
              With Children Pages
            </label>
          </div>
        </fieldset>
        {/* <fieldset>
          <div>
            <label htmlFor="option-language-version">
              <input
                type="checkbox"
                id="option-language-version"
                value="language-version"
                onChange={(e) => handleLangVersionCheck(e)}
              />
              Language version
            </label>
          </div>
        </fieldset>
        <fieldset className="radio-fieldset" disabled={!isLangSelectEnabled}>
          <div className="radio-group">
            <label
              htmlFor="french"
              className={isLangSelectEnabled ? null : "disabled"}
            >
              <input
                type="radio"
                name="language"
                id="french"
                value="french"
                checked={langSelected === "french"}
                onChange={(e) => setLangSelected(e.target.value)}
              />
              French
            </label>
          </div>
          <div className="radio-group">
            <label
              htmlFor="punjabi"
              className={isLangSelectEnabled ? null : "disabled"}
            >
              <input
                type="radio"
                name="language"
                id="punjabi"
                value="punjabi"
                checked={langSelected === "punjabi"}
                onChange={(e) => setLangSelected(e.target.value)}
              />
              Punjabi
            </label>
          </div>
          <div className="radio-group">
            <label
              htmlFor="chinese-traditional"
              className={isLangSelectEnabled ? null : "disabled"}
            >
              <input
                type="radio"
                name="language"
                id="chinese-traditional"
                value="chinese-traditional"
                checked={langSelected === "chinese-traditional"}
                onChange={(e) => setLangSelected(e.target.value)}
              />
              Chinese Traditional
            </label>
          </div>
          <div className="radio-group">
            <label
              htmlFor="chinese-simplified"
              className={isLangSelectEnabled ? null : "disabled"}
            >
              <input
                type="radio"
                name="language"
                id="chinese-simplified"
                value="chinese-simplified"
                checked={langSelected === "chinese-simplified"}
                onChange={(e) => setLangSelected(e.target.value)}
              />
              Chinese Simplified
            </label>
          </div>
        </fieldset> */}
        <fieldset className="number-of-copies">
          <label htmlFor="number-of-copies">Number of copies</label>
          <NumberInput
            id="number-of-copies"
            min="1"
            max="10"
            value={numberOfCopies}
            onChange={(e) => setNumberOfCopies(e.target.value)}
            disabled={isSubmitting || isSuccess}
          />
        </fieldset>
        <fieldset className="control-where-to-clone">
          <label htmlFor="where-to-clone">Select where to clone</label>
          <div className="input-container">
            <TextInput id="where-to-clone" disabled />
            <Button primary disabled>
              Browse
            </Button>
          </div>
        </fieldset>
        <div className="control-buttons">
          <Button
            onClick={(e) => handleClonePage(e)}
            primary
            disabled={isSubmitting || isSuccess}
          >
            Clone
          </Button>
          <Button onClick={() => setIsOpen(false)} disabled={isSubmitting}>
            {isSuccess ? "Close" : "Cancel"}
          </Button>
        </div>
      </form>
      {isError && <p className="error">Error trying to clone pages</p>}
      {isSuccess && (
        <>
          <p className="success">
            Successfully cloned {numberOfCopies}{" "}
            {numberOfCopies > 1 ? "copies" : "copy"}.
          </p>
          <Button primary onClick={handleCleanup}>
            Close this dialog
          </Button>
        </>
      )}
    </StyledModal>
  );
}

export default ClonePage;
