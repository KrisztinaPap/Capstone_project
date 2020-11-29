// Import React
import React from 'react';

// Create UserContext
const UserContext = React.createContext();

// User Object to be Stored in UserContext
const UserData = {
    email: null,
    name: null,
    token: null,
    expiry: null
}

// Export User Authentication
export { UserContext, UserData };