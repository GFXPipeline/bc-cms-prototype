import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { authHeader } from "../../../_helpers/auth-header";

const StyledDiv = styled.div`
  background-color: lightgrey;
  padding: 16px;

  form {
    fieldset {
      background: none;
      border: none;
      margin: 0;
      padding: 0;

      legend {
        padding: 0;
      }
    }
  }

  p.success {
    background-color: #dff0d8;
    border: 1px solid #d6e9c6;
    border-radius: 4px;
    color: #2d4821;
    padding: 15px;
  }

  p.error {
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a12622;
    padding: 15px;
  }
`;

function UpdateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    const requestOptions = {
      headers: authHeader(),
    };

    axios
      .post(
        "/api/users/update",
        {
          username: username,
          password: password,
        },
        requestOptions
      )
      .then((res) => {
        if (res?.data?.updated) {
          setIsSuccess(true);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        // 4xx and 5xxx responses are caught here
        setIsError(true);
        console.log("error in UpdateUser POST route: ", error);
      });
  }

  function handleReset(event) {
    event.preventDefault();

    setUsername("");
    setPassword("");
    setIsSuccess(false);
    setIsError(false);
    setIsSubmitting(false);
  }

  return (
    <StyledDiv>
      <form>
        <legend>Update a user password.</legend>
        <fieldset>
          <div>
            <label htmlFor="update-user-username">Username:</label>
            <input
              id="update-user-username"
              type="text"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="update-user-password">New password:</label>
            <input
              id="update-user-password"
              type="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              value={password}
            />
          </div>
        </fieldset>

        {/* Submit button */}
        <button
          id="update-user-submit-button"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          disabled={!username || !password || isSubmitting}
        >
          Submit
        </button>

        {/* Reset button */}
        <button
          id="update-user-reset-button"
          disabled={!username && !password}
          onClick={(e) => handleReset(e)}
        >
          Reset
        </button>

        {isSuccess && (
          <p className="success">
            Updated password for user <strong>{username}</strong>
          </p>
        )}
        {isError && (
          <p className="error">
            Could not update user <strong>{username}</strong>
          </p>
        )}
      </form>
    </StyledDiv>
  );
}

export default UpdateUser;
