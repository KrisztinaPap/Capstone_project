import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router";

function Recipe(){

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
  {/* TODO: Design better loading display. Perhaps a loading gif of some sort? */}
  if (loading){
    return(
      <>
        {/* TODO: Remove center tags and apply centering via CSS */}
        <center>
        <p><i className="fas fa-spinner fa-spin fa-4x"></i></p>
          <p>Loading your recipe...</p></center>
      </>
    )
  }

  // If Axios request has an error, display error message...
  // TODO: Design better Error page?
  if (error){
    return(
      <>
        <p>There was an error loading your Recipe. Please try again.</p>
        <p><button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow" type="submit" onClick={fetchRecipe}>
          Retry
        </button></p>
      </>
    )
  }

  // Assigning Ingredients to an array. Array is called in JSX below
  let ingredientsArray = [];
  for(let i in myRecipe.ingredients){
    ingredientsArray.push(<p key={i}>{`${parseInt(i) + 1}: ${myRecipe.ingredients[i].name}` + ' - ' + `${myRecipe.ingredients[i].quantity}${myRecipe.ingredients[i].uomId}`}</p>)
  }

  // TODO: Remove this and apply style via CSS/Tailwind
  var divStyle = {
    display: 'flex',
    justifyContent: 'space-around'
  }

  // If no axios Errors, and data is returned, render page...
  return(
    <>
      {/* TODO: change to myRecipe.image once images are stored in DB. Placeholder image used for now for styling */}
      <p><img src={"https://designshack.net/wp-content/uploads/placehold.jpg"} alt={myRecipe.name}/></p>
      <h1>{myRecipe.name}</h1>
      <h4>Servings: {myRecipe.servings}</h4>
      <h4>Prep Time: {myRecipe.prepTime}</h4>

      {/* TODO: Remove style= after CSS/Tailwind style finished */}
      <section className={"ingredientsMacrosContainer"} style={divStyle}>
        <section className={"ingredients"}>
          <h4>Ingredients:</h4>
          {ingredientsArray}
        </section>

        <section className={"macros"}>
          <h4>Macros:</h4>
          <p>Calories: {(parseInt(myRecipe.fat) * 9) + (parseInt(myRecipe.protein) * 4) +(parseInt(myRecipe.carbohydrates) * 4)}</p>
          <p>Fat: {myRecipe.fat}g</p>
          <p>Protein: {myRecipe.protein}g</p>
          <p>Carbs: {myRecipe.carbohydrates}g</p>
        </section>
      </section>

      <h4>Instructions</h4>
      <p>{myRecipe.instructions}</p>

      <h4>Notes:</h4>
      <p>{myRecipe.notes}</p>

      {/* TODO: Consult; perhaps this could link to a page identical to "Create" but with all the fields filled in and ready to edit? Potential better ways to handle edit page? */}
      {/* TODO: Button Functionality */}
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
