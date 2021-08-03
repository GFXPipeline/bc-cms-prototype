import { useState } from "react";
import styled from "styled-components";

import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import NumberInput from "../../../../components/NumberInput";
import TextInput from "../../../../components/TextInput";

const StyledModal = styled(Modal)`
  .Modal {
    width: 100%;
    max-width: 550px;

    form {
      h1 {
        margin: 0 0 36px 0;
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
        }

        &.radio-fieldset {
          display: flex;
          flex-direction: column;

          div.radio-group {
            margin: 0 0 25px 70px;

            input:disabled,
            input:disabled + label {
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

        &.where-to-clone {
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
  }
`;

function ClonePage({ isOpen, setIsOpen }) {
  const [isWithChildrenPages, setIsWithChildrenPages] = useState(false);
  const [isLangSelectEnabled, setIsLangSelectEnabled] = useState(false);
  const [langSelected, setLangSelected] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(1);

  function handleWithChildrenPagesCheck(event) {
    event.target.checked
      ? setIsWithChildrenPages(true)
      : setIsWithChildrenPages(false);
  }

  function handleLangVersionCheck(event) {
    event.target.checked
      ? setIsLangSelectEnabled(true)
      : setIsLangSelectEnabled(false);
  }

  return (
    <StyledModal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel={"Clone"}>
      <form id="clone-page">
        <h1>Clone</h1>
        <fieldset>
          <div>
            <input
              type="checkbox"
              id="option-with-children-pages"
              value="with-children-pages"
              onChange={(e) => handleWithChildrenPagesCheck(e)}
            />
            <label htmlFor="option-with-children-pages">
              With Children Pages
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <input
              type="checkbox"
              id="option-language-version"
              value="language-version"
              onChange={(e) => handleLangVersionCheck(e)}
            />
            <label htmlFor="option-language-version">Language version</label>
          </div>
        </fieldset>
        <fieldset className="radio-fieldset" disabled={!isLangSelectEnabled}>
          <div className="radio-group">
            <input
              type="radio"
              name="language"
              id="french"
              value="french"
              checked={langSelected === "french"}
              onChange={(e) => setLangSelected(e.target.value)}
            />
            <label htmlFor="french">French</label>
          </div>
          <div className="radio-group">
            <input
              type="radio"
              name="language"
              id="punjabi"
              value="punjabi"
              checked={langSelected === "punjabi"}
              onChange={(e) => setLangSelected(e.target.value)}
            />
            <label htmlFor="punjabi">Punjabi</label>
          </div>
          <div className="radio-group">
            <input
              type="radio"
              name="language"
              id="chinese-traditional"
              value="chinese-traditional"
              checked={langSelected === "chinese-traditional"}
              onChange={(e) => setLangSelected(e.target.value)}
            />
            <label htmlFor="chinese-traditional">Chinese Traditional</label>
          </div>
          <div className="radio-group">
            <input
              type="radio"
              name="language"
              id="chinese-simplified"
              value="chinese-simplified"
              checked={langSelected === "chinese-simplified"}
              onChange={(e) => setLangSelected(e.target.value)}
            />
            <label htmlFor="chinese-simplified">Chinese Simplified</label>
          </div>
        </fieldset>
        <fieldset className="number-of-copies">
          <label htmlFor="number-of-copies">Number of copies</label>
          <NumberInput
            id="number-of-copies"
            min="1"
            max="10"
            value={numberOfCopies}
            onChange={(e) => setNumberOfCopies(e.target.value)}
          />
        </fieldset>
        <fieldset className="where-to-clone">
          <label htmlFor="where-to-clone">Select where to clone</label>
          <div className="input-container">
            <TextInput id="where-to-clone" />
            <Button primary>Browse</Button>
          </div>
        </fieldset>
        <div className="control-buttons">
          <Button onClick={() => alert("Submit action")} primary>
            Clone
          </Button>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </div>
      </form>
    </StyledModal>
  );
}

export default ClonePage;
