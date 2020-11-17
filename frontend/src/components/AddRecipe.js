import React from "react";
import ReactDOM from "react-dom";

const AddRecipe = () => {

  function SubmitRecipe(event) {
    // This function will send the POST request to database to insert the new recipe.
    event.preventDefault();

  };

  function PhotoUpload(event) {
    // This function will handle uploading the image file corresponding to the new recipe being added.
    event.preventDefault();

  };

  function AddIngredients(event) {
    // This function will add an input field to the ingredient section once called upon.
    event.preventDefault();
    const ingredientSection = document.getElementById("ingredientSection");
    let childCount = ingredientSection.childElementCount();
    const newInput = document.createElement("INPUT");
    const newLabel = document.createElement("LABEL");

    // Set the attributes for the input fields.
    newLabel.setAttribute("for", `ingredient${childCount}`);
    newInput.setAttribute("id",`ingredient${childCount}`);
    newInput.setAttribute("type","text");

    // Add the new input to the section
    ingredientSection.appendChild(newLabel);
    ingredientSection.appendChild(newInput);
  }

  function ShowMacros(event) {
    // This function will handle showing the macros input fields when the checkbox is ticked.
    event.preventDefault();

    // Grab the macro DOM elements
    const carb = document.getElementById("addCarb");
    const protein = document.getElementById("addProtein");
    const fat = document.getElementById("addFat");

    // Remove the hidden class from them.
  };

  return (
    <>
      <h1>AddRecipe page</h1>
      <h2>Recipe Information</h2>
      <form onSubmit={SubmitRecipe}>
        <section id="addRecipeBasics">
          <label htmlFor="addRecipeName">Name(*):</label>
          <input type="text" id="addRecipeName" />
          <label htmlFor="addRecipeDescription">Description:</label>
          <input type="text" id="addRecipeDescription" />
          <form onSubmit={PhotoUpload}>
            <label htmlFor="addRecipePhoto">Photo:</label>
            <input type="text" id="addRecipePhoto" value="Photo Placeholder" />
            <input type="submit" value="Upload" />
          </form>
          <div>
            <p>Upload a file</p>
            <p>PNG, JPEG, up to 10MB</p>
          </div>
        </section>
        <section id="addRecipeRequirements">
          <section id="ingredientSection">
            <label htmlFor="ingredient1">Ingredients(*):</label>
            <input type="text" id="ingredient1" />
          </section>
          <label htmlFor="instructions">Instructions(*):</label>
          <input type="text" id="instructions" />
        </section>
        <section id="addRecipeLogistics">
          <label htmlFor="addRecipePrepTime">Prep. Time(*):</label>
          <input type="text" id="addRecipePrepTime" />
          <label htmlFor="addRecipeCookTime">Cook Time(*):</label>
          <input type="text" id="addRecipeCookTime" />
          <label htmlFor="addRecipeServings">Servings:</label>
          <input type="text" id="addRecipeServings" />
        </section>
        <section id="addRecipeAdditional">
          <label htmlFor="addCalories">Calories</label>
          <input type="checkbox" id="addRecipeMacros" />
          <label htmlFor="addRecipeMacros">Macros</label>
          <label htmlFor="addCarb">Carbohydrates</label>
          <input type="text" id="addCarb" />
          <label htmlFor="addFat">Fats</label>
          <input type="text" id="addFat" />
          <label htmlFor="addProtein">Proteins</label>
          <input type="text" id="addProtein" />
          <label htmlFor="addRecipeExtraNotes">Extra Notes:</label>
          <input type="text" id="addRecipeExtraNotes" />
        </section>
        <input type="submit" />
      </form>
    </>
  );
};

export default AddRecipe;
