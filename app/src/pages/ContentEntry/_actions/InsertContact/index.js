import { useState } from "react";
import styled from "styled-components";

import Modal from "../../../../components/Modal";

import AddNew from "./AddNew";

const StyledModal = styled(Modal)`
  .Overlay {
    z-index: 1;
  }

  .Modal {
    display: flex;
    flex-direction: column;
    height: auto;
    max-height: 90%;
    min-height: 80%;
    max-width: 90%;
    width: auto;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;

  button {
    background-color: white;
    border-top: none;
    border-right: none;
    border-bottom: 1px solid black;
    border-left: none;
    margin: 0;
    padding: 7px 21px;

    &.active {
      border-top: 1px solid black;
      border-right: 1px solid black;
      border-bottom: none;
      border-left: 1px solid black;
    }
  }

  span.spacer {
    border-bottom: 1px solid black;
    display: block;
    flex-grow: 1;
  }
`;

const Body = styled.div`
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  padding: 20px;
`;

function InsertContact({ editor, isOpen, setIsOpen, onAfterClose }) {
  const [tab, setTab] = useState("add-new");

  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onAfterClose={onAfterClose}
    >
      <h1>Contact information</h1>
      <Tabs>
        <button
          className={tab === "add-new" ? "active" : null}
          onClick={() => setTab("add-new")}
        >
          Add new
        </button>
        <button
          className={tab === "use-existing" ? "active" : null}
          onClick={() => setTab("use-existing")}
        >
          Use existing
        </button>
        <span className="spacer" />
      </Tabs>
      <Body>
        {tab === "add-new" && <AddNew editor={editor} setIsOpen={setIsOpen} />}
      </Body>
    </StyledModal>
  );
}

export default InsertContact;
