import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminRoute({ component: Component, ...rest }) {
  const { currentUser, currentUserDoc } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUserDoc && currentUserDoc.role > 0 ? (
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
