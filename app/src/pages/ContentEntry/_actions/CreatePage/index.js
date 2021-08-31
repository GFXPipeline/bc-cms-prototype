import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

// App-level components
import { pageService } from "../../../../_services";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import NumberInput from "../../../../components/NumberInput";
import Select from "../../../../components/Select";
import TextInput from "../../../../components/TextInput";

// Page-level components
import PickTemplateInfoBox from "./PickTemplateInfoBox";
import SelectPageInfoBox from "./SelectPageInfoBox";

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

        &.control-where-to-create {
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

        &.select {
          display: block;

          div.label-info {
            display: flex;
            align-items: baseline;
          }

          label {
            cursor: auto;
            display: inline-block;
            font-size: 13px;
            margin-bottom: 8px;
          }
        }
      }

      div.control-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      svg.icon-info {
        cursor: pointer;
        display: inline-block;
        height: 16px;
        margin-left: 6px;
        width: 16px;
      }
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

function CreatePage({ isOpen, setIsOpen }) {
  const [pageType, setPageType] = useState("topic-page");
  const [template, setTemplate] = useState("base-template");
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newPageId, setNewPageId] = useState("");

  const history = useHistory();

  function handleCreatePage(event) {
    event.preventDefault();
    setIsSubmitting(true);

    pageService
      .create({
        data: "",
        title: "",
        pageType: pageType,
        template: template,
        numberOfCopies: numberOfCopies,
      })
      .then((returnedPageId) => {
        setIsSuccess(true);
        setIsSubmitting(false);
        setNewPageId(returnedPageId);
      })
      .catch((error) => {
        setIsError(true);
        throw error;
      });
  }

  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentLabel={"Create"}
      onAfterClose={() => {
        history.push(`/content/${newPageId}`);
        history.go(0);
      }}
    >
      <form id="create-page">
        <h1>Create</h1>
        <fieldset className="select">
          <div className="label-info">
            <label htmlFor="select-page-type">Select Page type</label>
            <Icon
              id="noun-info.svg"
              className="icon-info"
              data-tip
              data-for="tooltip-select-page-type"
              data-background-color="white"
              data-border={true}
              data-border-color="black"
              data-effect="solid"
              data-event="mouseenter click"
              data-event-off="mouseexit click"
              data-place="bottom"
              data-type="light"
            />
            <ReactTooltip id="tooltip-select-page-type">
              <SelectPageInfoBox />
            </ReactTooltip>
          </div>
          <Select
            id="select-page-type"
            name="select-page-type"
            options={[
              {
                id: "topic",
                value: "topic",
                label: "Topic",
              },
              {
                id: "theme",
                value: "theme",
                label: "Theme",
              },
              {
                id: "enhanced-search",
                value: "enhanced-search",
                label: "Enhanced Search",
              },
              {
                id: "form",
                value: "form",
                label: "Form",
              },
              {
                id: "header-footer",
                value: "header-footer",
                label: "Header Footer",
              },
              {
                id: "olr-policy",
                value: "OLR Policy",
                label: "OLR Policy",
              },
              {
                id: "search-detail",
                value: "search-detail",
                label: "Search Detail",
              },
              {
                id: "service",
                value: "service",
                label: "Service",
              },
              {
                id: "simple-service",
                value: "simple-service",
                label: "Simple Service",
              },
            ]}
            onChange={setPageType}
            value={pageType}
            disabled={false}
          />
        </fieldset>
        <fieldset className="select">
          <div className="label-info">
            <label htmlFor="select-template">Pick template</label>
            <Icon
              id="noun-info.svg"
              className="icon-info"
              data-tip
              data-for="tooltip-pick-template"
              data-background-color="white"
              data-border={true}
              data-border-color="black"
              data-effect="solid"
              data-event="mouseenter click"
              data-event-off="mouseexit click"
              data-place="bottom"
              data-type="light"
            />
            <ReactTooltip id="tooltip-pick-template">
              <PickTemplateInfoBox />
            </ReactTooltip>
          </div>
          <Select
            id="select-template"
            name="select-template"
            options={[
              {
                id: "base-template",
                value: "base-template",
                label: "Base Template",
              },
              {
                id: "service-template",
                value: "service-template",
                label: "Service Template",
              },
              {
                id: "search-results-page-template",
                value: "search-results-page-template",
                label: "Search Results Page Template",
              },
              {
                id: "forms-template",
                value: "forms-template",
                label: "Forms template",
              },
            ]}
            onChange={setTemplate}
            value={template}
            disabled={false}
          />
        </fieldset>
        <fieldset className="number-of-copies">
          <label htmlFor="number-of-copies">Number of copies</label>
          <NumberInput
            id="number-of-copies"
            min="1"
            max="10"
            value={numberOfCopies}
            onChange={(e) => setNumberOfCopies(e.target.value)}
            disabled
          />
        </fieldset>
        <fieldset className="control-where-to-create">
          <label htmlFor="where-to-create">Select where to create</label>
          <div className="input-container">
            <TextInput id="where-to-create" disabled />
            <Button primary disabled>
              Browse
            </Button>
          </div>
        </fieldset>
        <div className="control-buttons">
          <Button
            onClick={(e) => handleCreatePage(e)}
            primary
            disabled={isSubmitting}
          >
            Create
          </Button>
          <Button onClick={() => setIsOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </form>
      {isError && <p className="error">Error trying to create page</p>}
      {isSuccess && (
        <p className="success">
          Successfully created page.{" "}
          <Link to={"/content"} onClick={() => history.go()}>
            Close this dialog
          </Link>{" "}
          to see the updated list.
        </p>
      )}
    </StyledModal>
  );
}

export default CreatePage;
