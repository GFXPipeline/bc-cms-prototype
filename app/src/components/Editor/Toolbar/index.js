import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { pageService } from "../../../_services";

const StyledDiv = styled.div`
  background-color: lightgrey;
  width: 100%;
`;

function Toolbar({ id, data, title, setTitle }) {
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(false);
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(false);
  let history = useHistory();

  function handleCreatePage(event) {
    event.preventDefault();

    pageService
      .create({
        data: data,
        title: title,
      })
      .then((response) => {
        setIsCreateButtonDisabled(true);

        // After creating a new page, move the user's URL bar
        // to the `/edit` route for the new page ID.
        history.push(`/edit/${response}`);
      })
      .catch((error) => {
        console.log("error in Toolbar handleCreatePage(): ", error);
      });
  }

  function handleUpdatePage(event) {
    event.preventDefault();
    setIsUpdateButtonDisabled(true);

    pageService
      .update({ id, data, title })
      .then((response) => {
        console.log("response in Toolbar handleUpdatePage(): ", response);
        setIsUpdateButtonDisabled(false);
      })
      .catch((error) => {
        console.log("error in Toolbar handleUpdatePage(): ", error);
        setIsUpdateButtonDisabled(false);
      });
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  return (
    <StyledDiv>
      <button
        disabled={isCreateButtonDisabled}
        onClick={(e) => handleCreatePage(e)}
      >
        Add new page
      </button>
      <button
        disabled={isUpdateButtonDisabled}
        onClick={(e) => handleUpdatePage(e)}
      >
        Update page
      </button>
      <input
        type="text"
        id="title"
        onChange={(e) => handleTitleChange(e)}
        value={title}
      />
    </StyledDiv>
  );
}

export default Toolbar;
