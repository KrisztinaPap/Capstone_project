// Import Resources
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

// Import Assets
import Plate from '../assets/plate.svg';

// Import Authentication
import { UserContext, resetData, SaveUserData } from './Authentication/UserAuthentication';

// Login Component
const Login = () => {

  // Create user from UserContext
  const [user, setUser] = useContext(UserContext);

  // Prepare for History Redirect
  const history = useHistory();

  // Set Up States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [submitValid, setSubmitValid] = useState(true);

  // Function to Validate Input
  const ValidateInput = () => {

    // Only Validate On Email Input
    if (email) {

      // Check if Email is Valid
      const regexEmailTest = /\S+@\S+\.\S+/;
      if (!regexEmailTest.test(email)) {
        // Set Error
        setEmailValid(false);
        setError(true);
        setSubmitValid(false);
        // Set Error Message
        setErrorMessage("Invalid Email.");
        DisplayErrorMessage(errorMessage);
      }
      else {
        // Set Error
        setEmailValid(true);
        setError(false);
        setSubmitValid(true);
        // Set Error Message
        setErrorMessage("");
      }

    }

  }

  // Function to Handle Submit of the Signup Form
  const LoginSubmit = async(event) => {

    // Prevent Form Refresh
    event.preventDefault();

    // Set Loading
    setLoading(true);

    // Reset Errors
    setError(false);
    setSuccess(false);
    setErrorMessage("");
    setSuccessMessage("");

    if (!emailValid || !submitValid) {
      // Set Loading
      setLoading(false);

      // Set Errors
      setError(true);
      // Set Error Message
      setErrorMessage("Invalid Input");
      DisplayErrorMessage(errorMessage);

      // Break Action
      return false;
    }

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
        // Set Loading
        setLoading(false);

        // Set Success
        setSuccess(true);
        // Set Success Message
        setSuccessMessage("Authorized");

        // Set UserContext
        const userData = {
          email: response.data.email,
          name: response.data.name,
          token: response.data.token,
          expiration: response.data.expiration,
          isAuthenticated: function() {
              return (this.token == null || this.expiration < Date.now()) ? false : true
          }
        }
        setUser(userData);
        // Save UserContext to LocalStorage
        SaveUserData(userData);

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
        setErrorMessage(error.response.data.title);
  
        // Break Function
        return false;
      }
      
      // 404 Error
      if (error.response.status == 404) {
        history.push("/page404");
      }

      // 500 Error
      if (error.response.status == 500) {
        history.push("/page500");
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
            className={ "input-field w-full focus:outline-none focus:shadow-outline " + (!emailValid ? "border-red-600" : "") }
            type="text"
            id="email"
            value={email}
            onChange={event => setEmail( event.target.value )}
            onBlur={ValidateInput}
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
            className={ "purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline " + (!submitValid ? "opacity-50 cursor-not-allowed" : "") }
            type="submit"
            disabled={ !submitValid }
          >
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
    // Set User Context with Reset UserData
    setUser(resetData);
    // Save UserContext to LocalStorage
    SaveUserData(resetData);
    
    // Set Success
    setSuccess(true);
    // Set Success Message
    setSuccessMessage("Logged Out");
  }

  // Function to Display LoggedIn User Info and Action
  const LoggedInDisplay = () => {
    return (
      <>
        <div className="card-body p-4">
          <div className="btn-group">
            <div className="block py-5 px-4">
              {user.name}, What would you like to do?
            </div>
            <Link className="mb-1 block transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 mr-4 rounded" to="/dashboard">
              See my dashboard
            </Link>
            <Link className="mb-1 block transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 mr-4 rounded" to="/recipes">
              See my recipe list
            </Link>
            <Link className="mb-1 block transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 mr-4 rounded" to="/add-recipe">
              Add a recipe
            </Link>
            <Link className="mb-1 block transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 mr-4 rounded" to="/profile">
              Edit my profile
            </Link>
            <button className="mb-1 block transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 mr-4 rounded" onClick={LogOut}>
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
            { (user.isAuthenticated()) ? `Welcome ${user.name}` : "Login" }
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
