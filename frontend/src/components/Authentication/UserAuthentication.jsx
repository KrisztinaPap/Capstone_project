// Import Resources
import React from 'react';

// Create UserContext
const UserContext = React.createContext();

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

// Get User Object from LocalStorage
let yummyPuddleJumpersUserData = JSON.parse(localStorage.getItem("yummyPuddleJumpersUserData"));
// Check for Empty LocalStorage, ex: First Time Users, Cleared LocalStorage
if (yummyPuddleJumpersUserData == null) {
    SaveUserData(resetData);
}

// User Object
const userData = {
    email: (yummyPuddleJumpersUserData) ? yummyPuddleJumpersUserData.email : null,
    name: (yummyPuddleJumpersUserData) ? yummyPuddleJumpersUserData.name : null,
    token: (yummyPuddleJumpersUserData) ? yummyPuddleJumpersUserData.token : null,
    expiration: (yummyPuddleJumpersUserData) ? yummyPuddleJumpersUserData.expiration : null,
    isAuthenticated: function() {
        return (this.token == null || this.expiration < Date.now()) ? false : true
    }
}

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

// Export User Authentication
export { UserContext, userData, resetData, SaveUserData };