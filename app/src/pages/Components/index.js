import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { componentService } from "../../_services/component.service";

// Page components
import ComponentDetails from "./ComponentsDetails";
import ComponentsList from "./ComponentsList";

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
  const [isErrorComponentsList, setIsErrorComponentsList] = useState(false);
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
          setIsErrorComponentsList(true);
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
          setIsErrorComponentsList(true);
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
        <ComponentsList
          types={types}
          components={components}
          handleSelectType={handleSelectType}
          isLoadingTypes={isLoadingTypes}
          isErrorTypes={isErrorTypes}
          isLoadingComponentsList={isLoadingComponentsList}
          isErrorComponentsList={isErrorComponentsList}
          selectedType={selectedType}
          setComponentId={setComponentId}
        />
        <ComponentDetails
          componentId={componentId}
          componentIntro={componentIntro}
          componentTitle={componentTitle}
          handleSave={handleSave}
          isErrorComponent={isErrorComponent}
          isErrorSaving={isErrorSaving}
          isLoadingComponent={isLoadingComponent}
          isSaving={isSaving}
          setComponentIntro={setComponentIntro}
          setComponentTitle={setComponentTitle}
        />
      </ContentContainer>
    </Page>
  );
}

export default Components;
