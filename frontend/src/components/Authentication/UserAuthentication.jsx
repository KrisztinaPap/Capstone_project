// Import Resources
import React from 'react';
import { useHistory } from 'react-router-dom';

// Function to Save UserData to LocalStorage
function SaveUserData() {
    const userData = {};
    for (const key in UserData) {
        if (typeof UserData[key] != "function") {
            userData[key] = UserData[key];
        }
    }
    localStorage.setItem("yummyPuddleJumpersUserData", JSON.stringify(userData));
}

// Function to Reset UserData to null, LogOut
function ResetUserData() {
    for (const key in UserData) {
        if (typeof UserData[key] != "function") {
            UserData[key] = null;
        }
    }
    localStorage.setItem("yummyPuddleJumpersUserData", JSON.stringify(UserData));
}

// Function that Redirects to Login
function AuthorizeRedirect() {
    // Prepare to use useHistory for Redirect
    const history = useHistory();
    // Redirect to Login
    history.push("login");
}

// Function to Authorize User's Access to Component
function Authorize() {
    if (!UserData.isAuthenticated()) {
       AuthorizeRedirect();
    }
}

// Get User Object from LocalStorage
let yummyPuddleJumpersUserData = JSON.parse(localStorage.getItem("yummyPuddleJumpersUserData"));
// Check for Empty LocalStorage, ex: First Time Users, Cleared LocalStorage
if (yummyPuddleJumpersUserData == null) {
    ResetUserData();
}

// Create UserContext
const UserContext = React.createContext();

// User Object to be Stored in UserContext
const UserData = {
    email: yummyPuddleJumpersUserData.email,
    name: yummyPuddleJumpersUserData.name,
    token: yummyPuddleJumpersUserData.token,
    expiration: yummyPuddleJumpersUserData.expiration,
    isAuthenticated: function() {
        return (this.token == null || this.expiration < Date.now()) ? false : true
    },
    saveUser: function() {
        SaveUserData();
    },
    logOut: function() {
        this.email = null;
        this.name = null;
        this.token = null;
        this.expiration = null;
        ResetUserData();
    }
}

// Export User Authentication
export { UserContext, UserData, Authorize };