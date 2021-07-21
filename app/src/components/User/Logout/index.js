import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { authenticationService } from "../../../_services";

const StyledDiv = styled.div`
  background-color: lightgrey;
  padding: 16px;
`;

function Logout() {
  const history = useHistory();

  return (
    <StyledDiv>
      <span>Remove the user token from localStorage:</span>
      <button
        onClick={() => {
          authenticationService.logout();
          history.push("/");
        }}
      >
        Logout
      </button>
    </StyledDiv>
  );
}

export default Logout;
