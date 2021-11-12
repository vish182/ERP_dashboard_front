import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "./utility";
import { useAuth } from "../contexts/AuthContext";

function AdminRoute({ component: Component, ...rest }) {
  const { currentUserDoc } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUserDoc && isAdmin({ role: currentUserDoc.role }) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute;
