import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  // console.log("ec", Cookies.get('token')) // => 'value')

  const auth = Cookies.get("auth");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
