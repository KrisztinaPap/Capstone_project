// Import Resources
import React from 'react';
import { useHistory } from 'react-router-dom';

// Function to Save UserData to LocalStorage
function SaveUserData(userData) {
    let userData_ = {};
    for (const key in userData) {
        if (typeof userData[key] != "function") {
            userData_[key] = userData[key];
        }
    }
    localStorage.setItem("yummyPuddleJumpersUserData", JSON.stringify(userData_));
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
    if (!userData.isAuthenticated()) {
       AuthorizeRedirect();
    }
}

// Get User Object from LocalStorage
let yummyPuddleJumpersUserData = JSON.parse(localStorage.getItem("yummyPuddleJumpersUserData"));
// Check for Empty LocalStorage, ex: First Time Users, Cleared LocalStorage
if (yummyPuddleJumpersUserData == null) {
    SaveUserData(resetData);
}

// Create UserContext
const UserContext = React.createContext();

// User Object
const userData = {
    email: yummyPuddleJumpersUserData.email,
    name: yummyPuddleJumpersUserData.name,
    token: yummyPuddleJumpersUserData.token,
    expiration: yummyPuddleJumpersUserData.expiration,
    isAuthenticated: function() {
        return (this.token == null || this.expiration < Date.now()) ? false : true
    }
}

// Reset User Object
const resetData = {
    email: null,
    name: null,
    token: null,
    expiration: null,
    isAuthenticated: function() {
        return (this.token == null || this.expiration < Date.now()) ? false : true
    }
}

// Export User Authentication
export { UserContext, userData, resetData, SaveUserData, Authorize };