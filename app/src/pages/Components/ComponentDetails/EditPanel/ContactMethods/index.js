import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import Button from "../../../../../components/Button";
import Icon from "../../../../../components/Icon";
import Select from "../../../../../components/Select";
import { componentService } from "../../../../../_services/component.service";

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
  div.contact-field {
    display: flex;
    flex-direction: row;
    align-items: center;

    svg.draggable {
      color: #d3d3d3;
      height: 20px;
      margin-right: 16px;
    }

    p.type-and-option {
      margin: 0;
      width: 100px;
    }

    input[type="text"] {
      height: 44px;
      margin-right: 8px;

      &.prefix {
        width: 150px;
      }

      &.value {
        flex-grow: 1;
      }
    }

    button {
      height: 44px;
      min-width: 44px;
      padding: 0;
      width: 44px;
    }
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
    width: "100%",
  });

  function addItem() {
    const newItem = {
      option_id: selectedOption,
      label_prefix: "",
      data: "",
    };
    setContactItems([...contactItems, newItem]);
  }

  function removeItem(index) {
    const newContactItems = [...contactItems];
    newContactItems.splice(index, 1);
    setContactItems(newContactItems);
  }

  function getItemTypeText(optionId) {
    const option = fieldOptions.find((option) => optionId === option?.id);
    const type = fieldTypes.find((type) => option?.type_id === type?.id);

    if (type?.name === "website" || type?.name === "email") {
      return (
        <p className="type-and-option">
          <strong>{type?.display_name}:</strong>
        </p>
      );
    }
    return (
      <p className="type-and-option">
        <strong>{type?.display_name}:</strong> {option?.display_name}
      </p>
    );
  }

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
          <label htmlFor="select-contact-field-type">Contact Method:</label>
          <Select
            id={"select-contact-field-type"}
            name={"select-contact-field-type"}
            options={[{ value: "", label: "", disabled: true }, ...fieldTypes]}
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
            options={[
              { value: "", label: "", disabled: true },
              ...fieldOptions.filter(
                (option) => option?.type_id === selectedType
              ),
            ]}
            onChange={setSelectedOption}
            value={selectedOption}
            disabled={!selectedType}
          />
        </div>
        <Button
          aria-label="Add"
          onClick={addItem}
          primary
          disabled={!selectedOption}
        >
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
                {contactItems &&
                  Array.isArray(contactItems) &&
                  contactItems.length > 0 &&
                  contactItems.map((item, index) => (
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
                          className="contact-field"
                        >
                          <Icon
                            id="fa-grip-vertical.svg"
                            className="draggable"
                          />
                          {getItemTypeText(item?.option_id)}
                          <input
                            type="text"
                            className="prefix"
                            value={item?.label_prefix}
                            onChange={(e) => {
                              updateContactItems({
                                index: index,
                                field: "label_prefix",
                                value: e.target.value,
                              });
                            }}
                          />
                          <input
                            type="text"
                            className="value"
                            value={item?.data}
                            onChange={(e) => {
                              updateContactItems({
                                index: index,
                                field: "data",
                                value: e.target.value,
                              });
                            }}
                          />
                          <Button onClick={() => removeItem(index)} primary>
                            <Icon id="fa-trash.svg" />
                          </Button>
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
