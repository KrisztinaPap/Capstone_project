import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

// Import Assets
import Plate from '../assets/plate.svg';

const Login = () => {

  const {user, isAuthenticated, signin} = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();



  // Set Up States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    if(isAuthenticated()) {
      redirect();
    }
  });

  const redirect = () => {
    const locationState = location.state;
    const path = locationState ? locationState.from.pathname : '/dashboard';
    history.push(path);
  }

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

        // Check if Email is Too Long
        if (email.length >= 320) {
          // Set Error Message
          setErrorMessage("Email must be less than 320 characters.");
          DisplayErrorMessage(errorMessage);
        }

      }
      else {
        // Set Error
        setEmailValid(true);
        setError(false);
        setSubmitValid(true);
        // Set Error Message
        setErrorMessage("");

        // Check if Email is Too Long
        if (email.length >= 320) {
          // Set Error
          setEmailValid(false);
          setError(true);
          setSubmitValid(false);
          // Set Error Message
          setErrorMessage("Email must be less than 320 characters.");
          DisplayErrorMessage(errorMessage);
        }
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

        signin(response.data);
        redirect();
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
      if (error.response.status === 404) {
        history.push("/page404");
      }

      // 500 Error
      if (error.response.status === 500) {
        history.push("/page500");
      }
    });

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
            { (isAuthenticated()) ? `Welcome ${user.name}` : "Login" }
          </h1>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-6 place-items-center">

          <div className="md:col-span-1 md:inline-block">
            <img src={Plate} alt="Drawing of a plate" className="object-contain h-64 w-full"/>
          </div>

          <div className="md:col-span-1 w-full">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
