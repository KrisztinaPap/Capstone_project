// Import Resources
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

// Import Assets
import Plate from '../assets/plate.svg';

// Import Authentication
import { UserContext, ResetUserData } from './Authentication/UserAuthentication';

// Login Component
const Login = () => {

  // Create user from UserContext
  const user = useContext(UserContext);

  // Prepare to use useHistory for Logout Redirect
  const history = useHistory();

  // Set Up States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to Handle Submit of the Signup Form
  const LoginSubmit = async(event) => {

    // Prevent Form Refresh
    event.preventDefault();

    // Set Loading
    setLoading(true);

    // Axios Request
    axios
    .post(
      'api/authenticate/login',
      {
        Username: email,
        Password: password
      }
    )
    .then(response => {
      if (response.data.token) {
        // Reset Errors
        setError(false);
        setErrorMessage("");

        // Set Loading
        setLoading(false);

        // Set Success
        setSuccess(true);
        // Set Success Message
        setSuccessMessage("Authorized");

        // Set UserContext
        user.email = response.data.email;
        user.name = response.data.name;
        user.token = response.data.token;
        user.expiration = response.data.expiration;

        // Reset Form Fields
        setEmail("");
        setPassword("");
      }
    })
    .catch(error => {
      if (error.response.data.status === 401) {
        // Set Errors
        setError(true);

        // Set Loading
        setLoading(false);
  
        // Set Error Message
        let errorMessageString = error.response.data.title;
        setErrorMessage(errorMessageString);
  
        // Break Function
        return false;
      }
    });

  }

  // Function to Display Login Form
  const LoginForm = () => {
    return (
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 justify-center align-middle" onSubmit={LoginSubmit}>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold my-2">Email:</label>
          <input
            className="input-field w-full focus:outline-none focus:shadow-outline"
            type="text"
            id="email"
            value={email}
            onChange={event => setEmail( event.target.value )}
            required
            />
          </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold my-2">Password:</label>
          <input
            className="input-field w-full focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            value={password}
            onChange={event => setPassword( event.target.value )}
            required
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

        {loading ? <i className="fas fa-spinner fa-spin"></i> : null}
        {error ? DisplayErrorMessage(errorMessage) : null}
        {success ? DisplaySuccessMessage(successMessage) : null}

      </form>
    );
  }

  // Function to LogOut
  const LogOut = () => {
    // Reset UserData
    ResetUserData();
    
    // Set Success State to false in Preparation for Next Login
    // Set Success
    setSuccess(false);
    // Set Success Message
    setSuccessMessage("");
    
    // Redirect to Login
    history.push("login");
  }

  // Function to Display LoggedIn User Info and Action
  const LoggedInDisplay = () => {
    return (
      <>
        <div className="card-body p-4">
          <div className="btn-group">
            <div className="text-purple-700 py-5 px-4">
              {user.name}
            </div>
            <Link className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 mr-4 rounded" to="/profile">
              Edit Profile
            </Link>
            <button className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-600 text-white py-1 px-4 rounded" onClick={LogOut}>
              Log Out
            </button>
          </div>
        </div>
      </>
    );
  }

  // Function to Display Error Message
  const DisplayErrorMessage = (message) => {
    return(
      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-100 bg-red-700 border border-red-700">
        <div className="text-xl font-normal max-w-full flex-initial">
          <i className="fas fa-exclamation-circle mr-4"></i>
          {message}
        </div>
      </div>
    );
  }

  // Function to Display Success Message
  const DisplaySuccessMessage = (message) => {
    return(
      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-green-100 bg-green-700 border border-green-700">
        <div className="text-xl font-normal max-w-full flex-initial">
          <i className="fas fa-exclamation-circle mr-4"></i>
          {message}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="block text-center my-4"> 
          <h1 className="font-bold">
            { (user.isAuthenticated()) ? "Welcome" : "Login" }
          </h1>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-6 place-items-center">

          <div className="md:col-span-1 md:inline-block">
            <img src={Plate} alt="Drawing of a plate" className="object-contain h-64 w-full"/>
          </div>

          <div className="md:col-span-1 w-full">
            { (user.isAuthenticated()) ? LoggedInDisplay() : LoginForm() }
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
