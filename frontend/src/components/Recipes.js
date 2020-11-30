import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Recipes() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

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
        <p><button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow" type="submit" onClick={populateRecipes}>
          Retry
        </button></p>
      </>
    )
  }

  return (
    <>
      <main>
        <section>
          <h2>
            <i className="fas fa-drumstick-bite"></i>
            Recipes
          </h2>


          <table>
            <thead>
              <tr>
                <th>
                  Recipes
                </th>
                <th>
                </th>
              </tr>
            </thead>

            <tbody>
              {recipes.map(recipes => (
                <tr key={recipes.id}>
                  <td>
                    <Link to={`/recipes/${recipes.id}`}>
                      <img src={recipes.image} alt={recipes.name}/>
                      <div>
                        {recipes.name}
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Link to={`recipes/${recipes.id}`}>
                      <button>
                        <i className="fas fa-external-link-alt"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
            <tr>
              <th>
               Recipes
              </th>
              <th>
              </th>
            </tr>
            </tfoot>

          </table>
        </section>
      </main>
    </>
  );
}

//Export Function
export default Recipes;

