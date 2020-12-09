// Import Resources
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

// Import Assets
import Plate from '../assets/plate.svg';

// Signup Component
const Signup = () => {

  // Prepare for History Redirect
  const history = useHistory();

  // Set Up States
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorsArray, setErrorsArray] = useState([]);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [password2Valid, setPassword2Valid] = useState(true);
  const [submitValid, setSubmitValid] = useState(true);

  // Function to Validate Input
  const ValidateInput = () => {
    // Reset errorsArray
    setErrorsArray([]);
    let errorList = [];

    // Only Validate On Email Input
    if (email) {

      // Check if Email is Valid
      const regexEmailTest = /\S+@\S+\.\S+/;
      if (!regexEmailTest.test(email)) {
        // Set Error
        setEmailValid(false);
        // Set Error Message
        errorList[errorList.length] = "Invalid Email.";
      }
      else {
        // Set Error
        setEmailValid(true);
      }

      // Check if Email is Too Long
      if (email.length >= 320) {
        // Set Error
        setEmailValid(false);
        // Set Error Message
        errorList[errorList.length] = "Email must be less than 320 characters.";
      }
      else {
        // Set Error
        setEmailValid(true);
      }

    }

    // Only Validate On Name Input
    if (name) {

      // Check If Name is Valid
      if (name.length <= 1) {
        // Set Error
        setNameValid(false);
        // Set Error Message
        errorList[errorList.length] = "Name must be more than 1 character.";
      }
      else {
        // Set Error
        setNameValid(true);
      }

    }

    // Only Validate On Password Input
    if (password) {

      // Check Passwords Length
      if (password.length <= 5) {
        // Set Error
        setPasswordValid(false);
        // Set Error Message
        errorList[errorList.length] = "Password must be more than 5 characters.";
      }
      else {
        // Set Error
        setPasswordValid(true);
      }

      // Check Passwords Contains Capital Letter
      if (password.toLowerCase() === password) {
        // Set Error
        setPasswordValid(false);
        // Set Error Message
        errorList[errorList.length] = "Password must have at least a capital letter.";
      }
      else {
        // Set Error
        setPasswordValid(true);
      }

      // Check if Password Contains a Number
      const regexPasswordNumberTest = /\d/;
      if (!regexPasswordNumberTest.test(password)) {
        // Set Error
        setPasswordValid(false);
        // Set Error Message
        errorList[errorList.length] = "Password must have at least a number.";
      }
      else {
        // Set Error
        setPasswordValid(true);
      }

      // Check if Password Contains an AlphaNumeric Character
      const regexPasswordAlphaNumericTest = /[^A-Za-z0-9]/;
      if (!regexPasswordAlphaNumericTest.test(password)) {
        // Set Error
        setPasswordValid(false);
        // Set Error Message
        errorList[errorList.length] = "Password must have at least an alphanumeric character.";
      }
      else {
        // Set Error
        setPasswordValid(true);
      }

    }

    // Only Validate On Password2 Input
    if (password2) {

      // Check If Passwords Match
      if (password !== password2) {
        // Set Error
        setPassword2Valid(false);
        // Set Error Message
        errorList[errorList.length] = "Passwords do not match.";
      }
      else {
        // Set Error
        setPassword2Valid(true);
      }

    }

    // Add Error Message to State
    setErrorsArray(errorList);

    // Check errorsArray
    if (errorList.length > 0) {
      // Set Errors
      setError(true);
      setSubmitValid(false);
      // Set Error Message
      setErrorMessage("Invalid Input");
      DisplayErrorMessage(errorMessage, errorsArray);
    }
    else {
      // Set Errors
      setError(false);
      setSubmitValid(true);
      // Set Error Message
      setErrorMessage("");
      setErrorsArray([]);
    }
  }

  // Function to Handle Submit of the Signup Form
  const SignupSubmit = async(event) => {

    // Prevent Form Refresh
    event.preventDefault();

    // Set Loading
    setLoading(true);

    // Reset Errors
    setError(false);
    setErrorMessage("");
    setErrorsArray([]);

    if (!emailValid || !nameValid || !passwordValid || !password2Valid || !submitValid) {
      // Set Loading
      setLoading(false);

      // Set Errors
      setError(true);
      // Set Error Message
      setErrorMessage("Invalid Input");
      DisplayErrorMessage(errorMessage, errorsArray);

      // Break Action
      return false;
    }

    // Axios Request
    axios
    .post(
      'api/authenticate/register',
      {
        Name: name,
        Email: email,
        Username: email,
        Password: password
      }
    )
    .then(response => {
      if (response.data.status === "Success") {
        // Reset Errors
        setError(false);
        setErrorMessage("");
        setErrorsArray([]);

        // Set Loading
        setLoading(false);

        // Set Success
        setSuccess(true);
        // Set Success Message
        setSuccessMessage(response.data.message);

        // Reset Form Fields
        setName("");
        setEmail("");
        setPassword("");
        setPassword2("");

        // Redirect to Login
        history.push("/login");
      }
    })
    .catch(error => {
      if (error.response.data.status === "Error") {
        // Set Errors
        setError(true);

        // Set Loading
        setLoading(false);

        // Set Error Message
        setErrorMessage(error.response.data.message);
        if (error.response.data.errorList) {
          setErrorsArray(error.response.data.errorList);
        }

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
  const DisplayErrorMessage = (message, errors) => {
    return(
      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-100 bg-red-700 border border-red-700">
        <div className="text-xl font-normal max-w-full flex-initial">
          <i className="fas fa-exclamation-circle mr-4"></i>
          {message}
          <ul className="px-6 list-disc">
            {
              errors.map((errMsg, index) => (
                <li key={index}>
                    {errMsg}
                </li>
              ))
            }
          </ul>
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
          <h1 className="font-bold">Signup</h1>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-6 place-items-center">

          <div className="md:col-span-1 md:inline-block">
            <img src={Plate} alt="Drawing of a plate" className="object-contain h-64 w-full" />
          </div>

          <div className="md:col-span-1 w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={SignupSubmit}>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
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
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                  className={ "input-field w-full focus:outline-none focus:shadow-outline " + (!nameValid ? "border-red-600" : "") }
                  type="text"
                  id="name"
                  value={name}
                  onChange={event => setName( event.target.value )}
                  onBlur={ValidateInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input
                  className={ "input-field w-full focus:outline-none focus:shadow-outline " + (!passwordValid ? "border-red-600" : "") }
                  type="password"
                  id="password"
                  value={password}
                  onChange={event => setPassword( event.target.value )}
                  onBlur={ValidateInput}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password2" className="block text-gray-700 text-sm font-bold mb-2">Re-enter Password:</label>
                <input
                  className={ "input-field w-full focus:outline-none focus:shadow-outline " + (!password2Valid ? "border-red-600" : "") }
                  type="password"
                  id="password2"
                  value={password2}
                  onChange={event => setPassword2( event.target.value )}
                  onBlur={ValidateInput}
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
                <Link className="purple-link hover:text-purple-600" to="/login">
                  Have an account? Log in
                </Link>
              </div>

              {loading ? <i className="fas fa-spinner fa-spin"></i> : null}
              {error ? DisplayErrorMessage(errorMessage, errorsArray) : null}
              {success ? DisplaySuccessMessage(successMessage) : null}

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
