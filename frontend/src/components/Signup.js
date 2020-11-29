import React, { useContext } from 'react';

import Plate from '../assets/plate.svg';
import { Link } from 'react-router-dom';

// Import Authentication
import { UserContext } from './Authentication/UserAuthentication';

const Signup = () => {
  
  // Create user from UserContext
  const user = useContext(UserContext);
  
  return (
    <>
      <div className="container">
        <div className="block text-center my-4">
          <h1 className="font-bold">Create Profile (Signup)</h1>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-6 place-items-center">

          <div className="md:col-span-1 md:inline-block">
            <img src={Plate} alt="Drawing of a plate" className="object-contain h-64 w-full" />
          </div>

          <div className="md:col-span-1 w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input
                  className="input-field w-full focus:outline-none focus:shadow-outline"
                  type="text"
                  id="email"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                  className="input-field w-full focus:outline-none focus:shadow-outline"
                  type="text"
                  id="name"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input
                  className="input-field w-full focus:outline-none focus:shadow-outline"
                  type="text"
                  id="password"
                />

              </div>
              <div className="mb-6">
                <label htmlFor="password2" className="block text-gray-700 text-sm font-bold mb-2">Re-enter Password:</label>
                <input
                  className="input-field w-full focus:outline-none focus:shadow-outline"
                  type="text"
                  id="password2"
                  />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                  type="submit">
                  Submit
                </button>
                <Link className="purple-link hover:text-purple-600" to="/login">
                  Have an account? Log in
                </Link>
              </div>
           
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
