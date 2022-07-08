import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  // console.log("ec", Cookies.get('token')) // => 'value')

  const auth = Cookies.get("auth");

  const authRedux = useSelector((state) => state.auth.auth);
  console.log(authRedux);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authRedux) {
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
