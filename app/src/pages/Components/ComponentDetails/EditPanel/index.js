import { useEffect, useRef } from "react";
import styled from "styled-components";

// Global components & services
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";

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

const StyledDiv = styled.div`
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  background-color: white;
  border: 1px solid #313132;
  max-height: 80vh;
  overflow-y: auto;
  padding: 16px;
  position: absolute;
  right: 65px;
  top: 15%;
  width: 550px;
  z-index: 1;

  div.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

function EditPanel({
  handleSave,
  id,
  intro,
  isCancelling,
  isEditMode,
  isErrorSaving,
  isSaving,
  contactItems,
  setContactItems,
  setIntro,
  setIsEditMode,
  setIsModalCancelOpen,
  setTitle,
  title,
}) {
  const editPanelRef = useRef();

  // Listen for clicks outside of EditPanel when it's open
  useEffect(() => {
    // Close EditPanel when a click occurs outside of if
    function handleClickOutside(event) {
      if (editPanelRef.current.contains(event.target)) {
        // Inside click
        return;
      }
      // Outside click
      setIsEditMode(false);
    }

    if (isEditMode) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditMode, setIsEditMode]);

  return (
    <StyledDiv ref={editPanelRef}>
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
          <div className="buttons">
            <Button onClick={() => handleSave(id)} disabled={isSaving} primary>
              Save
            </Button>
            <Button
              onClick={() => setIsModalCancelOpen(true)}
              disabled={isCancelling}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
      {isErrorSaving && (
        <p className="error">Could not save component changes.</p>
      )}
    </StyledDiv>
  );
}

export default EditPanel;
