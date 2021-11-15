import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Global components
import Button from "../../../../../components/Button";
import Icon from "../../../../../components/Icon";
import LoadSpinner from "../../../../../components/LoadSpinner";
import Select from "../../../../../components/Select";
import { authenticationService } from "../../../../../_services";
import { pageReviewService } from "../../../../../_services/page-review.service";

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

const ContentReviewSchedule = React.forwardRef(
  ({ isOpen, setIsOpen }, forwardRef) => {
    const username = authenticationService?.currentUserValue?.username;
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [pages, setPages] = useState([]);

    function getAccordionContent() {
      if (isLoading) {
        return <LoadSpinner />;
      }

      if (isError) {
        return <p className="error">Error fetching page review data.</p>;
      }

      if (pages && Array.isArray(pages) && pages.length === 0) {
        return <p>You have no pages for review.</p>;
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
          <Table pages={pages} />
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
              <label htmlFor="content-review-schedule-results-per-page">
                Results per page:
              </label>
              <Select id="content-review-schedule-results-per-page" disabled />
            </div>
          </Pagination>
        </StyledDiv>
      );
    }

    useEffect(() => {
      function getPages() {
        pageReviewService
          .getPagesByUser(authenticationService?.currentUserValue?.username)
          // .getAllPages()
          .then((items) => {
            setPages(items);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsError(true);
          });
      }

      getPages();
    }, [username]);

    return (
      <Accordion
        label="Content Review Schedule"
        open={isOpen}
        setOpen={setIsOpen}
        children={getAccordionContent()}
        ref={forwardRef}
      />
    );
  }
);

export default ContentReviewSchedule;
