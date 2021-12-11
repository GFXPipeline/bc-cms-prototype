import { useState } from "react";
import styled from "styled-components";

import Button from "../../../../../components/Button";
import PageLocationSelector from "../../../../../components/PageLocationSelector";
import TextInput from "../../../../../components/TextInput";
import { pageService } from "../../../../../_services";

const StyledDiv = styled.div`
  padding: 24px;

  h3 {
    font-size: 30px;
    margin: 0 0 18px 0;
  }

  label {
    display: block;
    font-size: 16px;
    margin: 0 0 18px 0;
  }

  div.location-input {
    display: flex;
    flex-direction: row;
    width: 575px;
  }
`;

function PageLocation({
  location,
  setLocation,
  desiredLocation,
  setDesiredLocation,
  pageTree,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPageBranches, setOpenPageBranches] = useState(
    (pageTree &&
      typeof pageTree === "object" && [Object.keys(pageTree)?.[0]]) ||
      []
  );

  function handleSelect(event) {
    setDesiredLocation(event.target.value);
  }

  function handleCleanup() {
    // Get the selected page's URI path
    // to set the text for the location field
    pageService
      .getPath(desiredLocation)
      .then((path) => {
        console.log("path in PageLocation: ", path);
        setLocation(path);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <StyledDiv>
      <h3>Page location</h3>
      <label htmlFor="page-location">Select where to create the page(s):</label>
      <div className="location-input">
        <TextInput
          id="page-location"
          disabled
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button primary onClick={() => setIsModalOpen(true)}>
          Browse
        </Button>
      </div>
      <PageLocationSelector
        handleSelect={handleSelect}
        isOpen={isModalOpen}
        location={location}
        onAfterClose={handleCleanup}
        openPageBranches={openPageBranches}
        pageTree={pageTree}
        selected={desiredLocation}
        setIsOpen={setIsModalOpen}
        setLocation={setLocation}
        setOpenPageBranches={setOpenPageBranches}
        title={"Choose a location"}
      />
    </StyledDiv>
  );
}

export default PageLocation;
