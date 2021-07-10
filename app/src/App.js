import styled from "styled-components";

import Pages from "./Pages";

const StyledApp = styled.div`
  display: flex;
  justify-content: space-around;
`;

function App() {
  return (
    <StyledApp>
      <Pages />
    </StyledApp>
  );
}

export default App;
