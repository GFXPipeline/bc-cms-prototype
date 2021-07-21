import { useEffect, useState } from "react";
import styled from "styled-components";

import { userService } from "../../../_services";

const StyledDiv = styled.div`
  background-color: lightgrey;
  padding: 16px;

  p.error {
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a12622;
    padding: 15px;
  }

  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
    }
  }
`;

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    userService
      .getAll()
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        console.log("inside AllUsers catch");
        console.log(error);
        setIsError(true);
      });
  }, []);

  return (
    <StyledDiv>
      <ul>
        {users?.length > 0 &&
          users
            .sort((a, b) => {
              if (a?.username < b?.username) {
                return -1;
              } else if (a?.username > b?.username) {
                return 1;
              }
              return 0;
            })
            .map((user, index) => {
              return (
                <li key={index}>
                  <span>{user.username}</span>
                </li>
              );
            })}
      </ul>
      {isError && <p className="error">API call to /api/users/all failed.</p>}
    </StyledDiv>
  );
}

export default AllUsers;
