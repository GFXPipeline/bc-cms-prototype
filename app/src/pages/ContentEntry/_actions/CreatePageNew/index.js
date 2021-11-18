import { useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// Global components
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import LoadSpinner from "../../../../components/LoadSpinner";
import Modal from "../../../../components/Modal";
import NumberInput from "../../../../components/NumberInput";
import { pageService } from "../../../../_services";

// Modal panels
import CancelPrompt from "./CancelPrompt";
import PageType from "./PageType";
import PageTemplate from "./PageTemplate";
import NavigationStyle from "./NavigationStyle";
import ContentReviewSchedule from "./ContentReviewSchedule";
import PageLocation from "./PageLocation";

const StyledModal = styled(Modal)`
  .Overlay {
    z-index: 1;
  }

  .Modal {
    display: flex;
    flex-direction: column;
    height: 90%;
    max-height: 90%;
    min-height: 80%;
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
      align-items: center;
      margin-left: auto;
      border: none;
      background-color: white;
      color: #707070;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      font-size: 48px;
      height: 62px;
      justify-content: space-around;
      padding: 0px;
      right: 30px;
      width: 62px;

      &:hover {
        background-color: #d6d6d6;
      }

      svg {
        color: #707070;
        width: 50px;
      }
    }
  }

  div.middle {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
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
          align-items: center;
          background-color: #f6f6f6;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          flex-grow: 1;
          justify-content: space-between;
          min-height: 64px;
          padding: 22px 25px;
          text-align: left;
          min-width: 180px;

          &:hover {
            text-decoration: underline;
          }

          svg {
            height: 15px;
            margin-left: 8px;
            min-width: 15px;
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
      overflow: hidden;
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

    div.spinner {
      height: 25px;
      position: relative;
      top: -35px;
    }

    p {
      align-items: center;
      display: flex;
      flex-direction: row;
      height: 44px;
      margin: 0px;

      &.success {
        background-color: #dff0d8;
        border: 1px solid #d6e9c6;
        border-radius: 4px;
        color: #2d4821;
        padding: 0 15px;
      }

      &.error {
        background-color: #f2dede;
        border: 1px solid #ebccd1;
        border-radius: 4px;
        color: #a12622;
        padding: 15px;
      }
    }

    div.buttons {
      button {
        margin-left: 11px;
      }
    }
  }
`;

function CreatePageNew({ isOpen, setIsEditMode, setIsOpen, onAfterClose }) {
  const history = useHistory();

  // Navigation within modal
  const [tab, setTab] = useState("page-type");

  // Available options
  const [availablePageTypes, setAvailablePageTypes] = useState([]);
  const [availablePageTemplates, setAvailablePageTemplates] = useState([]);
  const [availableNavTypes, setAvailableNavTypes] = useState([]);

  // Selected options
  const [pageType, setPageType] = useState("");
  const [pageTemplateType, setPageTemplateType] = useState("");
  const [pageTemplate, setPageTemplate] = useState("");
  const [navType, setNavType] = useState("");
  const [reviewFrequency, setReviewFrequency] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1);

  // Meta
  const [visited, setVisited] = useState(["page-type"]);
  const [isLoadingPageTypes, setIsLoadingPageTypes] = useState(true);
  const [isErrorPageTypes, setIsErrorPageTypes] = useState(false);
  const [isLoadingPageTemplates, setIsLoadingPageTemplates] = useState(true);
  const [isErrorPageTemplates, setIsErrorPageTemplates] = useState(false);
  const [isLoadingNavTypes, setIsLoadingNavTypes] = useState(true);
  const [isErrorNavTypes, setIsErrorNavTypes] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleCreatePage(event) {
    event.preventDefault();
    setIsSubmitting(true);

    let months = 0;
    switch (reviewFrequency) {
      case "3-months":
        months = 3;
        break;
      case "6-months":
        months = 6;
        break;
      case "12-months":
      default:
        months = 12;
        break;
    }

    pageService
      .create({
        data: "",
        title: "",
        pageType: pageType,
        template: pageTemplate,
        numberOfCopies: numberOfPages,
        reviewFrequency: months,
      })
      .then((returnedPageId) => {
        setIsSuccess(true);
        setIsSubmitting(false);

        // Page ID is pulled by useParams() in ContentEntry to grab page data,
        // no need to use this to set state anywhere.
        history.push(`/content/${returnedPageId}`);
        setIsEditMode(true);
        handleCleanup();
        setIsOpen(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsSubmitting(false);
        throw error;
      });
  }

  // Cancel the dialog and reset state
  function handleCleanup() {
    setTab("page-type");
    setPageType("");
    setPageTemplateType("");
    setPageTemplate("");
    setNavType("");
    setReviewFrequency("");
    setContact("");
    setEmail("");
    setLocation("");
    setNumberOfPages(1);
    setVisited(["page-type"]);
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsError(false);
    setIsCancelling(false);
    setIsOpen(false);
  }

  // Get page types
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

  // Get page templates
  useEffect(() => {
    pageService
      .getPageTemplates()
      .then((pageTemplates) => {
        setAvailablePageTemplates(pageTemplates);
        setIsLoadingPageTemplates(false);
      })
      .catch((error) => {
        setIsErrorPageTemplates(true);
      });
  }, []);

  // Get page navigation types
  useEffect(() => {
    pageService
      .getPageNavigationTypes()
      .then((pageNavigationTypes) => {
        setAvailableNavTypes(pageNavigationTypes);
        setIsLoadingNavTypes(false);
      })
      .catch((error) => {
        setIsErrorNavTypes(true);
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
        <button className="close" onClick={() => setIsCancelling(true)}>
          <Icon id="md-close.svg" />
        </button>
      </div>
      <div className="middle">
        <div className="tabs">
          <div className={tab === "page-type" ? "active" : "inactive"}>
            <button onClick={() => setTab("page-type")}>
              Page type
              {visited.includes("page-template") && !pageType && (
                <Icon id="bi-exclamation-circle.svg" />
              )}
            </button>
          </div>
          <div className={tab === "page-template" ? "active" : "inactive"}>
            <button
              onClick={() => {
                setTab("page-template");
                setVisited([...visited, "page-template"]);
              }}
            >
              Page template
              {(visited.includes("navigation-style") ||
                visited.includes("content-review-schedule") ||
                visited.includes("page-location")) &&
                !pageTemplate && <Icon id="bi-exclamation-circle.svg" />}
            </button>
          </div>
          <div className={tab === "navigation-style" ? "active" : "inactive"}>
            <button
              onClick={() => {
                setTab("navigation-style");
                setVisited([...visited, "navigation-style"]);
              }}
            >
              Navigation style
              {(visited.includes("content-review-schedule") ||
                visited.includes("page-location")) &&
                !navType && <Icon id="bi-exclamation-circle.svg" />}
            </button>
          </div>
          <div
            className={
              tab === "content-review-schedule" ? "active" : "inactive"
            }
          >
            <button
              onClick={() => {
                setTab("content-review-schedule");
                setVisited([...visited, "content-review-schedule"]);
              }}
            >
              Content review schedule
              {visited.includes("content-review-schedule") &&
                (!reviewFrequency ||
                  !contact ||
                  (contact === "specific-email" && !email)) && (
                  <Icon id="bi-exclamation-circle.svg" />
                )}
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
              isErrorPageTypes={isErrorPageTypes}
              pageType={pageType}
              setPageType={setPageType}
              setTab={setTab}
            />
          )}
          {tab === "page-template" && (
            <PageTemplate
              availablePageTemplates={availablePageTemplates}
              isLoadingPageTemplates={isLoadingPageTemplates}
              isErrorPageTemplates={isErrorPageTemplates}
              pageTemplate={pageTemplate}
              pageTemplateType={pageTemplateType}
              setPageTemplate={setPageTemplate}
              setPageTemplateType={setPageTemplateType}
              setTab={setTab}
            />
          )}
          {tab === "navigation-style" && (
            <NavigationStyle
              availableNavTypes={availableNavTypes}
              isLoading={isLoadingNavTypes}
              isError={isErrorNavTypes}
              navType={navType}
              setNavType={setNavType}
              setTab={setTab}
            />
          )}
          {tab === "content-review-schedule" && (
            <ContentReviewSchedule
              contact={contact}
              email={email}
              reviewFrequency={reviewFrequency}
              setContact={setContact}
              setEmail={setEmail}
              setReviewFrequency={setReviewFrequency}
              setTab={setTab}
            />
          )}
          {tab === "page-location" && (
            <PageLocation location={location} setLocation={setLocation} />
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
        {isSubmitting && <LoadSpinner className="spinner" />}
        {isError && <p className="error">Error creating new page.</p>}
        {isSuccess && <p className="success">New page created.</p>}
        <div className="buttons">
          <Button
            primary
            disabled={
              isSubmitting ||
              isSuccess ||
              !pageType ||
              !pageTemplate ||
              !navType ||
              !reviewFrequency ||
              !contact ||
              (contact === "specific-email" && !email) ||
              // !location || // This can be added when there is logic to set location
              !numberOfPages
            }
            onClick={handleCreatePage}
          >
            Create
          </Button>
          <Button onClick={() => setIsCancelling(true)}>Cancel</Button>
        </div>
      </div>
      {isCancelling && (
        <FocusTrap>
          <CancelPrompt
            handleCleanup={handleCleanup}
            setIsCancelling={setIsCancelling}
          />
        </FocusTrap>
      )}
    </StyledModal>
  );
}

export default CreatePageNew;
