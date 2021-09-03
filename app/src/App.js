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

function App() {
  return (
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
  );
}

export default App;
