import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonBlockEditor from "@ckeditor/ckeditor5-build-balloon-block";

function Editor() {
  const [data, setData] = useState("Where would you like to go today?");

  return (
    <CKEditor
      editor={BalloonBlockEditor}
      data={data}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
        setData(data);
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
}

export default Editor;
