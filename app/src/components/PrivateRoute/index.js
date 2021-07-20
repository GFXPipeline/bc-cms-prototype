import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { authenticationService } from "../../_services";

// Wrapper for any Route that requires authorization
function PrivateRoute({ children, ...rest }) {
  const location = useLocation();
  const referer = location?.pathname || "/";
  const params = location?.search || "";
  const currentUser = authenticationService.currentUserValue;

  return currentUser ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          referer: referer,
          params: params,
        },
      }}
    />
  );
}

export default PrivateRoute;
