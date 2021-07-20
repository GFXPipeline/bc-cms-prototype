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

function AddUser() {
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
        "/api/users/create",
        {
          username: username,
          password: password,
        },
        requestOptions
      )
      .then((res) => {
        if (res?.data?.created) {
          setIsSuccess(true);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        console.log("error in AddUser POST route: ", error);
        setIsError(true);
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
        <legend>Create a new user</legend>
        <fieldset>
          <div>
            <label htmlFor="add-user-username">Username:</label>
            <input
              id="add-user-username"
              type="text"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="add-user-password">Password:</label>
            <input
              id="add-user-password"
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
          id="add-user-submit-button"
          type="Submit"
          onClick={(e) => handleSubmit(e)}
          disabled={!username || !password || isSubmitting}
        >
          Submit
        </button>

        {/* Reset button */}
        <button
          id="add-user-reset-button"
          disabled={!username && !password}
          onClick={(e) => handleReset(e)}
        >
          Reset
        </button>

        {isSuccess && (
          <p className="success">
            Created user <strong>{username}</strong>
          </p>
        )}
        {isError && <p className="error">Unable to create new user</p>}
      </form>
    </StyledDiv>
  );
}

export default AddUser;
