import styled from "styled-components";

import Pages from "./Pages";

import UserRoutes from "./components/User";

const StyledApp = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

function App() {
  return (
    <StyledApp>
      <h1>CMS</h1>
      <Pages />
      <UserRoutes />
    </StyledApp>
  );
}

export default App;
