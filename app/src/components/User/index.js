import styled from "styled-components";

import AddUser from "./AddUser";

const StyledDiv = styled.div`
  background-color: white;
  max-width: 800px;
  width: 60%;
`;

function UserRoutes() {
  return (
    <StyledDiv>
      <h2>User Routes</h2>
      <div>
        <h3>Add user</h3>
        <AddUser />
      </div>
    </StyledDiv>
  );
}

export default UserRoutes;
