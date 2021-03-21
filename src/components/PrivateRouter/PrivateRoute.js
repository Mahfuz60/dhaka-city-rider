import React from "react";
import { Redirect, Route} from "react-router";
import {useContext,UserContext} from 'react';


const PrivateRoute = (children, ...rest) => {
  const [loggedInUser, setLoggedInUser] =useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
