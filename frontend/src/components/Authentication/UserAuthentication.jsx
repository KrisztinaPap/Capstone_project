// Import Resources
import React from 'react';
import { useHistory } from 'react-router-dom';

// Create UserContext
const UserContext = React.createContext();

// Get User Object from LocalStorage
let puddleJumpersUserData = JSON.parse(localStorage.getItem("puddleJumpersUserData"));

// User Object to be Stored in UserContext
const UserData = {
    email: (puddleJumpersUserData["email"]) ? puddleJumpersUserData["email"] : null,
    name: (puddleJumpersUserData["name"]) ? puddleJumpersUserData["name"] : null,
    token: (puddleJumpersUserData["token"]) ? puddleJumpersUserData["token"] : null,
    expiration: (puddleJumpersUserData["expiration"]) ? puddleJumpersUserData["expiration"] : null,
    isAuthenticated: function() {
        return (this.token == null || this.expiration < Date.now()) ? false : true
    }
}

// Function to Save UserData to LocalStorage
const SaveUserData = () => {
    const userData = {};
    for (const key in UserData) {
        if (typeof UserData[key] != "function") {
            userData[key] = UserData[key];
        }
    }
    localStorage.setItem("puddleJumpersUserData", JSON.stringify(userData));
}

// Function to Reset UserData to null, LogOut
const ResetUserData = () => {
    for (const key in UserData) {
        if (typeof UserData[key] != "function") {
            UserData[key] = null;
        }
    }
    localStorage.setItem("puddleJumpersUserData", JSON.stringify(UserData));
}

// Function that Redirects to Login
const AuthorizeRedirect = () => {
    // Prepare to use useHistory for Redirect
    const history = useHistory();
    // Redirect to Login
    history.push("login");
}

// Function to Authorize User's Access to Component
const Authorize = () => {
    if (!UserData.isAuthenticated()) {
       AuthorizeRedirect();
    }
}

// Export User Authentication
export { UserContext, UserData, SaveUserData, ResetUserData, Authorize };