import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router";

function Recipe(){

  const [myRecipe, setMyRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const {recipes} = useParams();

  useEffect(() => {
    fetchRecipe();
  }, [loading]);


  async function fetchRecipe(){
    // TODO: Change below page to render based on page loaded instead of hard coded to '-1'. Hard coded just for initial design.
    const response = await axios.get(`api/recipes/${recipes}`);
    setMyRecipe(response.data);
    setLoading(false);
  }

  if (loading){
    return(
      <p>Loading your recipe...</p>
    )
  }

  // TODO: Render Stuff:
  // Placeholder image change to myRecipe.image once images are stored in DB.
  // Loop over ingredients list and display all ingredients instead of hard coding them
  // Button Functionality:
  //    - Edit Recipe
  return(
    <>
      <p><img src={"https://designshack.net/wp-content/uploads/placehold.jpg"} /></p>
      <h1>{myRecipe.name}</h1>
      <h4>Servings: {myRecipe.servings}</h4>
      <h4>Prep Time: {myRecipe.prepTime}</h4>

      <h4>Ingredients:</h4>
      <p>{myRecipe.ingredients[0].name} - {myRecipe.ingredients[0].quantity} {myRecipe.ingredients[0].uomId}</p>

      <h4>Macros:</h4>
      <p>Calories: {myRecipe.calories}</p>
      <p>Fat {myRecipe.fat}g</p>
      <p>Protein {myRecipe.protein}g</p>
      <p>Carbs {myRecipe.carbohydrates}g</p>

      <h4>Instructions</h4>
      <p>{myRecipe.instructions}</p>

      <h4>Notes:</h4>
      <p>{myRecipe.notes}</p>


      <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow" type="submit">
        Edit Recipe
      </button>
      <Link to={"/recipes/"}><button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow" type="submit">
        Return to Recipe List
      </button></Link>
    </>
  );
}

export default Recipe;
