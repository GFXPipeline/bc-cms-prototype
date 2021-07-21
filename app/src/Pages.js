import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { authHeader } from "../src/_helpers/auth-header";

const StyledDiv = styled.div`
  background-color: white;
  max-width: 800px;
  width: 60%;
`;

const StyledPage = styled.div`
  background-color: lightgrey;
  padding: 0 8px;
`;

function Pages() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          headers: authHeader(),
        };
        const result = await axios("/api/pages/all", requestOptions);
        setPages(result?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledDiv>
      <h2>Pages</h2>
      <span>GET /api/pages/all</span>
      {pages?.length > 0 &&
        pages.map((page, index) => {
          return (
            <StyledPage key={`page-${index}`}>
              <h3>{page.title}</h3>
              <p>by {page.author}</p>
              <p>Last Updated: {new Date(page.time_last_updated).toString()}</p>
            </StyledPage>
          );
        })}
    </StyledDiv>
  );
}

export default Pages;
