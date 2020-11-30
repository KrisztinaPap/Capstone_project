// Import Resources
import React, { useContext, useState } from 'react';

// Import Assets
import Plate from '../assets/plate.svg';

// Import Authentication
import { UserContext, Authorize } from './Authentication/UserAuthentication';

const Profile = () => {

  // Create user from UserContext
  const user = useContext(UserContext);

  // Check for User's Authentication
  Authorize();

  // Set Up States
  const [name, setName] = useState( (user.name) ? user.name : "" );

  return (
    <>
      <div className="container">

        <div className="block text-center my-4">
          <h1 className="font-bold">Edit Profile</h1>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-6 place-items-center">

          <div className="md:col-span-1 md:inline-block">
            <img src={Plate} alt="Drawing of a plate" className="object-contain h-64 w-full" />
          </div>

          <div className="w-full mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Current Password:</label>
                <input
                  className="input-field w-full focus:outline-none focus:shadow-outline"
                  type="text"
                  id="password"
                  placeholder="******"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">New Name:</label>
                <input
                  className="input-field w-full focus:outline-none focus:shadow-outline"
                  type="text"
                  id="name"
                  value={name}
                  onChange={event => setName( event.target.value )}
                  required
                />
              </div>
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
              <div className="flex items-center justify-between">
                <button
                  className="purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                  type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
