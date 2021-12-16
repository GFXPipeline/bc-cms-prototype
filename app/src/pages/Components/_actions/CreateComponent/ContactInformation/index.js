import { useState } from "react";
import styled from "styled-components";

import AddNew from "./AddNew";

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

function ContactInformation() {
  const [tab, setTab] = useState("add-new");

  return (
    <>
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
      <Body>{tab === "add-new" && <AddNew />}</Body>
    </>
  );
}

export default ContactInformation;
