import { useEffect, useState } from "react";
import styled from "styled-components";

import Accordion from "../../Accordion";
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import LoadSpinner from "../../../../components/LoadSpinner";
import { recycleBinService } from "../../../../_services/recycle-bin.service";

const StyledDiv = styled.div`
  padding: 30px 85px 50px 85px;
  width: 100%;

  div.top {
    align-items: center;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    padding: 50px 0;

    h2 {
      font-size: 36px;
      margin: 0 0 28px 0;
    }

    div.buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      button {
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        margin-right: 46px;
        width: 150px;

        div.svg {
          align-items: center;
          background-color: white;
          border-radius: 36px;
          box-shadow: 5px 5px 15px #00000029;
          display: flex;
          flex-direction: column;
          height: 150px;
          justify-content: space-around;
          padding: 20px;
          width: 150px;

          svg {
            height: 80px;
            width: 80px;
          }
        }

        span {
          font-size: 18px;
          font-weight: 700;
          margin-top: 16px;
        }

        &:last-child {
          margin-right: 0px;
        }

        &:hover {
          span {
            text-decoration: underline;
          }
        }

        &:disabled {
          cursor: not-allowed;

          span {
            text-decoration: none;
          }
        }
      }
    }
  }

  div.bottom {
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
  }
`;

function ContentMaintenance({}) {
  const [isOpenRecycleBin, setIsOpenRecycleBin] = useState(false);
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
      <>
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
      </>
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
    <StyledDiv>
      <div className="top">
        <h2>Content Maintenance</h2>
        <div className="buttons">
          <button disabled>
            <div className="svg">
              <Icon id="md-rate-review.svg" />
            </div>
            <span>Content Review Schedule</span>
          </button>
          <button disabled>
            <div className="svg">
              <Icon id="fa-book-reader.svg" />
            </div>
            <span>Reading Level Summary</span>
          </button>
          <button disabled>
            <div className="svg">
              <Icon id="metro-unlink.svg" />
            </div>
            <span>Broken Links Report</span>
          </button>
          <button disabled>
            <div className="svg">
              <Icon id="md-file-find.svg" />
            </div>
            <span>Did You Find Results</span>
          </button>
          <button>
            <div className="svg">
              <Icon id="fa-trash-restore.svg" />
            </div>
            <span>Recycle Bin</span>
          </button>
        </div>
      </div>

      <div className="bottom">
        <Accordion label="Content Review Schedule" disabled />
        <Accordion label="Reading Level Summary" disabled />
        <Accordion label="Broken Links Report" disabled />
        <Accordion label="Did You Find Results" disabled />
        <Accordion
          label="Recycle Bin"
          open={isOpenRecycleBin}
          setOpen={setIsOpenRecycleBin}
          children={getRecycleBinAccordion()}
        />
      </div>
    </StyledDiv>
  );
}

export default ContentMaintenance;
