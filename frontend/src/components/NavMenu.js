import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/scaleRotate'
import './NavMenu.css';

// Import Authentication
import { UserContext, resetData, SaveUserData } from './Authentication/UserAuthentication';

function NavMenu() {

  // Create user from UserContext
  const [user, setUser] = useContext(UserContext);

  // Function to LogOut
  const LogOut = () => {
    // Set User Context with Reset UserData
    setUser(resetData);
    // Save UserContext to LocalStorage
    SaveUserData(resetData);
  }

  // Function to Display LoggedIn Menu
  const LoggedInMenu = () => {
    return (
      <>
        <section>
          <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/dashboard">
            Dashboard
          </Link>
        </section>
        <section>
          <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/recipes">
            Recipes
          </Link>
        </section>
        <section>
          <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/add-recipe">
            Add a Recipe
          </Link>
        </section>
        <section>
          <hr className="mb-2"/>
          <p>You are logged in as: {user.name}</p>
          </section>
        <section>
          <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/profile">
            Edit Profile
          </Link>
        </section>
        <section>
          <button className="m-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-700 text-white py-1 px-4 rounded" onClick={LogOut}>
            Log Out
          </button>
        </section>
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
    <Menu
      pageWrapId={'page-wrap'}
      outerContainerId={'outer-container'}
    >
      <header>Site Navigation</header>
      <section>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/">
          Home
        </Link>
      </section>
      { (user.isAuthenticated()) ? LoggedInMenu() : LoggedOutMenu() }
    </Menu>
  );

}

//Export Function
export default NavMenu;
