import styled from "styled-components";

import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import Logout from "./Logout";
import AllUsers from "./AllUsers";

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
        <span>POST /api/users/add</span>
        <AddUser />
      </div>
      <div>
        <h3>Update user</h3>
        <span>POST /api/users/update</span>
        <UpdateUser />
      </div>
      <div>
        <h3>Logout</h3>
        <span>POST /api/users/logout</span>
        <Logout />
      </div>
      <div>
        <h3>All Users</h3>
        <span>GET /api/users/all</span>
        <AllUsers />
      </div>
    </StyledDiv>
  );
}

export default UserRoutes;
