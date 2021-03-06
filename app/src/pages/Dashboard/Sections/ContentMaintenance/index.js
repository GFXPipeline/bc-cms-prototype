import React, { useRef, useState } from "react";
import styled from "styled-components";

// Global components
import Accordion from "../../Accordion";
import Icon from "../../../../components/Icon";

// Page components
import ContentReviewSchedule from "./ContentReviewSchedule";
import RecycleBin from "./RecycleBin";

const StyledDiv = styled.div`
  padding: 30px 85px 400px 85px;
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

function ContentMaintenance() {
  // Content Review Schedule
  const [isOpenContent, setIsOpenContent] = useState(false);
  const contentRef = useRef(null);

  // Recycle Bin
  const [isOpenRecycleBin, setIsOpenRecycleBin] = useState(false);
  const recycleBinRef = useRef(null);

  function handleClick(ref) {
    if (!ref.current) return;

    switch (ref) {
      case recycleBinRef:
        setIsOpenRecycleBin(true);
        break;
      case contentRef:
        setIsOpenContent(true);
        break;
      default:
        break;
    }

    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <StyledDiv>
      <div className="top">
        <h2>Content Maintenance</h2>
        <div className="buttons">
          <button onClick={() => handleClick(contentRef)}>
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
          <button onClick={() => handleClick(recycleBinRef)}>
            <div className="svg">
              <Icon id="fa-trash-restore.svg" />
            </div>
            <span>Recycle Bin</span>
          </button>
        </div>
      </div>

      <div className="bottom">
        <ContentReviewSchedule
          label="Content Review Schedule"
          isOpen={isOpenContent}
          setIsOpen={setIsOpenContent}
          ref={contentRef}
        />
        <Accordion label="Reading Level Summary" disabled />
        <Accordion label="Broken Links Report" disabled />
        <Accordion label="Did You Find Results" disabled />
        <RecycleBin
          isOpen={isOpenRecycleBin}
          setIsOpen={setIsOpenRecycleBin}
          ref={recycleBinRef}
        />
      </div>
    </StyledDiv>
  );
}

export default ContentMaintenance;
