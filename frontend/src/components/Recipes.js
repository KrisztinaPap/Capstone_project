import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Recipes() {

  useEffect(() => {
    populateRecipes();
  }, []);

  const [recipes, setRecipes] = useState([]);

  async function populateRecipes(){
    const response = await axios.get('api/recipes')
    setRecipes(response.data);
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
                    <Link to={`recipes/${recipes.id}`} target='_blank'>
                      <img src={recipes.image} />
                      <div>
                        {recipes.name}
                      </div>
                    </Link>
                  </td>
                  <td>
                    <Link to={`recipes/${recipes.id}`} target='_blank'>
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
