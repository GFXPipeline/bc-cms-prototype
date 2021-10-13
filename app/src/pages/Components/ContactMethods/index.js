import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import Select from "../../../components/Select";
import { componentService } from "../../../_services/component.service";

const StyledDiv = styled.div`
  margin: 16px 0;
`;

const ContactFieldSelector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 16px 0;

  div.new-control-selector {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 8px;

    label {
      display: block;
      font-size: 16px;
      font-weight: 700;
      margin-right: 8px;
    }

    select {
      max-width: 400px;
    }
  }

  button {
    margin-left: 8px;
    padding: 0;
    width: 44px;
  }
`;

const ContactFieldList = styled.div`
  span.prefix {
    font-weight: 700;
  }

  span.content {
    margin-left: 8px;
  }
`;

function ContactMethods({ contactItems, setContactItems }) {
  const [fieldTypes, setFieldTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [fieldOptions, setFieldOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    const items = reorder(
      contactItems,
      result.source.index,
      result.destination.index
    );

    setContactItems(items);
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: "16px",
    margin: "8px",

    // change background colour if dragging
    background: isDragging ? "lightblue" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightgreen" : "lightgrey",
    padding: "8px",
    width: 400,
  });

  function updateContactItems({ index, field, value }) {
    const newContactItems = [...contactItems];
    newContactItems[index][field] = value;
    setContactItems(newContactItems);
  }

  useEffect(() => {
    function getFieldTypes() {
      componentService
        .getContactFieldTypes()
        .then((fieldTypes) => {
          const newFieldTypes = [];

          fieldTypes.forEach((type, index) => {
            newFieldTypes[index] = {
              ...type,
              value: type?.id,
              label: type?.display_name,
            };
          });

          setFieldTypes(newFieldTypes);
        })
        .catch((error) => {
          console.log("Could not get field types in ContactMethods");
          throw error;
        });
    }

    function getFieldOptions() {
      componentService
        .getContactFieldOptions()
        .then((fieldOptions) => {
          const newFieldOptions = [];

          fieldOptions.forEach((option, index) => {
            newFieldOptions[index] = {
              ...option,
              value: option?.id,
              label: option?.display_name,
            };
          });

          setFieldOptions(newFieldOptions);
        })
        .catch((error) => {
          console.log("Could not get field options in ContactMethods");
          throw error;
        });
    }

    getFieldTypes();
    getFieldOptions();
  }, []);

  return (
    <StyledDiv>
      <ContactFieldSelector>
        <div className="new-control-selector">
          <label htmlFor="select-contact-field-type">Method:</label>
          <Select
            id={"select-contact-field-type"}
            name={"select-contact-field-type"}
            options={fieldTypes}
            onChange={(newValue) => {
              setSelectedType(newValue);
              setSelectedOption(null);
            }}
            value={selectedType}
          />
        </div>
        <div className="new-control-selector">
          <label htmlFor="select-contact-field-option">Type:</label>
          <Select
            id={"select-contact-field-option"}
            name={"select-contact-field-option"}
            options={fieldOptions.filter(
              (option) => option?.type_id === selectedType
            )}
            onChange={setSelectedOption}
            value={selectedOption}
            disabled={!selectedType}
          />
        </div>
        <Button aria-label="Add" primary>
          <Icon id="fa-plus.svg" />
        </Button>
      </ContactFieldSelector>
      <ContactFieldList>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {contactItems.map((item, index) => (
                  <Draggable
                    key={`contact-field-${index}`}
                    draggableId={`contact-field-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {/* <span className="prefix">{item?.label_prefix}</span> */}
                        <input
                          type="text"
                          value={item?.label_prefix}
                          onChange={(e) => {
                            updateContactItems({
                              index: index,
                              field: "label_prefix",
                              value: e.target.value,
                            });
                          }}
                        />
                        {/* <span className="content">{item?.data}</span> */}
                        <input
                          type="text"
                          value={item?.data}
                          onChange={(e) => {
                            updateContactItems({
                              index: index,
                              field: "data",
                              value: e.target.value,
                            });
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ContactFieldList>
    </StyledDiv>
  );
}

export default ContactMethods;
