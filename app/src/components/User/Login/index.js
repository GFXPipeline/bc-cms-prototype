import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

import { authenticationService } from "../../../_services";
import Button from "../../Button";
import Modal from "../../Modal";
import TextInput from "../../TextInput";

const StyledForm = styled.form`
  h1 {
    margin: 0 0 20px 0;
  }

  legend {
    margin-bottom: 20px;
    padding: 0;
  }

  fieldset {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
  }

  div.input-label-pair {
    margin-bottom: 20px;
  }

  div.button-container {
    margin-top: 20px;

    button {
      margin-right: 20px;
    }
  }

  p.error {
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a12622;
    margin: 20px 0 0 0;
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
    <Modal
      isOpen={true}
      setIsOpen={() => {
        return null;
      }}
      contentLabel={"Login"}
    >
      <StyledForm>
        <h1>Login</h1>

        <fieldset>
          <legend>Login with username and password</legend>
          <div className="input-label-pair">
            <label htmlFor="login-username">Username:</label>
            <TextInput
              id="login-username"
              type="text"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              value={username}
            />
          </div>
          <div className="input-label-pair">
            <label htmlFor="login-password">Password:</label>
            <TextInput
              id="login-password"
              type="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              value={password}
            />
          </div>
        </fieldset>

        <div className="button-container">
          {/* Submit button */}
          <Button
            id="login-submit-button"
            primary
            type="submit"
            onClick={(e) => handleSubmit(e)}
            disabled={!username || !password || isSubmitting}
          >
            Submit
          </Button>

          {/* Reset button */}
          <Button
            id="login-reset-button"
            disabled={!username && !password}
            onClick={(e) => handleReset(e)}
          >
            Reset
          </Button>
        </div>

        {isError && (
          <p role="alert" className="error">
            Incorrect username or password.
          </p>
        )}
      </StyledForm>
    </Modal>
  );
}

export default Login;
