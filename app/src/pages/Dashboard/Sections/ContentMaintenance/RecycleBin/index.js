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
import RestorePage from "./_actions/RestorePage";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageId, setPageId] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [parentPageId, setParentPageId] = useState("");
  const [recycleItems, setRecycleItems] = useState([]);

  function handleRestoreButton(id, title, parentPageId) {
    setPageId(id);
    setPageTitle(title);
    setParentPageId(parentPageId);
    setIsModalOpen(true);
  }

  function getRecycleBinAccordion() {
    if (isLoading) {
      return <LoadSpinner />;
    }

    if (isError) {
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
          <Button disabled primary>
            Content
          </Button>
          <Button disabled>Assets</Button>
          <Button disabled>Reusable components</Button>
          <Button disabled className="filter" aria-label="Filter" primary>
            <Icon id="fa-filter.svg" />
          </Button>
          <Button disabled className="download">
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
                accessor: "id",
                Cell: ({ row }) => {
                  return (
                    <Button
                      onClick={() =>
                        handleRestoreButton(
                          row?.original?.page_id,
                          row?.original?.page_title,
                          row?.original?.parent_page_id
                        )
                      }
                      primary
                    >
                      Restore
                    </Button>
                  );
                },
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
                id: item?.id,
                page_id: item?.page_id,
                parent_page_id: item?.parent_page_id,
                page_title: item?.title,
                deleted_by: item?.deleted_by_username,
                deleted_date: date,
                reason: item?.reason,
                location: "",
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
        <RestorePage
          id={pageId}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onAfterClose={refreshRecycleBin}
          parentPageId={parentPageId}
          title={pageTitle}
        />
      </StyledDiv>
    );
  }

  function refreshRecycleBin() {
    recycleBinService
      .getPagesByUser()
      .then((items) => {
        setRecycleItems(items);
        setPageId("");
        setPageTitle("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPageId("");
        setPageTitle("");
        setIsError(true);
      });
  }

  useEffect(() => {
    function getRecycleBinItems() {
      recycleBinService
        .getPagesByUser()
        .then((items) => {
          setRecycleItems(items);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
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
