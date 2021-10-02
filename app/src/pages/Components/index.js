import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import Header from "../../components/Header";
import LoadSpinner from "../../components/LoadSpinner";
import TextInput from "../../components/TextInput";

// CKEditor components
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

import { componentService } from "../../_services/component.service";

const Page = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: row;
  min-height: 0;
  width: 100%;

  p.error {
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a12622;
    padding: 15px;
  }
`;

const ComponentsList = styled.div`
  background-color: white;
  margin: 16px;
  min-width: 300px;
`;

const ComponentDetails = styled.div`
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

function Components() {
  const [components, setComponents] = useState([]);
  const [componentId, setComponentId] = useState(null);
  const [componentTitle, setComponentTitle] = useState("");
  const [componentIntro, setComponentIntro] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  function getComponentList() {
    componentService
      .getComponentList()
      .then((components) => {
        setComponents(components);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        throw error;
      });
  }

  function getComponentDetails(id) {
    componentService.read(id).then((component) => {
      setComponentTitle(component?.title);
      setComponentIntro(component?.intro);
    });
  }

  function handleSave(id) {
    setIsSaving(true);

    componentService
      .update({
        id: componentId,
        intro: componentIntro,
        title: componentTitle,
      })
      .then((success) => {
        setIsSaving(false);
        getComponentList();
      })
      .catch((error) => {
        setIsError(true);
        setIsSaving(false);
      });
  }

  // Populate component list
  useEffect(() => {
    getComponentList();
  }, []);

  // Get component details
  useEffect(() => {
    if (componentId) {
      getComponentDetails(componentId);
    }
  }, [componentId]);

  return (
    <Page>
      <Header />
      <ContentContainer>
        <ComponentsList>
          <h1>Component Library</h1>
          <p>Reusable components for use across many pages.</p>
          {isLoading && <LoadSpinner />}
          {components && Array.isArray(components) && components.length > 0 && (
            <ul>
              {components?.map((component, index) => {
                return (
                  <li key={index}>
                    <ButtonLink onClick={() => setComponentId(component?.id)}>
                      {component?.title}
                    </ButtonLink>
                  </li>
                );
              })}
            </ul>
          )}
          {isError && <p className="error">Could not fetch components list.</p>}
        </ComponentsList>
        <ComponentDetails>
          {componentTitle && (
            <div className="component-field">
              <label htmlFor="component-title">Title: </label>
              <TextInput
                id="component-title"
                value={componentTitle}
                onChange={(e) => setComponentTitle(e.target.value)}
              />
            </div>
          )}
          {componentTitle && (
            <div className="component-field">
              <span id="component-id">
                <strong>ID:</strong> {componentId}
              </span>
            </div>
          )}
          {componentIntro && (
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
          )}
          {componentId && (
            <Controls>
              <Button onClick={() => handleSave(componentId)}>
                {isSaving ? "Saving" : "Save"}
              </Button>
            </Controls>
          )}
        </ComponentDetails>
      </ContentContainer>
    </Page>
  );
}

export default Components;
