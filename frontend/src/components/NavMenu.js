import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  render() {
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
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
