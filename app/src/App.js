import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

// Pages
import Editor from "./pages/Editor";
import UserProfile from "./pages/UserProfile";
import ContentEntry from "./pages/ContentEntry";
import Home from "./pages/Home";

// Components
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/User/Login";

const StyledApp = styled.div`
  * {
    font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
  }

  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

function App() {
  return (
    <StyledApp>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/edit/:id">
            <Editor />
          </PrivateRoute>
          <PrivateRoute path="/edit">
            <Editor />
          </PrivateRoute>
          <PrivateRoute path="/user/:username">
            <UserProfile />
          </PrivateRoute>
          <PrivateRoute path="/content/:id">
            <ContentEntry />
          </PrivateRoute>
          <PrivateRoute path="/content">
            <ContentEntry />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;
