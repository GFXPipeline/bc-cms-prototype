import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { pageService } from "../../../_services";

const StyledDiv = styled.div`
  height: 100%;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 13px;

  a {
    color: #313132;
    display: block;
    height: 44px;
    line-height: 44px;
    list-style: none;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
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
      {pages?.length > 0 &&
        pages.map((page, index) => {
          return (
            <Link key={`page-list-button-${index}`} to={`/content/${page?.id}`}>
              {page.title}
            </Link>
          );
        })}
      {isError && <p className="error">Failed to fetch page list.</p>}
    </StyledDiv>
  );
}

export default PageList;
