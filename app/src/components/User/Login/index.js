import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

import { authenticationService } from "../../../_services";

const StyledDiv = styled.div`
  background-color: lightgrey;
  padding: 16px;
  width: 60%;
  max-width: 800px;

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

  p.error {
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a12622;
    padding: 15px;
  }
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(
    Boolean(authenticationService.currentUserValue)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  // history object state items are set in PrivateRoute
  const referer = history?.location?.state?.referer || document.referrer || "/";
  const params = history?.location?.state?.params || "";

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await authenticationService.login(username, password);
      if (user) setLoggedIn(true);
    } catch (isError) {
      setIsSubmitting(false);
      setIsError(true);
    }
  }

  function handleReset(event) {
    event.preventDefault();

    setUsername("");
    setPassword("");
    setIsError(false);
    setIsSubmitting(false);
  }

  if (isLoggedIn) {
    console.log();
    return <Redirect to={`${referer}${params}`} />;
  }

  return (
    <StyledDiv>
      <form>
        <legend>Login with username and password</legend>
        <fieldset>
          <div>
            <label htmlFor="login-username">Username:</label>
            <input
              id="login-username"
              type="text"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="login-password">Password:</label>
            <input
              id="login-password"
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
          id="login-submit-button"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          disabled={!username || !password || isSubmitting}
        >
          Submit
        </button>

        {/* Reset button */}
        <button
          id="login-reset-button"
          disabled={!username && !password}
          onClick={(e) => handleReset(e)}
        >
          Reset
        </button>

        {isError && <p className="error">Incorrect username or password.</p>}
      </form>
    </StyledDiv>
  );
}

export default Login;
