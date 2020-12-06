import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';

const authService = new AuthService();
export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const history = useHistory();
  const [user, setUser] = useState(authService.loadUser());

  /**
   * Saves the user to LocalStorage & and holds the current logged in user
   * in memory.
   *
   * @param {{name, token, email, expiration}} rawUser Basic object returned from the server
   */
  const signin = (rawUser) => {
    const user = authService.signin(rawUser);
    setUser(user);
  }

  /**
   * Removes the stored user token and redirects the user to home.
   */
  const signout = () => {
    const user = authService.signout();
    setUser(user);
    history.push('/');
  }

  /**
   * Uses the current logged in user to determine if they are still
   * authenticated.
   */
  const isAuthenticated = () => {
    return authService.isAuthenticated(user);
  }

  return (
    <AuthContext.Provider value={{user, signin, signout, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
