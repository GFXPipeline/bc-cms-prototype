import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Global components
import Button from "../../../../../components/Button";
import Icon from "../../../../../components/Icon";
import LoadSpinner from "../../../../../components/LoadSpinner";
import { recycleBinService } from "../../../../../_services/recycle-bin.service";

// Page components
import Accordion from "../../../Accordion";

const StyledDiv = styled.div`
  margin: 38px 0;

  button {
    height: 44px;
    padding: 0 18px;

    &.filter {
      margin: 0 18px;
      padding: 0;
      width: 44px;
    }

    &.download {
      svg {
        margin-right: 16px;
      }
    }
  }

  p.error {
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a12622;
    padding: 15px;
  }
`;

const RecycleBin = React.forwardRef(({ isOpen, setIsOpen }, forwardRef) => {
  const [isLoadingRecycleBin, setIsLoadingRecycleBin] = useState(true);
  const [isErrorRecycleBin, setIsErrorRecycleBin] = useState(false);
  const [recycleItems, setRecycleItems] = useState([]);

  function getRecycleBinAccordion() {
    if (isLoadingRecycleBin) {
      return <LoadSpinner />;
    }

    if (isErrorRecycleBin) {
      return <p className="error">Error fetching recycle bin data.</p>;
    }

    if (
      recycleItems &&
      Array.isArray(recycleItems) &&
      recycleItems.length === 0
    ) {
      return <p>Your recycle bin is empty.</p>;
    }

    return (
      <StyledDiv>
        <div className="controls">
          <Button primary>Content</Button>
          <Button>Assets</Button>
          <Button>Reusable components</Button>
          <Button className="filter" aria-label="Filter" primary>
            <Icon id="fa-filter.svg" />
          </Button>
          <Button className="download">
            <Icon id="fa-download.svg" />
            <span>Download full report</span>
          </Button>
        </div>
        <div>
          {recycleItems.map((item, index) => {
            return <p key={index}>{item?.id}</p>;
          })}
        </div>
        <div>Pagination</div>
      </StyledDiv>
    );
  }

  useEffect(() => {
    function getRecycleBinItems() {
      recycleBinService
        .getPagesByUser()
        .then((items) => {
          console.log("inside success");
          setRecycleItems(items);
          setIsLoadingRecycleBin(false);
        })
        .catch((error) => {
          console.log("inside error");
          console.log(error);
          setIsErrorRecycleBin(true);
        });
    }

    getRecycleBinItems();
  }, []);

  return (
    <Accordion
      label="Recycle Bin"
      open={isOpen}
      setOpen={setIsOpen}
      children={getRecycleBinAccordion()}
      ref={forwardRef}
    />
  );
});

export default RecycleBin;
