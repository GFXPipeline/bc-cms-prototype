import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Global components
import Button from "../../../../../components/Button";
import Icon from "../../../../../components/Icon";
import LoadSpinner from "../../../../../components/LoadSpinner";
import Select from "../../../../../components/Select";
import { recycleBinService } from "../../../../../_services/recycle-bin.service";

// Page components
import Accordion from "../../../Accordion";
import Table from "./Table";

const StyledDiv = styled.div`
  margin: 38px 0;

  div.controls {
    align-items: center;
    display: flex;
    flex-direction: row;

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
  }

  p.error {
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a12622;
    padding: 15px;
  }
`;

const TableContainer = styled.div`
  margin-top: 24px;
  overflow-x: auto;

  table {
    border: 1px solid #d7d7d7;

    th {
      color: #1a5a96;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;

  div.space {
    flex-grow: 1;
    width: 200px;
  }

  div.button-group {
    button {
      font-size: 18px;
      font-weight: 700;
      padding: 0px 0px;
      height: 44px;
      width: 44px;
    }
  }

  div.results-per-page {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    width: 200px;

    label {
      display: block;
      font-size: 18px;
      font-weight: 700;
      margin-left: auto;
      margin-right: 7px;
    }

    select {
      width: 60px;
    }
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
        <TableContainer>
          <Table
            id="recycle-bin-table"
            tableColumns={[
              {
                Header: "",
                accessor: "restore_button",
              },
              {
                Header: "Page title",
                accessor: "page_title",
              },
              {
                Header: "Deleted by",
                accessor: "deleted_by",
              },
              {
                Header: "Deleted date",
                accessor: "deleted_date",
              },
              {
                Header: "Reason for deletion",
                accessor: "reason",
              },
              {
                Header: "Last page location",
                accessor: "location",
              },
            ]}
            tableData={recycleItems.map((item) => {
              let date = "";

              if (item?.time_created) {
                const itemDate = new Date(item?.time_created);
                const datePart = itemDate.toISOString().split("T")[0];
                const hours = itemDate.getHours();
                const amPm = hours >= 12 ? "PM" : "AM";
                const displayHours = hours % 12 ? hours % 12 : 12;
                const minutes = itemDate.getMinutes();
                const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
                date = `${datePart} ${displayHours}:${displayMinutes} ${amPm}`;
              }

              return {
                restore_button: <Button primary>Restore</Button>,
                page_title: item?.title,
                deleted_by: item?.deleted_by_username,
                deleted_date: date,
                reason: item?.reason,
                location: "Root",
              };
            })}
          />
        </TableContainer>
        <Pagination>
          <div className="space" />
          <div className="button-group">
            <Button disabled>«</Button>
            <Button disabled>‹</Button>
            <Button disabled>1</Button>
            <Button disabled>›</Button>
            <Button disabled>»</Button>
          </div>
          <div className="results-per-page">
            <label htmlFor="recycle-bin-results-per-page">
              Results per page:
            </label>
            <Select id="recycle-bin-results-per-page" disabled />
          </div>
        </Pagination>
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
