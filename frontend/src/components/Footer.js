import React, { Component } from 'react';
import { Container, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Footer extends Component {

  render() {
    return (
      <footer className="h-36 w-full block text-center place-items-center border-top box-shadow text-white bg-purple-500">
        <Container className="">
          <div className="hidden md:grid md:grid-cols-2">
            <div className="text-white">
              <h3 className="my-2">Project Links</h3>
              <NavItem className="list-none appearance-none">
                <a href="https://github.com/TECHCareers-by-Manpower/capstone-project-puddlejumpers" className="list-none appearance-none text-white"><p className="mb-2">GitHub Repository</p></a>
              </NavItem>
              <NavItem className="list-none appearance-none">
                <a href="https://trello.com/b/zUabU848/capstone-puddlejumpers" className="list-none text-white"><p>Trello Board</p></a>
              </NavItem>
            </div>
            <div>
              <h3 className="mt-2">Site Links</h3>
              <NavItem className="list-none appearance-none">
                <NavLink tag={Link} className="list-none text-white hover:bg-purple-600 focus:bg-purple-600 py-2" to="/">Home</NavLink>
              </NavItem>
              <NavItem className="list-none appearance-none">
                <NavLink tag={Link} className="list-none text-white hover:bg-purple-600 focus:bg-purple-600 py-2" to="/dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem className="list-none appearance-none">
                <NavLink tag={Link} className="list-none text-white hover:bg-purple-600 focus:bg-purple-600 py-2" to="/recipes">Recipes</NavLink>
              </NavItem>
            </div>
          </div>

          <div className="mt-2">
            <span>Copyright &copy; 2020 by Team PuddleJumpers</span>
          </div>
        </Container>
    </footer>
    );
  }
}
