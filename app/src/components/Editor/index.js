import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonBlockEditor from "@ckeditor/ckeditor5-build-balloon-block";

import { pageService } from "../../_services";

function Editor() {
  const { id } = useParams();
  const [data, setData] = useState(
    id ? "(Fetching page data)" : "Where would you like to go today?"
  );
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (id) {
      pageService
        .read(id)
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.log("error in Editor pageService catch", error);
          setData("(Failed to fetch page data)");
          setIsError(true);
        });
    }
  }, [id]);

  return (
    <>
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
      {isError && (
        <p className="error">
          API call to fetch page data for page ID <strong>{id}</strong> failed.
        </p>
      )}
    </>
  );
}

export default Editor;
