import { useEffect, useState } from "react";
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
  desiredParentPageId,
  locationText,
  openPageBranchesFromParent,
  pageTree,
  setDesiredParentPageId,
  setLocationText,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPageBranches, setOpenPageBranches] = useState(
    (openPageBranchesFromParent
      ? openPageBranchesFromParent
      : pageTree &&
        typeof pageTree === "object" && [Object.keys(pageTree)?.[0]]) || []
  );

  function handleSelect(event) {
    setDesiredParentPageId(event.target.id);
  }

  // Get the selected page's URI path to set the text for the location field
  useEffect(() => {
    if (desiredParentPageId) {
      pageService
        .getPath(desiredParentPageId)
        .then((path) => {
          console.log("path in PageLocation: ", path);
          setLocationText(path);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [desiredParentPageId]);

  return (
    <StyledDiv>
      <h3>Page location</h3>
      <label htmlFor="page-location">Select where to create the page(s):</label>
      <div className="location-input">
        <TextInput id="page-location" disabled value={locationText} />
        <Button primary onClick={() => setIsModalOpen(true)}>
          Browse
        </Button>
      </div>
      <PageLocationSelector
        handleSelect={handleSelect}
        isOpen={isModalOpen}
        openPageBranches={openPageBranches}
        pageTree={pageTree}
        selected={[desiredParentPageId]}
        setIsOpen={setIsModalOpen}
        setLocation={setDesiredParentPageId}
        setOpenPageBranches={setOpenPageBranches}
        title={"Choose a location"}
      />
    </StyledDiv>
  );
}

export default PageLocation;
