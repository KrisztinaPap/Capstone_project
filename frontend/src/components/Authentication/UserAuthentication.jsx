// Import Resources
import React from 'react';

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

// Export User Authentication
export { UserContext, UserData, ResetUserData };