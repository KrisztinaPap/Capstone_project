import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/scaleRotate'
import './NavMenu.css';

import { AuthContext } from '../contexts/AuthContext';

function NavMenu() {

  // Create user from UserContext
  const {user, isAuthenticated, signout} = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState();

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  }

  // Function to Display LoggedIn Menu
  const LoggedInMenu = () => {
    return (
      <>
        <section>
          <Link
            className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline"
            to="/dashboard"
            onClick={closeMenu}
          >
            Dashboard
          </Link>
        </section>
        <section>
          <Link
            className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline"
            to="/recipes"
            onClick={closeMenu}
          >
            Recipes
          </Link>
        </section>
        <section>
          <Link
            className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline"
            to="/add-recipe"
            onClick={closeMenu}
          >
            Add a Recipe
          </Link>
        </section>
        <section>
          <hr className="mb-2"/>
          <p>You are logged in as: {user.name}</p>
          </section>
        <section>
          <Link
            className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline"
            to="/profile"
            onClick={closeMenu}
          >
            Edit Profile
          </Link>
        </section>
        <section>
          <button
            className="m-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-700 text-white py-1 px-4 rounded"
            onClick={() => { signout(); closeMenu(); }}
          >
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
        <Link
          className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline"
          to="/login"
          onClick={closeMenu}
        >
          Login
        </Link>
        <Link
          className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline"
          to="/signup"
          onClick={closeMenu}
        >
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <Menu
      pageWrapId={'page-wrap'}
      outerContainerId={'outer-container'}
      isOpen={menuOpen}
      onStateChange={(state) => { handleStateChange(state) }}
    >
      <header>Site Navigation</header>
      <section>
        <Link
          className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline"
          to="/"
          onClick={closeMenu}
        >
          Home
        </Link>
      </section>
      { (isAuthenticated()) ? LoggedInMenu() : LoggedOutMenu() }
    </Menu>
  );

}

//Export Function
export default NavMenu;
