import styled from "styled-components";

import Header from "../../components/Header";
import PageRoutes from "../../components/Page";
import UserRoutes from "../../components/User";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Home() {
  return (
    <StyledDiv>
      <Header />
      <UserRoutes />
      <PageRoutes />
    </StyledDiv>
  );
}

export default Home;
