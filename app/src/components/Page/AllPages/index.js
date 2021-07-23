import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

        if (result?.data && Array.isArray(result?.data)) {
          setPages(result?.data);
        } else {
          setIsError(true);
          console.log(
            "Pages /api/pages/all call returned a non-array response"
          );
        }
      } catch (error) {
        setIsError(true);
        console.log("error in Pages: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledDiv>
      {pages &&
        pages?.length > 0 &&
        pages?.map((page, index) => {
          return (
            <div className="page" key={`page-${index}`}>
              <p>
                <Link to={`/edit/${page.id}`}>
                  <strong>{page.title}</strong>
                </Link>
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
