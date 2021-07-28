import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import PrivateRoute from "./components/PrivateRoute";
import Editor from "./components/Editor";
import Login from "./components/User/Login";
import PageRoutes from "./components/Page";
import UserRoutes from "./components/User";
import UserProfile from "./pages/UserProfile";
import Header from "./components/Header";

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
          <PrivateRoute path="/">
            <Header />
            <h1>CMS</h1>
            <UserRoutes />
            <PageRoutes />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;
