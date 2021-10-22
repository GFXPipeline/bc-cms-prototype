import { useEffect, useState } from "react";
import styled from "styled-components";

// Global components & services
import { componentService } from "../../../_services/component.service";
import LoadSpinner from "../../../components/LoadSpinner";

// Page components
import ComponentPreview from "./ComponentPreview";

// Page actions
import CancelEdits from "../_actions/CancelEdits";

const StyledDiv = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  div.component-field {
    margin: 8px 0;

    label {
      display: block;
      font-size: 16px;
      font-weight: 700;
    }
    input {
      font-size: 18px;
      width: 450px;
    }
  }
`;

const Controls = styled.div`
  background-color: white;
  border: 1px solid #313132;
  width: 100%;

  button {
    background-color: white;
    border-left: none;
    border-right: none;
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
    cursor: pointer;
    font-size: 16px;
    height: 44px;
    margin-right: 8px;
    padding: 0 26px;

    &.active {
      border-bottom: 5px solid #313132;
    }

    &:hover {
      background-color: #d6d6d6;
    }

    &:disabled {
      cursor: not-allowed;

      &:hover {
        background-color: white;
      }
    }
  }
`;

const Body = styled.div`
  flex-grow: 1;
  height: 1px; // Need explicit height for flex-grow and scroll to work properly
  overflow-y: auto;
  padding: 16px;
`;

function ComponentDetails({ id, reloadComponentsList }) {
  // Component Details
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [titleInitial, setTitleInitial] = useState("");
  const [introInitial, setIntroInitial] = useState("");
  const [contactItems, setContactItems] = useState([]);
  const [contactItemsInitial, setContactItemsInitial] = useState([]);

  // Navigation
  const [tab, setTab] = useState("component");

  // Meta
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const [isErrorSaving, setIsErrorSaving] = useState(false);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);

  // Cancel edits and return component details to original state
  function handleCancel() {
    setIsCancelling(true);
    setTitle(titleInitial);
    setIntro(introInitial);
    setContactItems(contactItemsInitial);
    setIsCancelling(false);
  }

  // Save changes to the component being edited
  function handleSave() {
    setIsSaving(true);

    componentService
      .update({
        id: id,
        intro: intro,
        title: title,
        fields: contactItems,
      })
      .then((success) => {
        setIsSaving(false);
        reloadComponentsList();
      })
      .catch((error) => {
        setIsErrorSaving(true);
        setIsSaving(false);
      });
  }

  // Get component details
  useEffect(() => {
    function getComponentDetails(id) {
      setIsLoading(true);

      componentService
        .read(id)
        .then((component) => {
          setIsLoading(false);
          setTitle(component?.title);
          setTitleInitial(component?.title);
          setIntro(component?.intro);
          setIntroInitial(component?.intro);
          setContactItems(component?.fields);
          setContactItemsInitial(component?.fields);
        })
        .catch((error) => {
          console.log("error in call to componentService.read: ", error);
          setIsLoading(false);
          setIsErrorLoading(true);
        });
    }

    if (id) {
      getComponentDetails(id);
    }
  }, [id]);

  return (
    <StyledDiv>
      <Controls>
        <button
          onClick={() => setTab("component")}
          className={tab === "component" ? "active" : null}
        >
          Component
        </button>
        <button
          onClick={() => setTab("details")}
          className={tab === "details" ? "active" : null}
        >
          Details
        </button>
        <button
          onClick={() => setTab("usage")}
          className={tab === "usage" ? "active" : null}
        >
          Usage
        </button>
        <button
          onClick={() => setTab("history")}
          className={tab === "history" ? "active" : null}
        >
          History
        </button>
      </Controls>
      <Body>
        {isLoading ? (
          <LoadSpinner />
        ) : (
          <>
            {tab === "component" && (
              <ComponentPreview
                contactItems={contactItems}
                handleSave={handleSave}
                id={id}
                intro={intro}
                isCancelling={isCancelling}
                isEditMode={isEditMode}
                isErrorSaving={isErrorSaving}
                isSaving={isSaving}
                setContactItems={setContactItems}
                setIntro={setIntro}
                setIsEditMode={setIsEditMode}
                setIsModalCancelOpen={setIsModalCancelOpen}
                setTitle={setTitle}
                title={title}
              />
            )}
            {isErrorLoading && (
              <p className="error">Could not fetch component details.</p>
            )}
          </>
        )}
      </Body>
      <Controls>
        <button disabled>Publish</button>
        <button disabled>Unpublish</button>
        <button disabled>Lock</button>
        <button disabled>Delete</button>
      </Controls>
      <CancelEdits
        isOpen={isModalCancelOpen}
        setIsOpen={setIsModalCancelOpen}
        handleCancel={handleCancel}
      />
    </StyledDiv>
  );
}

export default ComponentDetails;
