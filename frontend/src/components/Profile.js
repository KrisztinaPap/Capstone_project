import React, { useContext, useState } from 'react';
import {AuthContext} from '../contexts/AuthContext';
import axios from 'axios';

const Profile = () => {

  const {user, updateName} = useContext(AuthContext);

  // Set Up States
  const [name, setName] = useState( (user.name) ? user.name : "" );
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [loadingUpdateName, setLoadingUpdateName] = useState(false);
  const [errorUpdateName, setErrorUpdateName] = useState(false);
  const [errorMessageUpdateName, setErrorMessageUpdateName] = useState("");
  const [errorsArrayUpdateName, setErrorsArrayUpdateName] = useState([]);
  const [successUpdateName, setSuccessUpdateName] = useState(false);
  const [successMessageUpdateName, setSuccessMessageUpdateName] = useState("");

  const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false);
  const [errorUpdatePassword, setErrorUpdatePassword] = useState(false);
  const [errorMessageUpdatePassword, setErrorMessageUpdatePassword] = useState("");
  const [errorsArrayUpdatePassword, setErrorsArrayUpdatePassword] = useState([]);
  const [successUpdatePassword, setSuccessUpdatePassword] = useState(false);
  const [successMessageUpdatePassword, setSuccessMessageUpdatePassword] = useState("");

  const [nameValid, setNameValid] = useState(true);
  const [submitNameValid, setSubmitNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [password2Valid, setPassword2Valid] = useState(true);
  const [submitPasswordValid, setSubmitPasswordValid] = useState(true);

  // Function to Validate Input
  const ValidateInputName = () => {

    // Only Validate On Name Input
    if (name) {

      // Check If Name is Valid
      if (name.length <= 1) {
        // Set Error
        setNameValid(false);
        setErrorUpdateName(true);
        setSubmitNameValid(false);
        // Set Error Message
        setErrorMessageUpdateName("Name must be more than 1 character.");
        DisplayErrorMessageUpdateName(errorMessageUpdateName, errorsArrayUpdateName);
      }
      else {
        // Set Error
        setNameValid(true);
        setErrorUpdateName(false);
        setSubmitNameValid(true);
        // Set Error Message
        setErrorMessageUpdateName("");
      }

    }

  }

  // Function to Validate Input
  const ValidateInputPassword = () => {
    // Reset errorsArray
    setErrorsArrayUpdatePassword([]);
    let errorList = [];

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

      // Check Passwords Contains Captial Letter
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
        errorList[errorList.length] = "Password must be have at least an alphanumeric character.";
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
    setErrorsArrayUpdatePassword(errorList);

    // Check errorsArray
    if (errorList.length > 0) {
      // Set Errors
      setErrorUpdatePassword(true);
      setSubmitPasswordValid(false);
      // Set Error Message
      setErrorMessageUpdatePassword("Invalid Input");
      DisplayErrorMessageUpdatePassword(errorMessageUpdatePassword, errorsArrayUpdatePassword);
    }
    else {
      // Set Errors
      setErrorUpdatePassword(false);
      setSubmitPasswordValid(true);
      // Set Error Message
      setErrorMessageUpdatePassword("");
      setErrorsArrayUpdatePassword([]);
    }

  }

  // Function to Handle Submit of the Update Name Form
  const UpdateNameSubmit = async(event) => {

    // Prevent Form Refresh
    event.preventDefault();

    // Set Loading
    setLoadingUpdateName(true);

    if (!nameValid || !submitNameValid) {
      // Set Loading
      setLoadingUpdateName(false);

      // Set Errors
      setErrorUpdateName(true);
      // Set Error Message
      setErrorMessageUpdateName("Name must be more than 1 character.");

      // Break Function
      return false;
    }

    // Axios Request
    axios
    .put(
      'api/authenticate/update/name', {
      data: {
        Username: user.email,
        Name: name
      },
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then(response => {
      if (response.data.status === "Success") {
        // Reset Errors
        setErrorUpdateName(false);
        setErrorMessageUpdateName("");

        // Set Loading
        setLoadingUpdateName(false);

        // Set Success
        setSuccessUpdateName(true);
        // Set Success Message
        setSuccessMessageUpdateName(response.data.message);

        // Reset Form Fields
        setName(name);

        // Updates the logged in users name
        updateName(name);
      }
    })
    .catch(error => {
      if (error.response.data.status === "Error") {
        // Set Errors
        setErrorUpdateName(true);

        // Set Loading
        setLoadingUpdateName(false);

        // Set Error Message
        setErrorMessageUpdateName(error.response.data.message);
        
        if (error.response.data.errorList) {
          setErrorsArrayUpdateName(error.response.data.errorList);
        }

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

  // Function to Handle Submit of the Update Password Form
  const UpdatePasswordSubmit = async(event) => {

    // Prevent Form Refresh
    event.preventDefault();

    // Set Loading
    setLoadingUpdatePassword(true);

    // Check for Password Length
    if (password.length <= 6) {
      // Set Loading
      setLoadingUpdatePassword(false);

      // Set Errors
      setErrorUpdatePassword(true);
      // Set Error Message
      setErrorMessageUpdatePassword("Password must be more than 6 characters.");

      // Break Function
      return false;
    }

    // Check if Password Contains a Number
    const regexPasswordNumberTest = /\d/;
    if (!regexPasswordNumberTest.test(password)) {
      // Set Loading
      setLoadingUpdatePassword(false);

      // Set Errors
      setErrorUpdatePassword(true);
      // Set Error Message
      setErrorMessageUpdatePassword("Password must be have at least a number.");

      // Break Function
      return false;
    }

    // Check if Password Contains an AlphaNumeric Character
    const regexPasswordAlphaNumericTest = /[^A-Za-z0-9]/;
    if (!regexPasswordAlphaNumericTest.test(password)) {
      // Set Loading
      setLoadingUpdatePassword(false);

      // Set Errors
      setErrorUpdatePassword(true);
      // Set Error Message
      setErrorMessageUpdatePassword("Password must be have at least an alphanumeric character.");

      // Break Function
      return false;
    }

    // Check If Passwords Match
    if (password !== password2) {
      // Set Loading
      setLoadingUpdatePassword(false);

      // Set Errors
      setErrorUpdatePassword(true);
      // Set Error Message
      setErrorMessageUpdatePassword("Passwords do not match.");

      // Break Function
      return false;
    }

    // Axios Request
    axios
    .put(
      'api/authenticate/update/password', {
        data: {
          Username: user.email,
          Password: password
        },
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
    .then(response => {
      if (response.data.status === "Success") {
        // Reset Errors
        setErrorUpdatePassword(false);
        setErrorMessageUpdatePassword("");

        // Set Loading
        setLoadingUpdatePassword(false);

        // Set Success
        setSuccessUpdatePassword(true);
        // Set Success Message
        setSuccessMessageUpdatePassword(response.data.message);

        // Reset Form Fields
        setPassword("");
        setPassword2("");
      }
    })
    .catch(error => {
      if (error.response.data.status === "Error") {
        // Set Errors
        setErrorUpdatePassword(true);

        // Set Loading
        setLoadingUpdatePassword(false);

        // Set Error Message
        setErrorMessageUpdatePassword(error.response.data.message);

        if (error.response.data.errorList) {
          setErrorsArrayUpdatePassword(error.response.data.errorList);
        }
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

  // Function to Display Error Message
  const DisplayErrorMessageUpdateName = (message, errors) => {
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
  const DisplaySuccessMessageUpdateName = (message) => {
    return(
      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-green-100 bg-green-700 border border-green-700">
        <div className="text-xl font-normal max-w-full flex-initial">
          <i className="fas fa-exclamation-circle mr-4"></i>
          {message}
        </div>
      </div>
    );
  }

  // Function to Display Error Message
  const DisplayErrorMessageUpdatePassword = (message, errors) => {
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
  const DisplaySuccessMessageUpdatePassword = (message) => {
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
      <div className="container max-w-lg flex flex-col mx-auto">
        <h1 className="font-bold text-center my-4">Edit Profile</h1>
        <form className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={UpdateNameSubmit}>
          <div>
            <h2 className="font-bold text-center my-4">Update Name</h2>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">New Name:</label>
              <input
                className={ "input-field w-full focus:outline-none focus:shadow-outline " + (!nameValid ? "border-red-600" : "") }
                type="text"
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
                onBlur={ValidateInputName}
                required
              />
            </div>
          </div>
          <button
            className={ "purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline " + (!submitNameValid ? "opacity-50 cursor-not-allowed" : "") }
            type="submit"
            disabled={ !submitNameValid }
          >
            Update
          </button>

          {loadingUpdateName ? <i className="fas fa-spinner fa-spin"></i> : null}
          {errorUpdateName ? DisplayErrorMessageUpdateName(errorMessageUpdateName, errorsArrayUpdateName) : null}
          {successUpdateName ? DisplaySuccessMessageUpdateName(successMessageUpdateName) : null}

        </form>
        <form className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={UpdatePasswordSubmit}>
          <h2 className="font-bold text-center my-4">Update Password</h2>
          <div>
            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
            <input
              className={ "input-field w-full focus:outline-none focus:shadow-outline " + (!passwordValid ? "border-red-600" : "") }
              type="password"
              id="newPassword"
              placeholder="******"
              value={password}
              onChange={event => setPassword( event.target.value )}
              onBlur={ValidateInputPassword}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="newPassword2" className="block text-gray-700 text-sm font-bold mb-2">Re-enter New Password:</label>
            <input
              className={ "input-field w-full focus:outline-none focus:shadow-outline " + (!password2Valid ? "border-red-600" : "") }
              type="password"
              id="newPassword2"
              placeholder="******"
              value={password2}
              onChange={event => setPassword2( event.target.value )}
              onBlur={ValidateInputPassword}
              required
            />
          </div>
          <button
            className={ "purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline " + (!submitPasswordValid ? "opacity-50 cursor-not-allowed" : "") }
            type="submit"
            disabled={ !submitPasswordValid }
          >
            Update
          </button>

          {loadingUpdatePassword ? <i className="fas fa-spinner fa-spin"></i> : null}
          {errorUpdatePassword ? DisplayErrorMessageUpdatePassword(errorMessageUpdatePassword, errorsArrayUpdatePassword) : null}
          {successUpdatePassword ? DisplaySuccessMessageUpdatePassword(successMessageUpdatePassword) : null}

        </form>
      </div>
    </>
  );
}

export default Profile;
