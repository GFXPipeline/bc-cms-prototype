import styled from "styled-components";

import AllPages from "./AllPages";

const StyledDiv = styled.div`
  background-color: white;
  max-width: 800px;
  width: 60%;
`;

function PageRoutes() {
  return (
    <StyledDiv>
      <h2>Page Routes</h2>
      <div>
        <h3>All Pages</h3>
        <span>GET /api/pages/all</span>
        <AllPages />
      </div>
    </StyledDiv>
  );
}

export default PageRoutes;
