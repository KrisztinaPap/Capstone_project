import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Plate from '../assets/plate.svg';

// Import Authentication
import { UserContext, Authorize } from './Authentication/UserAuthentication';

function Recipes() {

  // Create user from UserContext
  const user = useContext(UserContext);

  // Check for User's Authentication
  Authorize();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    populateRecipes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function populateRecipes() {
    try {
      const response = await axios.get('api/recipes')
      setRecipes(response.data);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }

  {/* TODO: Design better loading display. Perhaps a loading gif of some sort? Remove center after CSS applied */}
  if (loading){
    return(
      <>
        <center>
          <p><i className="fas fa-spinner fa-spin fa-4x"></i></p>
          <p>Gathering your recipes...</p>
        </center>
      </>
    );
  }

  // If Axios request has an error, display error message...
  // TODO: Design better Error page?
  if (error){
    return(
      <>
        <p>There was an error loading the Recipes List. Please try again.</p>
        <p><button className="purple-button focus:outline-none focus:shadow-outline" type="submit" onClick={populateRecipes}>
          Retry
        </button></p>
      </>
    )
  }

  return (
    <>
      <main className="container my-2">
        <section>
         
          <div className="block text-center my-4">
            <p className="text-xl">Hello, {user.name}!</p>
          </div>


          <table className="w-full mx-auto">
            <thead>
              <tr>
                <th className="my-4">
                  <h2><i className="fas fa-drumstick-bite px-2"></i>Your Recipes</h2>
                </th>
                <th>
                </th>
              </tr>
            </thead>

            <tbody className="m-2">
              {recipes.map(recipes => (
                <div className="border-2 m-2 p-2 flex flex-row rounded shadow">
                  <tr className="w-full flex justify-between align-center" key={recipes.id}>
                    <td className="flex align-center justify-start">
                      <Link className="flex align-center justify-start items-center" to={`/recipes/${recipes.id}`}>
                        <img className="p-2 w-12 h-12 border rounded" /*src={recipes.image}*/ src={Plate} alt={recipes.name}/>
                        <div className="px-4 text-gray-800 hover:text-purple-500 focus:text-purple-500">
                          {recipes.name}
                        </div>
                      </Link>
                    </td>
                    <td className="flex align-center">
                      <Link className="flex align-center" to={`recipes/${recipes.id}`}>
                        <button>
                          <i className="fas fa-external-link-alt"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                </div>
              ))}
            </tbody>

          </table>
        </section>
      </main>
    </>
  );
}

//Export Function
export default Recipes;

