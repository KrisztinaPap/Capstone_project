import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddRecipe = () => {
  //Initialize States
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(true);
  const [measurementsList, setMeasurementsList] = useState(['placeholder']);
  const [recipeCategoryList, setRecipeCategoryList] = useState([
          { Name:'placeholder',
            Id:-1
        }]);
  const [recipeCategory, setRecipeCategory] = useState();
  const [name, setName] = useState();
  const [fats, SetFats] = useState();
  const [proteins, SetProteins] = useState();
  const [carbohydrates, SetCarbohydrates] = useState();
  const [calories, SetCalories] = useState();
  const [tags, SetTags] = useState();
  const [image, SetImage] = useState();
  const [prep, SetPrep] = useState();
  const [servings, SetServings] = useState();
  const [notes, SetNotes] = useState();

  async function getUOMs() {
    const response = await axios.get('https://localhost:5001/api/UOMs/all');
    setMeasurementsList(response.data);
    setLoading(false);
  }

  async function getRecipeCategories() {
    const res = await axios.get('https://localhost:5001/api/recipecategories/options');
    setRecipeCategoryList(res.data);
    setLoading(false);
  }

  useEffect(()=> {
    getUOMs();
    getRecipeCategories();
  },[loading]);

  function onEditorStateChange(event) {
    // This function will update the editorState.
    setEditorState(event.blocks[0].text);
  }

  function SubmitRecipe(event) {
    // This function will send the POST request to database to insert the new recipe.
    event.preventDefault();
    // Request to insert the recipe to the database.
    axios({
      method: 'post',
      url: '/api/recipes',
      params: {
        RecipeCategory: recipeCategory,
        Name: name,
        Fats: fats,
        Proteins: proteins,
        Carbohydrates: carbohydrates,
        Calories: calories,
        Instructions: editorState,
        Tags: tags,
        Image: image,
        Date_Modified: new Date(),
        Date_Created: new Date(),
        Prep_Time: prep,
        Servings: servings,
        Notes: notes,
      }
    });

    // Request to insert the ingredients to the database.
/*     axios({
      method: 'post',
      url: '',
      params: {
        Name: '',
        Quantity: "",
        RecipeID: "",
      }
    }); */
  }

  function HandleFormChange(event) {
    switch (event.target.id)
    {
      case "addRecipeName":
        {
          setName(event.target.value);
          break;
        }
      case "addRecipeDescription":
        {
          break;
        }
      case "addRecipePrepTime":
        {
          SetPrep(event.target.value);
          break;
        }
      case "addRecipeCookTime":
        {
          break;
        }
      case "addRecipeServings":
        {
          SetServings(event.target.value);
          break;
        }
      case "addCalories":
        {
          SetCalories(event.target.value);
          break;
        }
      case "addCarb":
        {
          SetCarbohydrates(event.target.value);
          break;
        }
      case "addFat":
        {
          SetFats(event.target.value);
          break;
        }
      case "addProtein":
        {
          SetProteins(event.target.value);
          break;
        }
      case "addRecipeExtraNotes":
        {
          SetNotes(event.target.value);
          break;
        }
    }
  }

  function PhotoUpload(event) {
    // This function will handle uploading the image file corresponding to the new recipe being added.
    event.preventDefault();
  }

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
    newLabel.setAttribute("for", `ingredient${childCount / 4 + 1}`);
    newLabel.innerHTML = `Ingredient ${childCount / 4 + 1}`;
    newInput.setAttribute("id", `ingredient${childCount / 4 + 1}`);
    newInput.setAttribute("type", "text");

    newMeasureLabel.setAttribute("id", `measurement${childCount / 4 + 1}`);
    newMeasureLabel.innerHTML = `Measurement${childCount / 4 + 1}`;

    newMeasureSelect.setAttribute("id", `measurement${childCount / 4 + 1}`);
    // Loop to create the select options for the measurements.
    function createOption(measurement) {
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

  return (
    <>
      <h1>AddRecipe page</h1>
      <h2>Recipe Information</h2>
      <form onSubmit={SubmitRecipe}>
        <section id="addRecipeBasics">
          <label htmlFor="addRecipeName">Name(*):</label>
          <input type="text" id="addRecipeName" onChange={HandleFormChange} />
          <form onSubmit={PhotoUpload} enctype="multipart/form-data">
            <label htmlFor="addRecipePhoto">Photo:</label>
            <input type="file" id="addRecipePhoto" />
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
                  <option value={measurement}>{measurement}</option>
                );
              })}
            </select>
          </section>
          <button onClick={AddIngredients} >+</button>
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
          <input type="text" id="addRecipePrepTime" onChange={HandleFormChange} />
          <label htmlFor="addRecipeCookTime">Cook Time(*):</label>
          <input type="text" id="addRecipeCookTime" onChange={HandleFormChange} />
          <label htmlFor="addRecipeServings">Servings:</label>
          <input type="text" id="addRecipeServings" onChange={HandleFormChange} />
        </section>
        <section id="addRecipeAdditional">
          <label htmlFor="addCalories">Calories</label>
          <input type="text" id="addCalories" onChange={HandleFormChange} />
          <label htmlFor="addCarb">Carbohydrates</label>
          <input type="text" id="addCarb" onChange={HandleFormChange} />
          <label htmlFor="addFat">Fats</label>
          <input type="text" id="addFat" onChange={HandleFormChange} />
          <label htmlFor="addProtein">Proteins</label>
          <input type="text" id="addProtein" onChange={HandleFormChange} />
          <label htmlFor="AddRecipeCategory">Recipe Category</label>
          <select id="AddRecipeCategory">
            {recipeCategoryList.map((category) => {
              return (
                <option value={category.id}>{category.name}</option>
              );
            })}
          </select>
          <label htmlFor="addRecipeExtraNotes">Extra Notes:</label>
          <textarea id="addRecipeExtraNotes" onChange={HandleFormChange}/>
        </section>
        <input type="submit" />
      </form>
    </>
  );
};

export default AddRecipe;
