import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddRecipe = () => {
  //Initialize States
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(true);
  const [measurementsList, setMeasurementsList] = useState([
    { Id: 'g',
      Name: "Gram"
    },
    { Id: "oz",
      Name: "Ounce"},
    { Id: "ml",
      Name: "Milliliter"},
    { Id: "L",
      Name: "Liter"},
    { Id: "cup",
      Name: "Cup"},
    { Id: "tsp",
      Name: "Tablespoon"},
    { Id: "lb",
      Name: "Pound"},
    { Id: "ea",
      Name: "Each"}
  ]);

  function onEditorStateChange(event) {
    // This function will update the editorState.
    setEditorState(event.blocks[0].text);
  };

/*   async function getMeasurement() {
    // Have an API endpoint which returns a list of Measurements we have in the database.
    const response = await axios.get('');
    setMeasurements();
    setLoading(false);
  } */

/*   useEffect(()=> {
    getMeasurement();
  }, [loading]); */

  function SubmitRecipe(event) {
    /* // This function will send the POST request to database to insert the new recipe.
    event.preventDefault();
    // Request to insert the recipe to the database.
    axios({
      // Specify the method to use
      method: 'post',
      // Specify the URL to send to.
      url: '',
      params: {
        RecipeCategory: ,
        Name: ,
        Fats: ,
        Proteins: ,
        Carbs: ,
        Calories: ,
        Instructions: ,
        Tags: ,
        Image: ,
        Date_Modified: ,
        Date_Created: ,
        Prep_Time: ,
        Servings: ,
        Notes: ,
        // Leave the ingredients out of the table
      }
    });

    // Request to insert the ingredients to the database.
    axios({
      method: 'post',
      url: '',
      params: {
        Name: '',
        Quantity: "",
        RecipeID: "",
      }
    }); */
  };

  function PhotoUpload(event) {
    // This function will handle uploading the image file corresponding to the new recipe being added.
    event.preventDefault();
  };

  function AddIngredients(event) {
    // This function will add an input field to the ingredient section once called upon.
    event.preventDefault();
    const ingredientSection = document.getElementById("ingredientSection");
    let childCount = ingredientSection.childElementCount;
    const newInput = document.createElement("INPUT");
    const newLabel = document.createElement("LABEL");
    const newMeasureSelect = document.createElement("SELECT");
    const newMeasureLabel = document.createElement("LABEL");

    // Set the attributes for the input fields.
    newLabel.setAttribute("for", `ingredient${childCount/4 + 1}`);
    newLabel.innerHTML = `Ingredient ${childCount/4 + 1}`;
    newInput.setAttribute("id",`ingredient${childCount/4 + 1}`);
    newInput.setAttribute("type","text");

    newMeasureLabel.setAttribute("id", `measurement${childCount/4 + 1}`);
    newMeasureLabel.innerHTML = `Measurement${childCount/4 + 1}`;
    
    newMeasureSelect.setAttribute("id", `measurement${childCount/4 + 1 }`);
    // Loop to create the select options for the measurements.
    function createOption(measurement)
    {
      const newOption = document.createElement("OPTION");
      newOption.setAttribute("value", `${measurement.Id}`);
      newOption.innerHTML = `${measurement.Name}`;
      newMeasureSelect.appendChild(newOption);
    }
    measurementsList.forEach(createOption);

    // Add the new input to the section
    ingredientSection.appendChild(newLabel);
    ingredientSection.appendChild(newInput);
    ingredientSection.appendChild(newMeasureLabel);
    ingredientSection.appendChild(newMeasureSelect);
  }

  function ShowMacros(event) {
    // This function will handle showing the macros input fields when the checkbox is ticked.
    event.preventDefault();
    
    // Grab the macro DOM elements
    const carb = document.getElementById("addCarb");
    const protein = document.getElementById("addProtein");
    const fat = document.getElementById("addFat");
    if(event.target.checked == true)
    {
      // Remove the hidden class from the elements.
    }
    else
    {
      // Add the hidden class to the elements.
    }
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
            <label htmlFor="measurement1">Measurement1:</label>
            <select id="measurement1">
              {measurementsList.map((measurement) => {
                return (
                <option value={measurement.Id}>{measurement.Name}</option>
                );
              })}
            </select>
          </section>
          <form onSubmit={AddIngredients}>
            <input type="submit" value="+" />
          </form>
          <section id="instructionSection">
            <h3>Instructions:</h3>
            <p>Enter the instructions to your new recipe below!</p>
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onChange={onEditorStateChange}
            />
          </section>
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
          <input type="checkbox" id="addRecipeMacros" onChange={ShowMacros}/>
          <label htmlFor="addRecipeMacros">Macros</label>
          <label htmlFor="addCarb">Carbohydrates</label>
          <input type="text" id="addCarb" />
          <label htmlFor="addFat">Fats</label>
          <input type="text" id="addFat" />
          <label htmlFor="addProtein">Proteins</label>
          <input type="text" id="addProtein" />
          <label htmlFor="addRecipeExtraNotes">Extra Notes:</label>
          <textarea id="addRecipeExtraNotes" />
        </section>
        <input type="submit" />
      </form>
    </>
  );
};

export default AddRecipe;
