import { useEffect, useState } from "react";
import styled from "styled-components";

// Global components
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import NumberInput from "../../../../components/NumberInput";
import { pageService } from "../../../../_services";

// Modal panels
import PageType from "./PageType";

const StyledModal = styled(Modal)`
  .Overlay {
    z-index: 1;
  }

  .Modal {
    max-width: 1600px;
    padding: 0px;
    width: 100%;
  }

  div.top {
    align-items: top;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 30px 16px 60px;

    h2 {
      font-size: 36px;
      margin: 0px;
    }

    button.close {
      margin-left: auto;
      border: none;
      background-color: white;
      color: #707070;
      cursor: pointer;
      font-size: 48px;
      height: 62px;
      padding: 0px;
      right: 30px;
      width: 62px;

      &:hover {
        background-color: #d6d6d6;
      }
    }
  }

  div.middle {
    display: flex;
    flex-direction: row;
    max-height: 656px;
    padding: 0 60px;

    div.tabs {
      align-items: left;
      display: flex;
      flex-direction: column;
      max-width: 200px;

      div {
        background-color: white;
        border-right: 1px solid #707070;
        display: flex;
        flex-direction: row;
        padding: 5px 10px;

        button {
          background-color: #f6f6f6;
          border: none;
          cursor: pointer;
          flex-grow: 1;
          padding: 22px 25px;
          text-align: left;
          min-width: 180px;

          &:hover {
            text-decoration: underline;
          }
        }

        &.active {
          border: 1px solid #707070;
          border-right: none;

          button {
            background-color: white;
            font-weight: 700;
            text-decoration: underline;
          }
        }
      }

      div.grow {
        flex-grow: 1;
      }
    }

    div.content {
      border: 1px solid #707070;
      border-left: none;
      flex-grow: 1;
      max-height: 660px;
      overflow-y: auto;
    }
  }

  div.bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 25px 0;
    padding: 0 60px;

    fieldset.number-of-pages {
      border: none;
      margin: 0px;
      padding: 0px;

      label {
        margin-right: 9px;
      }
    }

    div.buttons {
      button {
        margin-left: 11px;
      }
    }
  }
`;

function CreatePageNew({ isOpen, setIsOpen, onAfterClose }) {
  // Navigation within modal
  const [tab, setTab] = useState("page-type");

  // Available options
  const [availablePageTypes, setAvailablePageTypes] = useState([]);

  // Selected options
  const [pageType, setPageType] = useState("topic-page");
  const [numberOfPages, setNumberOfPages] = useState(1);

  // Meta
  const [isLoadingPageTypes, setIsLoadingPageTypes] = useState(true);
  const [isErrorPageTypes, setIsErrorPageTypes] = useState(false);

  useEffect(() => {
    pageService
      .getPageTypes()
      .then((pageTypes) => {
        setAvailablePageTypes(pageTypes);
        setIsLoadingPageTypes(false);
      })
      .catch((error) => {
        setIsErrorPageTypes(true);
      });
  }, []);

  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentLabel={"Create a page"}
      onAfterClose={onAfterClose}
    >
      <div className="top">
        <h2>Create a page</h2>
        <button className="close" onClick={() => setIsOpen(false)}>
          X
        </button>
      </div>
      <div className="middle">
        <div className="tabs">
          <div className={tab === "page-type" ? "active" : "inactive"}>
            <button onClick={() => setTab("page-type")}>Page type</button>
          </div>
          <div className={tab === "page-template" ? "active" : "inactive"}>
            <button onClick={() => setTab("page-template")}>
              Page template
            </button>
          </div>
          <div className={tab === "navigation-style" ? "active" : "inactive"}>
            <button onClick={() => setTab("navigation-style")}>
              Navigation style
            </button>
          </div>
          <div
            className={
              tab === "content-review-schedule" ? "active" : "inactive"
            }
          >
            <button onClick={() => setTab("content-review-schedule")}>
              Content review schedule
            </button>
          </div>
          <div className={tab === "page-location" ? "active" : "inactive"}>
            <button onClick={() => setTab("page-location")}>
              Page location
            </button>
          </div>
          <div className="grow" />
        </div>
        <div className="content">
          {tab === "page-type" && (
            <PageType
              availablePageTypes={availablePageTypes}
              isLoadingPageTypes={isLoadingPageTypes}
              pageType={pageType}
              setPageType={setPageType}
            />
          )}
        </div>
      </div>
      <div className="bottom">
        <fieldset className="number-of-pages">
          <label htmlFor="number-of-pages">Number of pages</label>
          <NumberInput
            id="number-of-pages"
            min="1"
            max="10"
            value={numberOfPages}
            onChange={(e) => setNumberOfPages(e.target.value)}
          />
        </fieldset>
        <div className="buttons">
          <Button primary>Create</Button>
          <Button>Cancel</Button>
        </div>
      </div>
    </StyledModal>
  );
}

export default CreatePageNew;
