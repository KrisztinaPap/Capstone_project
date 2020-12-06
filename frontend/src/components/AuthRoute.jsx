import React, { useContext } from 'react';
import { Redirect, Route, useLocation }  from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// Citation:
// https://ui.dev/react-router-v4-protected-routes-authentication/
//
// Got idea for wrapping the route component in our custom auth
// route. If the user is authenticated then we return the component
// otherwise we redirect to our login route with the original requested
// route as our 'return' route.

export const AuthRoute = ({component: Component, ...rest}) => {
  const location = useLocation()
  const {isAuthenticated} = useContext(AuthContext);
    return (
      <Route
        {...rest} render={(props) => {
          return isAuthenticated() ? <Component {...props} />
                                    : <Redirect to={{
                                        pathname: '/login',
                                        state: { from: location }
                                      }}  />
        }} />
    )
}

export default AuthRoute;
