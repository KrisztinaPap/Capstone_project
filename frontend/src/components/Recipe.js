import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm';
import axios from 'axios';
import {useParams} from "react-router";

// Import Authentication
import { UserContext } from './Authentication/UserAuthentication';

function Recipe(){

  // Create user from UserContext
  const [user, setUser] = useContext(UserContext);

  // Check for User's Authentication
  const history = useHistory();
  useEffect(() => {
    if (!user.isAuthenticated()) {
      history.push("/login");
    }
  });

  const [myRecipe, setMyRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {recipes} = useParams();

  useEffect(() => {
    fetchRecipe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  async function fetchRecipe() {
    try {
      const response = await axios.get(`api/recipes/${recipes}`)
      setMyRecipe(response.data);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }

  // If page is loading, render below...
  if (loading){
    return(
      <>
        <section className="mt-8">
          <p className="text-center">
            <i className="fas fa-spinner fa-spin fa-4x"></i>
          </p>
          <p className="text-center mt-2">
            Loading your recipe...
          </p>
        </section>
      </>
    )
  }

  // If Axios request has an error, display error message...
  if (error){
    return(
        <section className="mt-8">
          <p className="text-center">
            There was an error loading your Recipe. Please try again.
          </p>
          <p className="text-center mt-2">
            <button className="purple-button focus:outline-none focus:shadow-outline mr-1" type="submit" onClick={fetchRecipe}>
              Retry
            </button>
            <Link to={"/recipes"}>
              <button className="purple-button focus:outline-none focus:shadow-outline ml-1" type="submit">
                Return to Recipe List
              </button>
            </Link>
          </p>
        </section>
    )
  }

  // Assigning Ingredients to an array. Array is called in JSX below
  let ingredientsArray = [];
  for(let i in myRecipe.ingredients){
    ingredientsArray.push(<p key={i}>{`${parseInt(i) + 1}. ${myRecipe.ingredients[i].name}` + ' - ' + `${myRecipe.ingredients[i].quantity} ${myRecipe.ingredients[i].uom}`}</p>)
  }

  // If no axios Errors, and data is returned, render page...
  return(
    <div className="mx-2">
      {/* TODO: change to myRecipe.image once images are stored in DB. Placeholder image used for now for styling */}
      <div className="flex justify-center my-4">
        <img className="p-2 w-1/2 border rounded" src={"https://designshack.net/wp-content/uploads/placehold.jpg"} alt={myRecipe.name} />
      </div>
      <h1 className="text-xl text-bold my-4 text-center">{myRecipe.name}</h1>
      <p className="text-md text-bold text-center">Servings: {myRecipe.servings}</p>
      <p className="text-md text-bold text-center">Prep Time: {myRecipe.prepTime}</p>

      <section className="flex flex-col md:flex-row md:justify-left my-4">

          <section className="md:w-1/2 mx-2 md:ml-4">
            <h2 className="text-lg text-bold my-2">Ingredients:</h2>
            <div className="text-md">{ingredientsArray}</div>
          </section>

          <section className="md:w-1/2 mx-2 md:ml-4">
            <h2 className="text-lg text-bold my-2">Macros:</h2>
            <p className="text-md">Calories: {(parseInt(myRecipe.fat) * 9) + (parseInt(myRecipe.protein) * 4) +(parseInt(myRecipe.carbohydrates) * 4)}</p>
            <p className="text-md">Fat: {myRecipe.fat}g</p>
            <p className="text-md">Protein: {myRecipe.protein}g</p>
            <p className="text-md">Carbs: {myRecipe.carbohydrates}g</p>
           </section>

      </section>

      <section className="m-2">
        <h2 className="text-lg text-bold my-2 md:text-center">Instructions</h2>
        <ReactMarkdown plugins={[gfm]} className="markdown">{myRecipe.instructions}</ReactMarkdown>
      </section>
      <section className="m-2">
        <h2 className="text-lg text-bold my-2 md:text-center">Notes:</h2>
        <ReactMarkdown plugins={[gfm]} className="markdown">{myRecipe.notes}</ReactMarkdown>
      </section>

      <section className="flex justify-around my-4">
        <button className="purple-button focus:outline-none focus:shadow-outline" type="submit">
          Edit Recipe
        </button>
        <Link to={"/recipes/"}><button className="purple-button focus:outline-none focus:shadow-outline" type="submit">
            Return to Recipe List
        </button></Link>
      </section>
    </div>
  );
}

export default Recipe;
