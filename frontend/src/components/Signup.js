import React from 'react';
import Plate from '../assets/plate.svg';

const Signup = () => {
  return (
    <>
      <div className="container">
        <div className="block text-center my-4">
          <h1 className="font-bold">Create Profile (Signup)</h1>
        </div>

        <div class="md:grid md:grid-cols-2 md:gap-6 place-items-center">

          <div class="md:col-span-1 md:inline-block">
            <img src={Plate} alt="Drawing of a plate" className="object-contain h-64 w-full" />
          </div>

          <div className="md:col-span-1 w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="email"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="name"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="password"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password2" className="block text-gray-700 text-sm font-bold mb-2">Re-enter Password:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="password2"
                  />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow"
                  type="submit">
                  Submit
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-600 ml-4" href="/login">
                  Have an account? Log in
                </a>
              </div>
           
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
