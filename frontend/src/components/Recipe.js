import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Recipe({match}){

  const [myRecipe, setMyRecipe] = useState([]);

  useEffect(() => {
    fetchRecipe();
  }, []);

  async function fetchRecipe(){
    // TODO: Change below page to render based on page loaded instead of hard coded to '-1'. Hard coded just for initial design.
    const response = await axios.get(`api/recipes/-1`);
    setMyRecipe(response.data);
    console.log(response.data);
    console.log(response.data.ingredients[0])
  }

  // TODO: Render Stuff:
  // Placeholder image change to myRecipe.image once images are stored in DB.
  // Loop over ingredients list and display all ingredients instead of hard coding them
  return(
    <>
      <p><img src={"https://designshack.net/wp-content/uploads/placehold.jpg"} /></p>
      <h1>{myRecipe.name}</h1>
      <h4>Servings: {myRecipe.servings}</h4>
      <h4>Prep Time: {myRecipe.prepTime}</h4>

      <h4>Ingredients:</h4>

      <h4>Macros:</h4>
      <p>Calories: {myRecipe.calories}</p>
      <p>Fat {myRecipe.fat}g</p>
      <p>Protein {myRecipe.protein}g</p>
      <p>Carbs {myRecipe.carbohydrates}g</p>

      <h4>Ingredients</h4>


      <h4>Notes:</h4>
      <p>{myRecipe.notes}</p>

    </>
  );
}

export default Recipe;
