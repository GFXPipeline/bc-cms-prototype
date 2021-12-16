import { useEffect, useState } from "react";
import styled from "styled-components";

// Global components & services
import Modal from "../../../../components/Modal";
import TextInput from "../../../../components/TextInput";
import { componentService } from "../../../../_services/component.service";
import { useDebounce } from "../../../../hooks/useDebounce";

// CKEditor components
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

const StyledModal = styled(Modal)``;

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

function CreateComponent({ isOpen, setIsOpen, onAfterClose }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (debouncedSearch) {
      componentService
        .getComponentsBySearchTerm(debouncedSearch)
        .then((results) => {
          setResults(results);
        })
        .catch((error) => {
          setIsError(true);
        });
    }
  }, [debouncedSearch]);

  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onAfterClose={onAfterClose}
    >
      <h1>Create component</h1>
      <div className="component-field">
        <label htmlFor="component-name">Name * (must be unique)</label>
        <TextInput
          id="component-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <TextInput value={search} onChange={(e) => setSearch(e.target.value)} />
      {results &&
        Array.isArray(results) &&
        results?.length > 0 &&
        results.map((result, index) => {
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
      {isError && <p>Error getting results</p>}
    </StyledModal>
  );
}

export default CreateComponent;
