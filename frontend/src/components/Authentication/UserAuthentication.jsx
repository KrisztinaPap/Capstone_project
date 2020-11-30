// Import Resources
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';

// Create UserContext
const UserContext = React.createContext();

// User Object to be Stored in UserContext
const UserData = {
    email: null,
    name: null,
    token: null,
    expiration: null,
    isAuthenticated: function() {
        return (this.token == null || this.expiration < Date.now()) ? false : true
    }
}

// Function to Reset UserData to null, LogOut
const ResetUserData = () => {
    for (const key in UserData) {
        if (typeof UserData[key] != "function") {
            UserData[key] = null;
        }
    }
    return UserData;
}

// Function that Redirects to Login
const AuthorizeRedirect = () => {
    // Prepare to use useHistory for Redirect
    //const history = useHistory();
    // Redirect to Login
    //history.push("login");
    return (<Redirect to="/login" />);
}

// Function to Authorize User's Access to Component
const Authorize = () => {
    if (!UserData.isAuthenticated()) {
       //AuthorizeRedirect();
       console.log(UserData.isAuthenticated());
       return (<Redirect to="/login" />);
    }
}

// Export User Authentication
export { UserContext, UserData, ResetUserData, Authorize };