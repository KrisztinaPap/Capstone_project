import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-lg navbar-toggleable-lg ng-white border-bottom box-shadow mb-3 text-white bg-purple-500" light>
          <Container>
            <NavbarBrand tag={Link} to="/" className="text-white">PuddleJumpers App</NavbarBrand>
            <button onClick={this.toggleNavbar} className="mr-2 lg:hidden hover:bg-purple-600">
                <i className="fas fa-bars fa-lg"></i>
            </button>
            <Collapse className="d-lg-inline-flex flex-lg-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow justify-end">
                <NavItem>
                  <NavLink tag={Link} className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" to="/dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" to="/signup">Signup</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" to="/profile">Edit Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" to="/recipes">Recipes</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" to="/recipe">Recipe</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white hover:bg-purple-600 pl-2 focus:bg-purple-600" to="/add-recipe">Add Recipe</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
