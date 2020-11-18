import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    <>
      <div className="container">
        <div className="block text-center my-4"> 
          <h1 className="font-bold">Login</h1>
        </div>
        <div className="w-full max-w-xs mx-auto">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="email"
                />
             </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="password"
                />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow"
                type="submit">
                Submit
              </button>
              <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-600">
                No account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
