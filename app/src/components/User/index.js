import styled from "styled-components";

import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";

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
      <div>
        <h3>Update user</h3>
        <UpdateUser />
      </div>
    </StyledDiv>
  );
}

export default UserRoutes;
