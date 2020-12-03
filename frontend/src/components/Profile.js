// Import Resources
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Import Authentication
import { UserContext } from './Authentication/UserAuthentication';

const Profile = () => {

  // Create user from UserContext
  const [user, setUser] = useContext(UserContext);

  // Check for User's Authentication
  const history = useHistory();
  useEffect(() => {
    if (!user.isAuthenticated()) {
      history.push("/login");
    }
  });

  // Set Up States
  const [name, setName] = useState( (user.name) ? user.name : "" );

  return (
    <>
      <div className="container max-w-lg flex flex-col mx-auto">
        <h1 className="font-bold text-center my-4">Edit Profile</h1>
            <form className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              
          <div>
            <h2 className="font-bold text-center my-4">Update Name</h2>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">New Name:</label>
              <input
                className="input-field w-full focus:outline-none focus:shadow-outline"
                type="text"
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
                required
              />
            </div>
             
          </div>
                <button
                  className="purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                  type="submit">
                  Update
                </button>
            </form>
        <form className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="font-bold text-center my-4">Update Password</h2>
             
              <div>
                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
                <input
                  className="input-field w-full focus:outline-none focus:shadow-outline"
                  type="text"
                  id="newPassword"
                  placeholder="******"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="newPassword2" className="block text-gray-700 text-sm font-bold mb-2">Re-enter New Password:</label>
                <input
                  className="input-field w-full focus:outline-none focus:shadow-outline"
                  type="text"
                  id="newPassword2"
                  placeholder="******"
                />
              </div>
            
                <button
                  className="purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                  type="submit">
                  Update
                </button>
      
            </form>
          </div>
 
    </>
  );
}

export default Profile;
