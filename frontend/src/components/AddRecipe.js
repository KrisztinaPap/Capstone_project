import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Import Authentication
import { UserContext } from './Authentication/UserAuthentication';

const AddRecipe = () => {

  // Create user from UserContext
  const [user, setUser] = useContext(UserContext);

  // Check for User's Authentication
  const history = useHistory();
  useEffect(() => {
    if (!user.isAuthenticated()) {
      history.push("/login");
    }
  });

  //Initialize States
  const [editorState, setEditorState] = useState(EditorState.createEmpty(""));
  const [loading, setLoading] = useState(true);
  const [measurementsList, setMeasurementsList] = useState(['']);
  const [recipeCategoryList, setRecipeCategoryList] = useState([
          { Name:'placeholder',
            Id:-1
        }]);
  const [recipeCategory, setRecipeCategory] = useState("0");
  const [name, setName] = useState("");
  const [fats, SetFats] = useState();
  const [proteins, SetProteins] = useState();
  const [carbohydrates, SetCarbohydrates] = useState();
  const [image, SetImage] = useState();
  const [prep, SetPrep] = useState();
  const [servings, SetServings] = useState();
  const [tags, setTags] = useState([]);
  const [notes, SetNotes] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const [response, setResponse] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseHeader, setResponseHeader] = useState("");
  let errorList = [];

  /*============================================================*/
  /*                   Setting States
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

  async function ValidateInputFields() {
    const validationErrorList = [];
    let validationErrorMsg;
    if(!name) {
      validationErrorMsg = "Your recipe is missing a name!";
      validationErrorList.push(validationErrorMsg); 
    }
    const IngredientInputFields = document.getElementsByClassName("ingredientInput");
    for(let i=0; i < IngredientInputFields.length; i += 3)
    {
      if(IngredientInputFields[i].value === "" || IngredientInputFields[i] === null) {
        validationErrorList.push("One of your ingredients is missing a name!");
      }
      if(isNaN(parseInt(IngredientInputFields[i+1].value))) {
        validationErrorList.push("One of your ingredients is missing a quantity!");
      }
      if(IngredientInputFields[i+2].value === "0" || IngredientInputFields[i+2].value === null) {
        validationErrorList.push("One of your ingredients is missing a unit of measure!");
      }
    }
    if(editorState == null) {
      validationErrorMsg = "Your recipe is missing instructions!";
      validationErrorList.push(validationErrorMsg); 
    }
    if(isNaN(parseInt(prep))) {
      validationErrorMsg = "Please enter a number for prep time (min) to make your recipe!";
      validationErrorList.push(validationErrorMsg); 
    }
    if(isNaN(parseInt(servings))) {
      validationErrorMsg = "Please enter a number for the number of servings your recipe makes!";
      validationErrorList.push(validationErrorMsg); 
    }
    if(isNaN(parseInt(carbohydrates))) {
      validationErrorMsg = "Please enter a number for the amount of carbohydrates in your recipe!";
      validationErrorList.push(validationErrorMsg); 
    }
    if(isNaN(parseInt(fats))) {
      validationErrorMsg = "Please enter a number for the amount of fat in your recipe!";
      validationErrorList.push(validationErrorMsg); 
    }
    if(isNaN(parseInt(proteins))) {
      validationErrorMsg = "Please enter a number for the amount of protein in your recipe!";
      validationErrorList.push(validationErrorMsg); 
    }
    if(recipeCategory === "0") {
      validationErrorMsg = "Please select a category your recipe belongs to!";
      validationErrorList.push(validationErrorMsg); 
    }
    setValidationErrors(validationErrorList);
    // return validationErrorList;
  }

  function SubmitRecipe(event) {
    // Summary:
    //   This function will send the recipe data from the form the user has filled out to the database and create a new recipe.
    event.preventDefault();
    ValidateInputFields();
    const ingredientsList = CreateIngredientList();
    if( validationErrors.length === 0 ) {
      axios({
        method: 'post',
        url: '/api/recipes',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        data: {
          "CategoryId": parseInt(recipeCategory),
          "Name": name,
          "Fat": fats,
          "Protein": proteins,
          "Carbohydrates": carbohydrates,
          "Instructions": editorState,
          "Ingredients": ingredientsList,
          "Tags": tags,
          "Image": image,
          "DateModified": new Date().toJSON(),
          "DateCreated": new Date().toJSON(),
          "PrepTime": prep,
          "Servings": servings,
          "Notes": notes
          // "userId" : _userId
        }
      }).then((res) => {
        setValidationErrors([]);
        setResponseHeader("Successly added recipe");
        setResponse(res.data);
        setStatusCode(res.status);
      })
      .catch((err) => {
        setValidationErrors(["There was an error with the server."]);
        setResponse(err.response.data);
        setStatusCode(err.response.status);
      });
    }
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
      case "addRecipeTags":
        {
          setTags([event.target.value]);
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
    const imageInput = document.getElementById("addRecipePhoto");

    // link @ https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios
    var formData = new FormData();
    formData.append("fileUpload", imageInput.files[0]);
    // console.log(formData);
    // Need to pull the users JWT token and apply it to the request.
    axios.post('https://localhost:5001/api/recipes/image-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.token}`
      },
      data: formData

    }).then((res) => {
      SetImage(res.data);
      const photoLabelElement = document.getElementById("photoLabel");
      const successUploadMessage = document.createElement("P");
      successUploadMessage.setAttribute("class", "font-bold");
      successUploadMessage.innerHTML = "Successfully uploaded image.";
      photoLabelElement.appendChild(successUploadMessage);

    });
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

  function CreateIngredientList() {
    // Summary:
    //   This function will take all the ingredients in the form and create an Ingredient object for each one. All the ingredients will then be stored into a list.

    // Grab all the ingredient input fields:
    const IngredientInputFields = document.getElementsByClassName("ingredientInput");
    const tempIngredientList = [];
    for(let i = 0; i < IngredientInputFields.length; i += 3)
    {
      let newIngredient = {
        "Name": IngredientInputFields[i].value,
        "Quantity": IngredientInputFields[i+1].value,
        "UOM": IngredientInputFields[i+2].value
      }
      tempIngredientList.push(newIngredient);
    }
    return tempIngredientList;
  }

  /*============================================================*/
  /*                   State Refresh
  /*============================================================*/
  useEffect(()=> {
    getUOMs();
    getRecipeCategories();
  },[loading]);

  useEffect(()=> {
    if(validationErrors.length > 0) {
      setResponseHeader("ERROR: There was problem with your recipe!");
      for(let error in validationErrors)
      {
        errorList.push(<li className="list-disc">{validationErrors[error]}</li>);
      }
      setErrorMessage(errorList);
    }
  }, [validationErrors.length]);

  return (
    <>
      <div className="container mx-2 my-4">
        <div className="block text-center my-4"> 
          <h1 className="font-bold">Add a New Recipe</h1>
        </div>
        <h2 className="font-bold py-4">Recipe Information</h2>
        <h1 className="font-extrabold">{responseHeader}</h1>
        <ul>
          {errorMessage}
        </ul>
        <form onSubmit={SubmitRecipe}>
          <section id="addRecipeBasics">
            <label htmlFor="addRecipeName">Name(*):</label>
            <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="addRecipeName" onChange={HandleFormChange} />
            <form className="py-4">
              <label id="photoLabel" htmlFor="addRecipePhoto">Photo:</label>
              <input type="file" id="addRecipePhoto" />
              <button className="cursor-pointer purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline" onClick={PhotoUpload}>Upload</button>
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
                <option value="0" selected="selected"></option>
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
              <label htmlFor="addRecipePrepTime">Prep. Time(*)(min):</label>
              <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="addRecipePrepTime" onChange={HandleFormChange} />
            </div>
            <div>
              <label htmlFor="addRecipeCookTime">Cook Time(*)(min):</label>
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
              <label htmlFor="addRecipeTags">Tags:</label>
              <textarea className="block input-field w-full lg:w-1/2 focus:outline-none focus:shadow-outline" id="addRecipeTags" onChange={HandleFormChange} />
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
