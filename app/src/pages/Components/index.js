import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import Header from "../../components/Header";
import LoadSpinner from "../../components/LoadSpinner";
import Select from "../../components/Select";
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

  label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 8px;
  }
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
  // Component types
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  // List of components to choose from
  const [components, setComponents] = useState([]);

  // Single component details
  const [componentId, setComponentId] = useState("");
  const [componentTitle, setComponentTitle] = useState("");
  const [componentIntro, setComponentIntro] = useState("");

  // Meta
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [isErrorTypes, setIsErrorTypes] = useState(false);
  const [isLoadingComponentsList, setIsLoadingComponentsList] = useState(false);
  const [isErrorComponents, setIsErrorComponents] = useState(false);
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);
  const [isErrorComponent, setIsErrorComponent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isErrorSaving, setIsErrorSaving] = useState(false);

  function getComponentTypes() {
    componentService
      .getComponentTypeList()
      .then((types) => {
        const newTypes = [];

        types.forEach((type, index) => {
          newTypes[index] = {
            ...type,
            label: type?.display_name,
            value: type?.name,
          };
        });

        setTypes(newTypes);
        setIsLoadingTypes(false);
      })
      .catch((error) => {
        setIsErrorTypes(true);
        setIsLoadingTypes(false);
        throw error;
      });
  }

  function getComponents() {
    if (selectedType === "all") {
      componentService
        .getComponentList()
        .then((components) => {
          console.log("components: ", components);
          setComponents(components);
          setIsLoadingComponentsList(false);
        })
        .catch((error) => {
          setIsErrorComponents(true);
          setIsLoadingComponentsList(false);
          throw error;
        });
    } else {
      componentService
        .getComponentsByType(selectedType)
        .then((components) => {
          setIsLoadingComponentsList(false);
          setComponents(components);
        })
        .catch((error) => {
          setIsLoadingComponentsList(false);
          setIsErrorComponents(true);
          throw error;
        });
    }
  }

  function getComponentDetails(id) {
    setIsLoadingComponent(true);

    componentService
      .read(id)
      .then((component) => {
        setIsLoadingComponent(false);
        setComponentTitle(component?.title);
        setComponentIntro(component?.intro);
      })
      .catch((error) => {
        setIsLoadingComponent(false);
        setIsErrorComponent(true);
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
        getComponents();
      })
      .catch((error) => {
        setIsErrorSaving(true);
        setIsSaving(false);
      });
  }

  function handleSelectType(typeId) {
    setIsLoadingComponentsList(true);
    setSelectedType(typeId);
  }

  // Populate component type list
  useEffect(() => {
    getComponentTypes();
  }, []);

  // Populate components list
  useEffect(() => {
    if (selectedType) {
      getComponents();
    }
  }, [selectedType]);

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

          {/* Component types */}
          {isLoadingTypes ? (
            <LoadSpinner />
          ) : (
            <>
              <label htmlFor="select-component-type">
                Select a component type
              </label>
              <Select
                id="select-component-type"
                name="select-component-type"
                onChange={handleSelectType}
                value={selectedType}
                options={[
                  { label: " ", disabled: true },
                  { id: "all", label: "All", value: "all" },
                  ...types,
                ]}
              />
            </>
          )}
          {isErrorTypes && (
            <p className="error">Could not fetch component types list.</p>
          )}

          {/* Components */}
          {isLoadingComponentsList ? (
            <LoadSpinner />
          ) : (
            components &&
            Array.isArray(components) &&
            components.length > 0 && (
              <>
                <h2>Components</h2>
                <ul>
                  {components?.map((component, index) => {
                    return (
                      <li key={index}>
                        <ButtonLink
                          onClick={() => setComponentId(component?.id)}
                        >
                          {component?.title}
                        </ButtonLink>
                      </li>
                    );
                  })}
                </ul>
              </>
            )
          )}
          {isErrorComponents && (
            <p className="error">Could not fetch components list.</p>
          )}
        </ComponentsList>
        <ComponentDetails>
          {isLoadingComponent ? (
            <LoadSpinner />
          ) : (
            <>
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
              {isErrorSaving && (
                <p className="error">Could not save component changes.</p>
              )}
            </>
          )}
          {isErrorComponent && (
            <p className="error">Could not fetch component details.</p>
          )}
        </ComponentDetails>
      </ContentContainer>
    </Page>
  );
}

export default Components;
