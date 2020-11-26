import React, { Component } from 'react';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  render() {
    return (
      <header className="h-10">
        <nav className="ng-white border-bottom box-shadow mb-3 text-white bg-purple-500" light>
          <div className="container">
            <a href="/" className="text-white">PuddleJumpers App</a>
            <button onClick="#" className="mr-2 lg:hidden hover:bg-purple-600">
                <i className="fas fa-bars fa-lg"></i>
            </button>
            <div className="inline-flex" navbar>
              <ul>

                  <a className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" href="/index">Home</a>

                  <a className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" href="/dashboard">Dashboard</a>

                  <a className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" href="/login">Login</a>

                  <a className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" href="/signup">Signup</a>
 
                  <a className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" href="/profile">Edit Profile</a>

                  <a className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" href="/recipes">Recipes</a>

                  <a className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" href="/recipe">Recipe</a>

                  <a className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" href="/add-recipe">Add Recipe</a>
 
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
