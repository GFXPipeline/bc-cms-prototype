import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Global components
import Header from "../../components/Header";
import { authenticationService } from "../../_services";
import { componentService } from "../../_services/component.service";

// Page components
import ComponentDetails from "./ComponentDetails";
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
  flex-grow: 1;
  flex-direction: row;
  overflow-y: hidden;
  width: 100%;

  p.error {
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a12622;
    padding: 15px;
  }
`;

const SliderButton = styled.button`
  background-color: #333333;
  border: none;
  color: white;
  cursor: pointer;
  width: 20px;

  &:hover {
    background-color: #6f6f6f;
  }
`;

function Components() {
  // Selected component (id in URL)
  const { id } = useParams();

  // Component search
  const [search, setSearch] = useState("");
  const [isShowAll, setIsShowAll] = useState(true);

  // Component types
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  // List of components to choose from
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);

  // Meta
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [isErrorTypes, setIsErrorTypes] = useState(false);
  const [isLoadingComponentsList, setIsLoadingComponentsList] = useState(false);
  const [isErrorComponentsList, setIsErrorComponentsList] = useState(false);
  const [isComponentListExpanded, setIsComponentListExpanded] = useState(false);

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

  // Filter components list
  useEffect(() => {
    function filterComponents(
      components,
      isShowAll,
      search,
      selectedStatuses,
      selectedTypes
    ) {
      const setToFilter = isShowAll
        ? [...components]
        : [...components].filter((component) => {
            // Only include "My Components"
            if (
              component?.owned_by_user ===
              authenticationService.currentUserValue?.username
            ) {
              return true;
            }

            return false;
          });

      const filteredByStatus = setToFilter.filter((component) => {
        // If no statuses are selected, include the component
        if (selectedStatuses?.length === 0) {
          return true;
        }

        if (
          component?.is_published &&
          selectedStatuses?.includes("published")
        ) {
          return true;
        }

        if (
          !component?.is_published &&
          selectedStatuses?.includes("unpublished")
        ) {
          return true;
        }

        return false;
      });

      const filteredByType = filteredByStatus.filter((component) => {
        // If no types are selected, include the component
        if (selectedTypes?.length === 0) {
          return true;
        }

        // If any types are selected, check for type match
        if (selectedTypes?.includes(component?.type_id)) {
          return true;
        }

        return false;
      });

      return filteredByType.filter((component) => {
        // Title
        if (component?.title?.toLowerCase().includes(search?.toLowerCase())) {
          return true;
        }
        // Type
        if (
          component?.type_display_name
            ?.toLowerCase()
            .includes(search?.toLowerCase())
        ) {
          return true;
        }
        // Last modified by
        if (
          component?.last_modified_by_user
            ?.toLowerCase()
            .includes(search?.toLowerCase())
        ) {
          return true;
        }

        return false;
      });
    }

    setFilteredComponents(
      filterComponents(
        components,
        isShowAll,
        search,
        selectedStatuses,
        selectedTypes
      )
    );
  }, [components, isShowAll, search, selectedStatuses, selectedTypes]);

  return (
    <Page>
      <Header />
      <ContentContainer>
        <ComponentsList
          className={isComponentListExpanded ? "expanded" : "collapsed"}
          types={types}
          components={filteredComponents}
          isLoadingTypes={isLoadingTypes}
          isErrorTypes={isErrorTypes}
          isLoadingComponentsList={isLoadingComponentsList}
          isErrorComponentsList={isErrorComponentsList}
          isShowAll={isShowAll}
          search={search}
          selectedStatuses={selectedStatuses}
          selectedTypes={selectedTypes}
          setSearch={setSearch}
          setSelectedStatuses={setSelectedStatuses}
          setSelectedTypes={setSelectedTypes}
          setIsShowAll={setIsShowAll}
        />
        <SliderButton
          aria-label={
            isComponentListExpanded
              ? "Collapse component list"
              : "Expand component list"
          }
          onClick={() => setIsComponentListExpanded(!isComponentListExpanded)}
        >
          {isComponentListExpanded ? "«" : "»"}
        </SliderButton>
        {id && (
          <ComponentDetails
            className={isComponentListExpanded ? "collapsed" : "expanded"}
            id={id}
            reloadComponentsList={reloadComponentsList}
          />
        )}
      </ContentContainer>
    </Page>
  );
}

export default Components;
