import { useEffect, useState } from "react";
import styled from "styled-components";

// Global components & services
import { componentService } from "../../../_services/component.service";
import Button from "../../../components/Button";
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
  flex-grow: 1;
  margin: 16px;
  width: calc(100% - 450px);

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
  margin-top: 16px;

  button {
    margin-right: 8px;
  }
`;

function ComponentDetails({ id, reloadComponentsList }) {
  // Component Details
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [titleInitial, setTitleInitial] = useState("");
  const [introInitial, setIntroInitial] = useState("");
  const [contactItems, setContactItems] = useState([]);
  const [contactItemsInitial, setContactItemsInitial] = useState([]);

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
              <Controls>
                <Button
                  onClick={() => handleSave(id)}
                  disabled={isSaving}
                  primary
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsModalCancelOpen(true)}
                  disabled={isCancelling}
                >
                  Discard changes
                </Button>
              </Controls>
            </>
          )}
          {isErrorSaving && (
            <p className="error">Could not save component changes.</p>
          )}
        </>
      )}
      {isErrorLoading && (
        <p className="error">Could not fetch component details.</p>
      )}
      <CancelEdits
        isOpen={isModalCancelOpen}
        setIsOpen={setIsModalCancelOpen}
        handleCancel={handleCancel}
      />
    </StyledDiv>
  );
}

export default ComponentDetails;
