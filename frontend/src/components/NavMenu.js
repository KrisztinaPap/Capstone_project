import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/scaleDown'
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  render() {
    return (
      <Menu
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
      >
        <header>Site Navigation</header>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/index">
          Home
        </Link>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/dashboard">
          Dashboard
        </Link>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/login">
          Login
        </Link>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/signup">
          Sign Up
        </Link>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/profile">
          Edit Profile
        </Link>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/recipes">
          Recipes
        </Link>
        <Link className="white-link hover:bg-purple-700 hover:font-bold focus:outline-none focus:shadow-outline" to="/add-recipe">
          Add a Recipe
        </Link>
      </Menu>
    );
  }
}
