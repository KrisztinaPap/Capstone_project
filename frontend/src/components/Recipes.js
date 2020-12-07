import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

function Recipes() {
  const {user} = useContext(AuthContext);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sure, setSure] = useState(false);
  const [sureID, setSureID] = useState(0);

  useEffect(() => {
    populateRecipes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function populateRecipes() {
    try {
      const response = await axios.get('api/recipes', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      setRecipes(response.data);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }

  async function softDeleteRecipe(recipeID) {
    setSure(!sure);
    (sureID == 0) ? setSureID(recipeID) : setSureID(0);
  }

  async function deleteRecipe(recipeID) {
    try {
      await axios.delete(`api/recipes/${recipeID}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      populateRecipes();
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
    softDeleteRecipe(recipeID);
  }

  if (loading){
    return(
      <>
        <section className="mt-8">
          <p className="text-center">
            <i className="fas fa-spinner fa-spin fa-4x"></i>
          </p>
          <p className="text-center mt-2">
            Gathering your recipes...
          </p>
        </section>
      </>
    );
  }

  // If Axios request has an error, display error message...
  if (error){
    return(
    <section className="mt-8">
      <p className="text-center">
        There was an error loading the Recipes List. Please try again.
      </p>
      <p className="text-center mt-2">
        <button className="purple-button focus:outline-none focus:shadow-outline mr-1" type="submit" onClick={populateRecipes}>
          Retry
        </button>
        <Link to={"/"}>
          <button className="purple-button focus:outline-none focus:shadow-outline ml-1" type="submit">
            Return to Home Page
          </button>
        </Link>
      </p>
    </section>
    )
  }

  return (
    <>
      <main className="container my-2">
        <section>

          <table className="w-full mx-auto mt-8 ">
            <section className={'flex mt-8 ml-5 mr-5'}>
              <h2 className="flex-auto justify-start text-2xl"><i className="fas fa-drumstick-bite px-2"></i>Your Recipe List</h2>
              <Link className="flex justify-end" to="/add-recipe">
                <button className="purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline">
                  <i className="fas fa-plus pr-2"></i>
                  Add a New Recipe
                </button>
              </Link>
            </section>


            <tbody className="mb-2">
              {recipes.map(recipes => (
                <div key={recipes.id} className="border-2 m-2 p-2 flex flex-row rounded shadow">
                  <tr className="w-full flex justify-between align-center">
                    <td className="flex align-center justify-start">
                      <Link className="flex align-center justify-start items-center" to={`/recipes/${recipes.id}`}>
                        <img className="p-2 w-12 h-12 border rounded" src={recipes.image} alt={recipes.name}/>
                        <div className="px-4 text-gray-800 hover:text-purple-500 focus:text-purple-500">
                          {recipes.name}
                          <span className="block text-sm">KCal: {(parseInt(recipes.fat) * 9) + (parseInt(recipes.protein) * 4) + (parseInt(recipes.carbohydrates) * 4)} | C: {recipes.carbohydrates} | F: {recipes.fat} | P: {recipes.protein}</span>

                        </div>
                      </Link>
                    </td>
                    <td className="flex align-center items-center ">
                      {!sure &&
                        <button onClick={ () => softDeleteRecipe(recipes.id) } className="w-12 h-12 purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline">
                          <i className="far fa-trash-alt"></i>
                        </button>
                      }
                      {sure && sureID === recipes.id &&
                        <>
                          <span>Are you sure?</span>
                          <button onClick={ () => deleteRecipe(recipes.id) } className="mx-2 h-12 bg-red-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-red-700 focus:outline-none focus:shadow-outline">
                            YES
                          </button>
                          <button onClick={ () => softDeleteRecipe(recipes.id) } className="h-12 purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline">
                            CANCEL
                          </button>
                        </>
                      }
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
