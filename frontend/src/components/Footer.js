import React, { Component } from 'react';

export class Footer extends Component {

  render() {
    return (
      <footer className="h-36 w-full block text-center place-items-center border-top box-shadow text-white bg-purple-500">
          <div className="hidden md:grid md:grid-cols-2">
            <div className="text-white">
            <h3 className="my-2">Project Links</h3>
              <div className="flex flex-col">
                <a href="https://github.com/TECHCareers-by-Manpower/capstone-project-puddlejumpers" className="list-none appearance-none text-white">GitHub Repository</a>
                <a href="https://trello.com/b/zUabU848/capstone-puddlejumpers" className="list-none text-white">Trello Board</a>
              </div>
            </div>
            <div>
            <h3 className="my-2">Site Links</h3>
            <div className="flex flex-col">
                <a href="./home" className="list-none text-white">Home</a>
                <a href="./dashboard" className="list-none text-white">Dashboard</a>
                <a href="./recipes" className="list-none text-white">Recipes</a>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <span>Copyright &copy; 2020 by Team PuddleJumpers</span>
          </div>
    </footer>
    );
  }
}
