import React, { useContext } from 'react';
import { UserContext } from '.././App';
import { Link } from 'react-router-dom';
import Plate from '../assets/plate.svg';


const Login = () => {
  const user = useContext(UserContext); 

  return (
    <>
      <div className="container">
        <div className="block text-center my-4"> 
          <h1 className="font-bold">Login</h1>
          <p>Current user: {user}</p>
        </div>
        <div class="md:grid md:grid-cols-2 md:gap-6 place-items-center">

          <div class="md:col-span-1 md:inline-block">
            <img src={Plate} alt="Drawing of a plate" className="object-contain h-64 w-full"/>
          </div>

          <div className="md:col-span-1 w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 justify-center align-middle">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold my-2">Email:</label>
                <input
                  className="input-field w-full focus:outline-none focus:shadow-outline"
                  type="text"
                  id="email"
                  />
               </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold my-2">Password:</label>
                <input
                  className="input-field w-full focus:outline-none focus:shadow-outline"
                  type="text"
                  id="password"
                  />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                  type="submit">
                  Submit
                </button>
                <Link className="purple-link hover:text-purple-600" to="/signup">
                  No account? Sign up
                </Link>
              </div>
              </form>
          </div>
        </div>
        </div>
    </>
  );
}

export default Login;
