import { useEffect, useState } from "react";
import styled from "styled-components";

// Global components & services
import TextInput from "../../../../../../components/TextInput";
import { useDebounce } from "../../../../../../hooks/useDebounce";
import { componentService } from "../../../../../../_services/component.service";

// CKEditor components
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

// Sub-components
import ContactMethods from "./ContactMethods";

const Result = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin: 2px 0;
  padding: 3px 6px;

  span {
    font-size: 13px;
    font-weight: 400;
  }
`;

function AddNew() {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [contactItems, setContactItems] = useState([]);
  const [isReusable, setIsReusable] = useState(false);
  const [name, setName] = useState("");
  const debouncedNameSearch = useDebounce(name, 300);
  const [nameResults, setNameResults] = useState([]);

  useEffect(() => {
    if (debouncedNameSearch) {
      componentService
        .getComponentsBySearchTerm(debouncedNameSearch)
        .then((results) => {
          setNameResults(results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [debouncedNameSearch]);

  return (
    <>
      <div className="component-field">
        <label htmlFor="component-title">Title *</label>
        <TextInput
          id="component-name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="component-field">
        <label htmlFor="editor-contact-us">Intro</label>
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

          // if (process.env.NODE_ENV === "development") {
          //   CKEditorInspector.attach(editor);
          // }
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
      <div className="component-field">
        <input
          id="save-as-reusable"
          type="checkbox"
          checked={isReusable}
          onChange={() => setIsReusable(!isReusable)}
        />
        <label htmlFor="save-as-reusable">Save as a reusable component</label>
      </div>
      {isReusable && (
        <div className="component-field">
          <label htmlFor="component-name">Name * (must be unique)</label>
          <TextInput
            id="component-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}
      {nameResults &&
        Array.isArray(nameResults) &&
        nameResults?.length > 0 &&
        nameResults.map((result, index) => {
          return (
            <Result key={index}>
              <span className="name">
                <strong>Name: </strong>
                {result?.name}
              </span>
              <span className="type">
                <strong>Type: </strong>
                {result?.type_display_name}
              </span>
              <span className="title">
                <strong>Title: </strong>
                {result?.title}
              </span>
            </Result>
          );
        })}
    </>
  );
}

export default AddNew;
