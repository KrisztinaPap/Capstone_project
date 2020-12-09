import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { useHistory, useLocation } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { draftToMarkdown } from 'markdown-draft-js';

const AddRecipe = () => {

  //Initialize States
  const {user} = useContext(AuthContext);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(true);
  const [measurementsList, setMeasurementsList] = useState(['']);
  const [recipeCategoryList, setRecipeCategoryList] = useState([{ name: '', id: -1 }]);
  const [recipeCategory, setRecipeCategory] = useState("0");
  const [name, setName] = useState("");
  const [fats, SetFats] = useState();
  const [proteins, SetProteins] = useState();
  const [carbohydrates, SetCarbohydrates] = useState();
  const [image, SetImage] = useState();
  const [prep, SetPrep] = useState();
  const [cookTime, setCookTime] = useState();
  const [servings, SetServings] = useState();
  const [notes, SetNotes] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const [imageUploadMessage, setImageUploadMessage] = useState();
  const [recipeID, setRecipeID] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseHeader, setResponseHeader] = useState("");
  const history = useHistory();
  const location = useLocation();
  const [createRecipeSuccess, setCreateRecipeSuccess] = useState(false);

  /*============================================================*/
  /*                   Setting States
  /*============================================================*/
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
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
    if(isNaN(parseFloat(prep))) {
      validationErrorMsg = "Please enter a number for prep time (min) to make your recipe!";
      validationErrorList.push(validationErrorMsg);
    }
    if(isNaN(parseFloat(cookTime))) {
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
          "Instructions": draftToMarkdown(convertToRaw(editorState.getCurrentContent())),
          "Ingredients": ingredientsList,
          "Image": image,
          "DateModified": new Date().toJSON(),
          "DateCreated": new Date().toJSON(),
          "PrepTime": prep,
          "CookTime": cookTime,
          "Servings": servings,
          "Notes": notes
        }
      }).then((res) => {
        setValidationErrors([]);
        setRecipeID(res.data.id);
        setCreateRecipeSuccess(true);
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
          setCookTime(event.target.value);
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
    const imageInput = document.getElementById("addRecipePhoto");

    // Citation: The following code allows for the user to attach a file onto a FormData model object. This object has the correct file type for axios to communicate to the server.
    // link @ https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios
    var formData = new FormData();
    formData.append("fileUpload", imageInput.files[0]);
    axios.post('https://localhost:5001/api/recipes/image-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.token}`
      },
      data: formData

    }).then((res) => {
      if(res.status === 200 && imageInput.files[0] != null) {
        SetImage(res.data);
        setImageUploadMessage("Successfully uploaded image.");
      }
      else {
        setImageUploadMessage("Image upload failed.");
      }
    });
  }

  function AddIngredientForm(event) {
    // Summary:
    //  This function will add the required input fields to add an ingredient to the ingredient section once called upon.
    event.preventDefault();
    const ingredientSection = document.getElementById("ingredientBlock");
    const newIngredient = document.createElement("DIV");
    let childCount = ingredientSection.childElementCount;
    const newInput = document.createElement("INPUT");
    const newLabel = document.createElement("LABEL");
    const newQuantity = document.createElement("INPUT");
    const newQuantityLabel = document.createElement("LABEL");
    const newMeasureSelect = document.createElement("SELECT");
    const newMeasureLabel = document.createElement("LABEL");

    // Set the attributes for the input fields.
    newLabel.setAttribute("for", `ingredient${childCount / 4 + 1}`);
    newLabel.setAttribute("key", `ingredient${childCount / 4 + 1}`);
    newLabel.setAttribute("class", "block pl-4 pb-2 border-t-4 mt-2");
    newLabel.innerHTML = "Ingredient";
    newInput.setAttribute("id", `ingredient${childCount / 4 + 1}`);
    newInput.setAttribute("type", "text");
    newInput.setAttribute("class", "ingredientInput input-field mx-2 focus:outline-none focus:shadow-outline w-3/4");

    newQuantityLabel.setAttribute("for", `quantity${childCount / 4 + 1}`);
    newQuantityLabel.setAttribute("key", `quantity${childCount / 4 + 1}`);
    newQuantityLabel.setAttribute("class", "block pl-4 pb-2");
    newQuantityLabel.innerHTML = `Quantity`;
    newQuantity.setAttribute("id", `quantity${childCount / 4 + 1}`);
    newQuantity.setAttribute("class", "ingredientInput input-field mx-2 focus:outline-none focus:shadow-outline w-3/4");
    newQuantity.setAttribute("type", "number");

    newMeasureLabel.setAttribute("id", `measurement${childCount / 4 + 1}`);
    newMeasureLabel.setAttribute("key", `measurement${childCount / 4 + 1}`);
    newMeasureLabel.setAttribute("class", "block pl-4 pb-2");
    newMeasureLabel.innerHTML = "Measurement";

    newMeasureSelect.setAttribute("id", `measurement${childCount / 4 + 1}`);
    newMeasureSelect.setAttribute("key", `measurement${childCount / 4 + 1}`);
    newMeasureSelect.setAttribute("class", "border border-solid mx-4 ingredientInput");
    // Add the measurement options to the select field.
    for(let measurement in measurementsList) {
      const newOption = document.createElement("OPTION");
      newOption.setAttribute("value", `${measurementsList[measurement]}`);
      newOption.innerHTML = `${measurementsList[measurement]}`;
      newMeasureSelect.appendChild(newOption);
    }

    newIngredient.setAttribute("class", "block");
    // Add the new input fields to the section
    newIngredient.appendChild(newLabel);
    newIngredient.appendChild(newInput);
    newIngredient.appendChild(newQuantityLabel);
    newIngredient.appendChild(newQuantity);
    newIngredient.appendChild(newMeasureLabel);
    newIngredient.appendChild(newMeasureSelect);
    ingredientSection.appendChild(newIngredient);
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

  const redirect = () => {
    const locationState = location.state;
    const path = locationState ? locationState.from.pathname : `/recipes/${recipeID}`;
    history.push(path);
  }

  /*============================================================*/
  /*                   State Refresh
  /*============================================================*/
  useEffect(()=> {
    async function getUOMs() {
      // Summary:
      //   This function will obtain the units of measure currently in the database and set the measurement list for the user to choose from.
      const response = await axios.get('/api/UOMs/all', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setMeasurementsList(response.data);
      setLoading(false);
    }

    async function getRecipeCategories() {
      // Summary:
      //   This function will obtain the recipe categories currently in the database and set the measurement list for the user to choose from.
      const res = await axios.get('/api/recipecategories/options', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setRecipeCategoryList(res.data);
      setLoading(false);
    }

    getUOMs();
    getRecipeCategories();
  },[loading, user.token]);

  useEffect(()=> {
    const errorList = [];
    if(validationErrors.length > 0) {
      setResponseHeader("ERROR: There was a problem with your recipe!");
      for(let error in validationErrors)
      {
        errorList.push(<li key={`error-${error}`} className="list-disc text-red-800">{validationErrors[error]}</li>);
      }
      setErrorMessage(errorList);
    }
  }, [validationErrors]);

  useEffect(() => {
    if(createRecipeSuccess) {
      redirect();
    }
  }, [createRecipeSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="container my-4 w-full">
        <div className="block text-center my-4">
          <h1 className="font-bold text-lg">Add a New Recipe</h1>
        </div>
        <h1 className="font-extrabold">{responseHeader}</h1>
        <ul>
          {errorMessage}
        </ul>
        <form onSubmit={SubmitRecipe} >
          <section id="addRecipeBasics" className="flex-wrap md:flex-nowrap border-t-4 flex flex-row py-4">
            <div className="w-screen md:w-1/2 ">
              <h2 className="font-bold">Basic Information</h2>
              <p>Please enter some information about your new recipe!</p>
            </div>
            <div className="w-full md:w-1/2 md:pl-12">
              <label htmlFor="addRecipeName" className="block pl-4 pb-2">Name(*):</label>
              <input className="input-field mx-2 focus:outline-none focus:shadow-outline w-3/4" type="text" id="addRecipeName" onChange={HandleFormChange} />
              <div className="py-4">
                <label id="photoLabel" htmlFor="addRecipePhoto" className="pl-4 block pb-2">Photo:</label>
                <p className="font-bold pl-4">{imageUploadMessage}</p>
                <input type="file" className="pl-4 w-3/4 md: w-full" accept="image/x-png,image/gif,image/jpeg" id="addRecipePhoto" />
                <div className="px-4 text-sm block">
                  <p>Upload a file</p>
                  <p>PNG, JPEG, up to 10MB</p>
                </div>
                <button className="cursor-pointer purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline ml-4" onClick={PhotoUpload}>Upload</button>
              </div>
              <div>
                <label htmlFor="addRecipePrepTime" className="block pl-4 pb-2">Prep. Time(*)(min):</label>
                <input className="input-field mx-2 focus:outline-none focus:shadow-outline w-3/4" type="number" id="addRecipePrepTime" onChange={HandleFormChange} />
              </div>
              <div>
                <label htmlFor="addRecipeCookTime" className="block pl-4 pb-2">Cook Time(*)(min):</label>
                <input className="input-field mx-2 focus:outline-none focus:shadow-outline w-3/4" type="number" id="addRecipeCookTime" onChange={HandleFormChange} />
              </div>
              <div>
                <label htmlFor="addRecipeServings" className="block pl-4 pb-2">Servings:</label>
                <input className="input-field mx-2 focus:outline-none focus:shadow-outline w-3/4" type="number" id="addRecipeServings" onChange={HandleFormChange} />
              </div>
              <div>
                <label htmlFor="addRecipeCategory" className="block pl-4 pb-2">Recipe Category(*):</label>
                <select className="border border-solid mx-4" id="addRecipeCategory" onChange={HandleFormChange} >
                  <option defaultValue="0" />
                  {recipeCategoryList.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>
          </section>
          <section id="addRecipeRequirements" className="border-t-4">
            <section id="ingredientSection" className="flex flex-row py-4 flex-wrap md:flex-nowrap">
              <div className="w-full md:w-1/2">
                <h2 className="font-bold">Ingredients</h2>
                <p>Please enter in the ingredients required to make your new recipe!</p>
                <button className="my-4 block purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline" onClick={AddIngredientForm} >Add Another Ingredient</button>
              </div>
              <div className="w-full md:w-1/2 md:pl-12" id="ingredientBlock">
                <div className="block">
                  <label htmlFor="ingredient1" className="block pl-4 pb-2">Ingredient:</label>
                  <input className="ingredientInput input-field mx-2 focus:outline-none focus:shadow-outline w-3/4" type="text" id="ingredient1" onChange={HandleFormChange} />
                  <label htmlFor="quantity1" className="block pl-4 pb-2">Quantity:</label>
                  <input className="ingredientInput input-field mx-2 focus:outline-none focus:shadow-outline w-3/4" type="number" id="quantity1" onChange={HandleFormChange} />
                  <label htmlFor="measurement1" className="block pl-4 pb-2">Measurement:</label>
                  <select className="border border-solid mx-4 ingredientInput" id="measurement1" onChange={HandleFormChange} defaultValue="0">
                    <option value="0"></option>
                    {measurementsList.map((measurement) => {
                      return (
                        <option className="pl-4" key={measurement} value={measurement}>{measurement}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </section>
            <section id="instructionSection" className="border-t-4 py-4">
              <h3 className="font-bold block">Instructions:</h3>
              <p>Enter the instructions to your new recipe below!</p>
              <div className="input-field">
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="markdown"
                  onEditorStateChange={onEditorStateChange}
                  toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                  }}
                  />
              </div>
            </section>
          </section>
          <section id="addRecipeNutritional" className="py-4 border-t-4 flex flex-row flex-wrap md:flex-nowrap">
            <div className="w-full md:w-1/2">
              <h2 className="font-bold">Nutritional  Information</h2>
              <p>Please enter in the nutritional information for your new recipe!</p>
            </div>
            <div className="w-full md:w-1/2 md:pl-12">
              <div>
                <label htmlFor="addCarb" className="block pl-4 pb-2">Carbohydrates(*)</label>
                <input className="input-field mx-2 focus:outline-none focus:shadow-outline w-3/4" type="number" id="addCarb" onChange={HandleFormChange} />
              </div>
              <div>
                <label htmlFor="addFat" className="block pl-4 pb-2">Fats(*)</label>
                <input className="input-field mx-2 focus:outline-none focus:shadow-outline w-3/4" type="number" id="addFat" onChange={HandleFormChange} />
              </div>
              <div>
                <label htmlFor="addProtein" className="block pl-4 pb-2">Proteins(*)</label>
                <input className="input-field mx-2 focus:outline-none focus:shadow-outline w-3/4" type="number" id="addProtein" onChange={HandleFormChange} />
              </div>
            </div>
          </section>
          <section className="my-3 border-t-4 flex flex-row py-4 flex-wrap md:flex-nowrap" >
            <div className="w-full md:w-1/2">
              <h2 className="font-bold">Additional</h2>
              <p>Add any additional notes to your recipe here!</p>
            </div>
            <div className="w-full md:w-1/2 md:pl-12">
              <label htmlFor="addRecipeExtraNotes" className="block pl-4 pb-2">Extra Notes:</label>
              <textarea className="block input-field w-3/4 h-full lg:w-1/2 focus:outline-none focus:shadow-outline resize-none" id="addRecipeExtraNotes" onChange={HandleFormChange} />
            </div>
          </section>
          <input className=" my-6 cursor-pointer purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline" type="submit" value="Submit" />
          </form>
        </div>
    </>
  );
};

export default AddRecipe;
