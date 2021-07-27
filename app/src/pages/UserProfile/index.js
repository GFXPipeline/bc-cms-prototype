import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { userService } from "../../_services";
import Header from "../../components/Header";

const StyledDiv = styled.div`
  background-color: white;
  max-width: 800px;
  width: 60%;

  p.error {
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a12622;
    padding: 15px;
  }
`;

function UserProfile() {
  const { username } = useParams();
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (username) {
      userService
        .getUserDetails(username)
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          console.log("error in UserProfile userService catch: ", error);
          setIsError(true);
        });
    }
  }, [username]);

  return (
    <>
      <Header />
      <StyledDiv>
        <h2>User Details</h2>
        {isError && (
          <p className="error">Could not retrieve data for user {username}</p>
        )}
        {data?.username && (
          <p>
            <strong>Username:</strong> {data?.username}
          </p>
        )}
        {data?.id && (
          <p>
            <strong>ID:</strong> {data?.id}
          </p>
        )}
        {data?.is_admin && (
          <p>
            <strong>Administrator:</strong> {data?.is_admin ? "Yes" : "No"}
          </p>
        )}
        {data?.time_created && (
          <p>
            <strong>Created:</strong> {data?.time_created}
          </p>
        )}
        {data?.time_last_updated && (
          <p>
            <strong>Last Updated:</strong> {data?.time_last_updated}
          </p>
        )}
      </StyledDiv>
    </>
  );
}

export default UserProfile;
