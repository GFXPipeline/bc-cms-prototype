import { useState } from "react";

// Global components & services
import TextInput from "../../../../../components/TextInput";

// CKEditor components
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

function ContactInformation() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");

  return (
    <>
      <h1>Contact information</h1>
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
    </>
  );
}

export default ContactInformation;
