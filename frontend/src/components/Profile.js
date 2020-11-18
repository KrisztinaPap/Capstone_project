import React from 'react';

const Profile = () => {
  return (
    <>
      <div className="container">
        <div className="block text-center my-4">
          <h1 className="font-bold">Edit Profile</h1>
        </div>
        <div className="w-full max-w-xs mx-auto">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Current Password:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="password"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">New Name:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="name"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="newPassword"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="newPassword2" className="block text-gray-700 text-sm font-bold mb-2">Re-enter New Password:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="newPassword2"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow"
                type="submit">
                Update
            </button>
              <a class="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-600 ml-4 mr-3" href="/signup">
                No account? Sign up
            </a>
            </div>
             
          </form>
        </div>
        </div>
    </>
  );
}

export default Profile;
