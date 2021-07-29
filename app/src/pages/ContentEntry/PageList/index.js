import { useEffect, useState } from "react";
import styled from "styled-components";

import { pageService } from "../../../_services";

const StyledDiv = styled.div`
  height: 100%;
  max-height: 500px;
  overflow-y: auto;

  ul {
    margin: 0;
    padding: 13px;

    li {
      height: 44px;
      line-height: 44px;
      list-style: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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

function PageList() {
  const [pages, setPages] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    pageService
      .getPageList()
      .then((pages) => {
        setPages(pages);
      })
      .catch((error) => {
        setIsError(true);
        throw error;
      });
  }, []);

  return (
    <StyledDiv>
      {pages?.length > 0 && (
        <ul>
          {pages.map((page, index) => {
            return <li key={index}>{page.title}</li>;
          })}
        </ul>
      )}
      {isError && <p className="error">Failed to fetch page list.</p>}
    </StyledDiv>
  );
}

export default PageList;
