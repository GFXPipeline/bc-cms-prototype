import { useEffect, useState } from "react";
import styled from "styled-components";

// Global components & services
import { componentService } from "../../../_services/component.service";
import LoadSpinner from "../../../components/LoadSpinner";
import TextInput from "../../../components/TextInput";

// CKEditor components
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

// Page components
import ContactMethods from "./ContactMethods";

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
  }
`;

const EditPanel = styled.div`
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
          className={tab === "component" && "active"}
        >
          Component
        </button>
        <button
          onClick={() => setTab("details")}
          className={tab === "details" && "active"}
        >
          Details
        </button>
        <button
          onClick={() => setTab("usage")}
          className={tab === "usage" && "active"}
        >
          Usage
        </button>
        <button
          onClick={() => setTab("history")}
          className={tab === "history" && "active"}
        >
          History
        </button>
      </Controls>
      <EditPanel>
        {isLoading ? (
          <LoadSpinner />
        ) : (
          <>
            {title && intro && contactItems && (
              <>
                <div className="component-field">
                  <label htmlFor="component-title">Title: </label>
                  <TextInput
                    id="component-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="component-field">
                  <span id="component-id">
                    <strong>ID:</strong> {id}
                  </span>
                </div>
                <CKEditor
                  id="editor-contact-us"
                  editor={ClassicEditor}
                  config={{
                    plugins: [Bold, Italic, Link, Paragraph],
                    toolbar: {
                      items: ["bold", "italic", "link"],
                    },
                    language: "en",
                  }}
                  data={intro}
                  onReady={(editor) => {
                    console.log("Component editor ready.", editor);

                    if (process.env.NODE_ENV === "development") {
                      CKEditorInspector.attach(editor);
                    }
                  }}
                  onChange={(event, editor) => {
                    const intro = editor.getData();
                    console.log({ event, editor, intro });
                    setIntro(intro);
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
                <ContactMethods
                  contactItems={contactItems}
                  setContactItems={setContactItems}
                />
              </>
            )}
            {isErrorSaving && (
              <p className="error">Could not save component changes.</p>
            )}
            {isErrorLoading && (
              <p className="error">Could not fetch component details.</p>
            )}
          </>
        )}
      </EditPanel>
      <Controls>
        <button disabled>Preview</button>
        <button onClick={() => handleSave(id)} disabled={isSaving}>
          Save
        </button>
        <button disabled>Publish</button>
        <button disabled>Unpublish</button>
        <button disabled>Lock</button>
        <button
          onClick={() => setIsModalCancelOpen(true)}
          disabled={isCancelling}
        >
          Cancel
        </button>
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
