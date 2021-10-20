import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { componentService } from "../../_services/component.service";

// Page components
import ComponentDetails from "./ComponentDetails";
import ComponentsList from "./ComponentsList";

// // Page actions
// import CancelEdits from "./_actions/CancelEdits";

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
  // Component search
  const [search, setSearch] = useState("");
  const [isShowAll, setIsShowAll] = useState(true);

  // Component types
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  // List of components to choose from
  const [components, setComponents] = useState([]);

  // Selected component
  const [componentId, setComponentId] = useState("");

  // Meta
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [isErrorTypes, setIsErrorTypes] = useState(false);
  const [isLoadingComponentsList, setIsLoadingComponentsList] = useState(false);
  const [isErrorComponentsList, setIsErrorComponentsList] = useState(false);

  function reloadComponentsList() {
    if (isShowAll) {
      componentService
        .getComponentList()
        .then((components) => {
          setComponents(components);
          setIsLoadingComponentsList(false);
        })
        .catch((error) => {
          setIsErrorComponentsList(true);
          setIsLoadingComponentsList(false);
          throw error;
        });
    } else {
      // Get components owned by the user
      componentService
        .getComponentsByOwner()
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

  function handleSelectType(typeId) {
    setIsLoadingComponentsList(true);
    setSelectedType(typeId);
  }

  // Populate component type list
  useEffect(() => {
    function getComponentTypes() {
      componentService
        .getComponentTypeList()
        .then((types) => {
          const newTypes = [];

          types.forEach((type, index) => {
            newTypes[index] = {
              ...type,
              label: type?.display_name,
              value: type?.id,
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

    getComponentTypes();
  }, []);

  // Populate components list
  useEffect(() => {
    function getComponentsList() {
      if (isShowAll) {
        // Get all components
        componentService
          .getComponentList()
          .then((components) => {
            setComponents(components);
            setIsLoadingComponentsList(false);
          })
          .catch((error) => {
            setIsErrorComponentsList(true);
            setIsLoadingComponentsList(false);
            throw error;
          });
      } else {
        // Get components owned by the user
        componentService
          .getComponentsByOwner()
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

    getComponentsList();
  }, [isShowAll]);

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
          isShowAll={isShowAll}
          search={search}
          selectedType={selectedType}
          setComponentId={setComponentId}
          setSearch={setSearch}
          setIsShowAll={setIsShowAll}
        />
        {componentId && (
          <ComponentDetails
            id={componentId}
            reloadComponentsList={reloadComponentsList}
          />
        )}
      </ContentContainer>
    </Page>
  );
}

export default Components;
