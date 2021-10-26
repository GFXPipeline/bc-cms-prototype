import { useState } from "react";
import styled from "styled-components";

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
      margin: 0 0 28px 0;
    }

    div.buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
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
          <button>Content Review Schedule</button>
          <button>Reading Level Summary</button>
          <button>Broken Links Report</button>
          <button>Did You Find Results</button>
          <button>Recycle Bin</button>
        </div>
      </div>

      <div>
        <div>Content Review Schedule</div>
        <div>Reading Level Summary</div>
        <div>Broken Links Report</div>
        <div>Did You Find Results</div>
        <div>Recycle Bin</div>
      </div>
    </StyledDiv>
  );
}

export default ContentMaintenance;
