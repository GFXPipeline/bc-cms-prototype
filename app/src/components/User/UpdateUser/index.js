import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: lightgrey;

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
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .post("/api/users/update", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res?.data?.updated) {
          setSuccess(`Updated password for username`);
        } else {
          setError(`Unable to update password for username`);
        }
      })
      .catch((err) => {
        // 4xx responses are caught here
        setError("Unable to update password for username");
      });
  }

  function handleReset() {
    setUsername("");
    setPassword("");
    setSuccess("");
    setError("");
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
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              value={password}
            />
          </div>
        </fieldset>

        {/* Submit button */}
        <button
          id="update-user-submit-button"
          type="Submit"
          onClick={handleSubmit}
          disabled={!username || !password || isSubmitting}
        >
          Submit
        </button>

        {/* Reset button */}
        <button
          id="update-user-reset-button"
          // type="reset"
          disabled={!username && !password}
          onClick={handleReset}
        >
          Reset
        </button>

        {success && (
          <p className="success">
            {success} <strong>{username}</strong>
          </p>
        )}
        {error && (
          <p className="error">
            {error} <strong>{username}</strong>
          </p>
        )}
      </form>
    </StyledDiv>
  );
}

export default UpdateUser;
