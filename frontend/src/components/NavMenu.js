import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/scaleRotate'
import './NavMenu.css';

import { AuthContext } from '../contexts/AuthContext';

function NavMenu() {

  const location = useLocation();
  const {user, isAuthenticated, signout} = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState();

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  }

  const linkClasses = (path) => {
    return `white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline ${activeClasses(path)}`;
  }

  const activeClasses = (path) => {
    if(path.toLowerCase() === location.pathname.toLowerCase()) {
      return 'underline';
    }
    return '';
  }

  // Function to Display LoggedIn Menu
  const LoggedInMenu = () => {
    return (
      <>
        <Link
          className={linkClasses("/mealplan")}
          to="/mealplan"
          onClick={closeMenu}
        >
          Meal Plan
        </Link>

        <Link
          className={linkClasses("/recipes")}
          to="/recipes"
          onClick={closeMenu}
        >
          Recipes
        </Link>

        <Link
          className={linkClasses("/add-recipe")}
          to="/add-recipe"
          onClick={closeMenu}
        >
          Add a Recipe
        </Link>

        <hr className="mb-2"/>
        <p>You are logged in as: {user.name}</p>

        <Link
          className={linkClasses("/profile")}
          to="/profile"
          onClick={closeMenu}
        >
          Edit Profile
        </Link>

        <button
          className="m-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-500 hover:bg-purple-700 text-white py-1 px-4 rounded"
          onClick={() => { signout(); closeMenu(); }}
        >
          Log Out
        </button>
      </>
    );
  }

  // Function to Display LoggedOut Menu
  const LoggedOutMenu = () => {
    return (
      <>
        <Link
          className={linkClasses("/login")}
          to="/login"
          onClick={closeMenu}
        >
          Login
        </Link>
        <Link
          className={linkClasses("/signup")}
          to="/signup"
          onClick={closeMenu}
        >
          Sign Up
        </Link>
      </>
    );
  }


  const styles = {
    bmBurgerButton: {
      position: 'absolute',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
  }

  return (
    <Menu
      pageWrapId={'page-wrap'}
      outerContainerId={'outer-container'}
      isOpen={menuOpen}
      onStateChange={(state) => { handleStateChange(state) }}
      styles={styles}
      disableAutoFocus
    >
      <header>Site Navigation</header>
      <Link
        className={linkClasses("/")}
        to="/"
        onClick={closeMenu}
      >
        Home
      </Link>

      { (isAuthenticated()) ? LoggedInMenu() : LoggedOutMenu() }
    </Menu>
  );

}

//Export Function
export default NavMenu;
