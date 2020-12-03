import React, { useState, useEffect } from "react";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddRecipe = () => {
  //Initialize States
  const [editorState, setEditorState] = useState(EditorState.createEmpty(""));
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
  const [image, SetImage] = useState();
  const [prep, SetPrep] = useState();
  const [servings, SetServings] = useState();
  const [notes, SetNotes] = useState();
  const [response, setResponse] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [message, setMessage] = useState("");

  const [ingredientList, setIngredientList] = useState([]);

  /*============================================================*/
  /*                   UOM and Category
  /*============================================================*/
  async function getUOMs() {
    // Summary:
    //   This function will obtain the units of measure currently in the database and set the measurement list for the user to choose from.
    const response = await axios.get('https://localhost:5001/api/UOMs/all');
    setMeasurementsList(response.data);
    setLoading(false);
  }

  async function getRecipeCategories() {
    // Summary:
    //   This function will obtain the recipe categories currently in the database and set the measurement list for the user to choose from.
    const res = await axios.get('https://localhost:5001/api/recipecategories/options');
    setRecipeCategoryList(res.data);
    setLoading(false);
  }

  function onEditorStateChange(event) {
    // Summary:
    //   This function will update the state tracked by the instructions text editor.
    setEditorState(event.blocks[0].text);
  }

  function SubmitRecipe(event) {
    // Summary:
    //   This function will send the recipe data from the form the user has filled out to the database and create a new recipe.
    event.preventDefault();
    CreateIngredientList();
    axios({
      method: 'post',
      url: '/api/recipes',
      data: {
        "CategoryId": parseInt(recipeCategory),
        "Name": name,
        "Fat": fats,
        "Protein": proteins,
        "Carbohydrates": carbohydrates,
        "Instructions": editorState,
        "Ingredients": ingredientList,
        // Image: image,
        "DateModified": new Date().toJSON(),
        "DateCreated": new Date().toJSON(),
        "PrepTime": prep,
        "Servings": servings,
        "Notes": notes
      }
    }).then((res) => {
      setResponse(res.data);
      setStatusCode(res.status);
    })
    .catch((err) => {
      setResponse(err.response.data);
      setStatusCode(err.response.status);
    });
  }

  function HandleFormChange(event) {
    // Summary:
    //   This function will set the state for the associated properties for the respective fields.
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
      case "addRecipeCategory":
        {
          setRecipeCategory(event.target.value);
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
      default:
        {
          break;
        }
    }
  }

  function PhotoUpload(event) {
    // Summary:
    //  This function will handle uploading the image file corresponding to the new recipe being added.
    event.preventDefault();
  }

  function AddIngredientForm(event) {
    // Summary:
    //  This function will add the required input fields to add an ingredient to the ingredient section once called upon.
    event.preventDefault();
    const ingredientSection = document.getElementById("ingredientSection");
    let childCount = ingredientSection.childElementCount;
    const newInput = document.createElement("INPUT");
    const newLabel = document.createElement("LABEL");
    const newQuantity = document.createElement("INPUT");
    const newQuantityLabel = document.createElement("LABEL");
    const newMeasureSelect = document.createElement("SELECT");
    const newMeasureLabel = document.createElement("LABEL");

    // Set the attributes for the input fields.
    newLabel.setAttribute("for", `ingredient${childCount / 4 + 1}`);
    newLabel.innerHTML = "Ingredient";
    newInput.setAttribute("id", `ingredient${childCount / 4 + 1}`);
    newInput.setAttribute("type", "text");
    newInput.setAttribute("class", "ingredientInput input-field mx-2 focus:outline-none focus:shadow-outline");

    newQuantityLabel.setAttribute("for", `quantity${childCount / 4 + 1}`);
    newQuantityLabel.innerHTML = `Quantity`;
    newQuantity.setAttribute("id", `quantity${childCount / 4 + 1}`);
    newQuantity.setAttribute("class", "ingredientInput");

    newMeasureLabel.setAttribute("id", `measurement${childCount / 4 + 1}`);
    newMeasureLabel.innerHTML = "Measurement";

    newMeasureSelect.setAttribute("id", `measurement${childCount / 4 + 1}`);
    newMeasureSelect.setAttribute("class", "ingredientInput");
    // Add the measurement options to the select field.
    for(let measurement in measurementsList) {
      const newOption = document.createElement("OPTION");
      newOption.setAttribute("value", `${measurementsList[measurement]}`);
      newOption.innerHTML = `${measurementsList[measurement]}`;
      newMeasureSelect.appendChild(newOption);
    }
    // Add the new input fields to the section
    ingredientSection.appendChild(newLabel);
    ingredientSection.appendChild(newInput);
    ingredientSection.appendChild(newQuantityLabel);
    ingredientSection.appendChild(newQuantity);
    ingredientSection.appendChild(newMeasureLabel);
    ingredientSection.appendChild(newMeasureSelect);
  }

  function CreateIngredientList()
  {
    // Summary:
    //   This function will take all the ingredients in the form and create an Ingredient object for each one. All the ingredients will then be stored into a list.

    // Grab all the ingredient input fields:
    const IngredientInputFields = document.getElementsByClassName("ingredientInput");

    const tempIngredientList = [];
    for(let i=0; i < IngredientInputFields.length; i += 3)
    {
      let newIngredient = {
        "Name": IngredientInputFields[i].value,
        "Quantity": IngredientInputFields[i+1].value,
        "UOM": IngredientInputFields[i+2].value
      }
      tempIngredientList.push(newIngredient);
      console.log(tempIngredientList);
    }
    setIngredientList(tempIngredientList);
  }

  /*============================================================*/
  /*                   State Refresh
  /*============================================================*/
  useEffect(()=> {
    getUOMs();
    getRecipeCategories();
  },[loading]);

  useEffect(() => {
    if (statusCode === 400) {
      let errorMsg = "";
      console.log(response.errors);
      for(const key in response.errors)
      {
        for(const errorIndex in response.errors[key])
        {
          errorMsg += `${response.errors[key][errorIndex]}`;
        }
      }
      // response.errors.Instructions.forEach(error => errorMsg += error);
        setMessage(errorMsg);
    }
    else if (statusCode === 200) {
        setMessage(`Successfully`)
    }
  }, [response, statusCode]);

  return (
    <>
      <div className="container mx-2 my-4">
        <div className="block text-center my-4"> 
          <h1 className="font-bold">Add a New Recipe</h1>
        </div>
        <h2 className="font-bold py-4">Recipe Information</h2>
        <p>{message}</p>
        <form onSubmit={SubmitRecipe}>
          <section id="addRecipeBasics">
            <label htmlFor="addRecipeName">Name(*):</label>
            <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="addRecipeName" onChange={HandleFormChange} />
            <form className="py-4" onSubmit={PhotoUpload}>
              <label htmlFor="addRecipePhoto">Photo:</label>
              <input type="text" id="addRecipePhoto" value="Photo Placeholder" />
              <input className="cursor-pointer purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline" type="submit" value="Upload" />
              <div className="px-4 text-sm">
                <p>Upload a file</p>
                <p>PNG, JPEG, up to 10MB</p>
              </div>
            </form>
           
          </section>
          <section id="addRecipeRequirements">
            <section id="ingredientSection">
              <label htmlFor="ingredient1">Ingredients(*):</label>
              <input className="ingredientInput input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="ingredient1" onChange={HandleFormChange} />
              <label htmlFor="quantity1">Quantity:</label>
              <input className="ingredientInput input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="quantity1" onChange={HandleFormChange} />
              <label htmlFor="measurement1">Measurement:</label>
              <select className="ingredientInput" id="measurement1" onChange={HandleFormChange}>
                {measurementsList.map((measurement) => {
                  return (
                    <option value={measurement}>{measurement}</option>
                  );
                })}
              </select>
            </section>
            <button className="purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline" onClick={AddIngredientForm} >+</button>
            <section id="instructionSection">
              <h3 className="font-bold py-4">Instructions:</h3>
              <p>Enter the instructions to your new recipe below!</p>
              <div className="input-field">
                <Editor
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onChange={onEditorStateChange}
                  />
              </div>
            </section>
          </section>
          <section id="addRecipeLogistics">
            <div>
              <label htmlFor="addRecipePrepTime">Prep. Time(*):</label>
              <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="addRecipePrepTime" onChange={HandleFormChange} />
            </div>
            <div>
              <label htmlFor="addRecipeCookTime">Cook Time(*):</label>
              <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="addRecipeCookTime" onChange={HandleFormChange} />
            </div>
            <div>
              <label htmlFor="addRecipeServings">Servings:</label>
              <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="addRecipeServings" onChange={HandleFormChange} />
            </div>
          </section>
          <section id="addRecipeAdditional">
            <div>
              <label htmlFor="addCarb">Carbohydrates</label>
              <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="addCarb" onChange={HandleFormChange} />
            </div>
            <div>
              <label htmlFor="addFat">Fats</label>
              <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="addFat" onChange={HandleFormChange} />
            </div>
            <div>
              <label htmlFor="addProtein">Proteins</label>
              <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="addProtein" onChange={HandleFormChange} />
            </div>
            <div>
              <label htmlFor="addRecipeCategory">Recipe Category:</label>
              <select className="border border-solid mx-4" id="addRecipeCategory" onChange={HandleFormChange}>
                <option value="0" selected="selected"></option>
                {recipeCategoryList.map((category) => {
                  return (
                    <option value={category.id}>{category.name}</option>
                  );
                })}
                </select>
            </div>
            <div className="my-3">
              <label htmlFor="addRecipeExtraNotes">Extra Notes:</label>
              <textarea className="block input-field w-full lg:w-1/2 focus:outline-none focus:shadow-outline" id="addRecipeExtraNotes" onChange={HandleFormChange} />
            </div>
          </section>
          <input className="cursor-pointer purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline" type="submit" />
          </form>
        </div>
    </>
  );
};

export default AddRecipe;
