import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { authHeader } from "../../../_helpers/auth-header";

const StyledDiv = styled.div`
  div.page {
    background-color: lightgrey;
    padding: 0 8px;
  }

  p.error {
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a12622;
    padding: 15px;
  }
`;

function Pages() {
  const [pages, setPages] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          headers: authHeader(),
        };
        const result = await axios("/api/pages/all", requestOptions);
        setPages(result?.data);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledDiv>
      {pages?.length > 0 &&
        pages.map((page, index) => {
          return (
            <div className="page" key={`page-${index}`}>
              <p>
                <strong>{page.title}</strong> by {page.author}
              </p>
              <p>
                Last Updated: {new Date(page.time_last_updated).toDateString()}
              </p>
            </div>
          );
        })}
      {isError && <p className="error">API call to /api/pages/all failed.</p>}
    </StyledDiv>
  );
}

export default Pages;
