import { useState } from "react";
import styled from "styled-components";

import Icon from "../../../../components/Icon";
import LoadSpinner from "../../../../components/LoadSpinner";

const StyledDiv = styled.div`
  margin-top: 30px;
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
`;

function ContentMaintenance({}) {
  const [isLoadingRecycleBin, setIsLoadingRecycleBin] = useState(true);
  const [recycleItems, setRecycleItems] = useState([]);

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

      <div>
        <div>Content Review Schedule</div>
        <div>Reading Level Summary</div>
        <div>Broken Links Report</div>
        <div>Did You Find Results</div>
        <div>
          <div>Recycle Bin</div>
          <div className="controls">
            <button>Pages</button>
            <button>Assets</button>
            <button>Reusable components</button>
            <button>Filter</button>
            <button>Download full report</button>
          </div>
        </div>
        <div>Table</div>
        <div>Pagination</div>
      </div>
    </StyledDiv>
  );
}

export default ContentMaintenance;
