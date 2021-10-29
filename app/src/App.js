import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import Editor from "./pages/Editor";
import UserProfile from "./pages/UserProfile";
import ContentEntry from "./pages/ContentEntry";
import Components from "./pages/Components";
import Dashboard from "./pages/Dashboard";
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
        <PrivateRoute path="/admin">
          <Home />
        </PrivateRoute>
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
        <PrivateRoute path="/components/:id">
          <Components />
        </PrivateRoute>
        <PrivateRoute path="/components">
          <Components />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
