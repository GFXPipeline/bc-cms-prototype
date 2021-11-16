import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import About from "./pages/About";
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
        <Route path="/about">
          <About />
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

        {/* Page content */}
        <PrivateRoute path="/content/:id">
          <ContentEntry />
        </PrivateRoute>
        <PrivateRoute path="/content">
          <ContentEntry />
        </PrivateRoute>

        {/* Reusable components */}
        <PrivateRoute path="/components/:id">
          <Components />
        </PrivateRoute>
        <PrivateRoute path="/components">
          <Components />
        </PrivateRoute>

        {/* Dashboard */}
        <PrivateRoute path="/dashboard">
          <Dashboard section={"dashboard"} />
        </PrivateRoute>
        <PrivateRoute path="/analytics">
          <Dashboard section={"analytics"} />
        </PrivateRoute>
        <PrivateRoute path="/content-maintenance">
          <Dashboard section={"content-maintenance"} />
        </PrivateRoute>
        <PrivateRoute path="/workflow-status">
          <Dashboard section={"workflow-status"} />
        </PrivateRoute>
        <PrivateRoute path="/users-and-groups">
          <Dashboard section={"users-and-groups"} />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Dashboard section={"dashboard"} />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
