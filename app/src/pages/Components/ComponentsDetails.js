import styled from "styled-components";

import Button from "../../components/Button";
import LoadSpinner from "../../components/LoadSpinner";
import TextInput from "../../components/TextInput";

// CKEditor components
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

const StyledDiv = styled.div`
  background-color: white;
  flex-grow: 1;
  margin: 16px;
  min-width: 300px;

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
`;

function ComponentDetails({
  componentId,
  componentIntro,
  componentTitle,
  handleSave,
  isErrorComponent,
  isErrorSaving,
  isLoadingComponent,
  isSaving,
  setComponentIntro,
  setComponentTitle,
}) {
  return (
    <StyledDiv>
      {isLoadingComponent ? (
        <LoadSpinner />
      ) : (
        <>
          {componentId && componentIntro && componentTitle && (
            <>
              <div className="component-field">
                <label htmlFor="component-title">Title: </label>
                <TextInput
                  id="component-title"
                  value={componentTitle}
                  onChange={(e) => setComponentTitle(e.target.value)}
                />
              </div>
              <div className="component-field">
                <span id="component-id">
                  <strong>ID:</strong> {componentId}
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
                data={componentIntro}
                onReady={(editor) => {
                  console.log("Component editor ready.", editor);
                }}
                onChange={(event, editor) => {
                  const intro = editor.getData();
                  console.log({ event, editor, intro });
                  setComponentIntro(intro);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
              <Controls>
                <Button onClick={() => handleSave(componentId)}>
                  {isSaving ? "Saving" : "Save"}
                </Button>
              </Controls>
            </>
          )}
          {isErrorSaving && (
            <p className="error">Could not save component changes.</p>
          )}
        </>
      )}
      {isErrorComponent && (
        <p className="error">Could not fetch component details.</p>
      )}
    </StyledDiv>
  );
}

export default ComponentDetails;
