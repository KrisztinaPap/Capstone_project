import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import Authentication
import { UserContext, ResetUserData } from './Authentication/UserAuthentication';

function NavMenu() {

  // Create user from UserContext
  const user = useContext(UserContext);

  // Prepare to use useHistory for Logout Redirect
  const history = useHistory();

  // Set Up States
  const [authenticated, setAuthenticated] = useState(user.isAuthenticated());

  // Function to LogOut
  const LogOut = () => {
    // Reset UserData
    ResetUserData();

    // Change setAuthenticated State
    setAuthenticated(user.isAuthenticated());

    // Redirect to Login
    history.push("login");
  }

  // Function to Display LoggedIn Menu
  const LoggedInMenu = () => {
    return (
      <>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/dashboard">
          Dashboard
        </Link>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/recipes">
          Recipes
        </Link>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/add-recipe">
          Add a Recipe
        </Link>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/profile">
          Edit {user.name}'s Profile
        </Link>
        <Link className="transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-700 text-white py-1 px-4 rounded" onClick={LogOut}>
          Log Out
        </Link>
      </>
    );
  }

  // Function to Display LoggedOut Menu
  const LoggedOutMenu = () => {
    return (
      <>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/login">
          Login
        </Link>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/signup">
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <header className="h-10 bg-purple-500">
      <nav className="container mx-auto border-bottom box-shadow mb-3">
        <div className="flex justify-between content-center">
          <a href="/" className="white-link self-center p-2">PuddleJumpers App</a>
          <button className="mr-2 lg:hidden hover:bg-purple-600">
              <i className="fas fa-bars fa-lg"></i>
          </button>
          <div className="inline-flex">
            <ul>
              <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/">
                Home
              </Link>

              { (authenticated) ? LoggedInMenu() : LoggedOutMenu() }

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );

}

//Export Function
export default NavMenu;