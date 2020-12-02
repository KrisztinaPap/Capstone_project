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
  const [calories, SetCalories] = useState();
  const [tags, SetTags] = useState();
  const [image, SetImage] = useState();
  const [prep, SetPrep] = useState();
  const [servings, SetServings] = useState();
  const [notes, SetNotes] = useState();
  const [response, setResponse] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [message, setMessage] = useState("");

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
      data: {
        "CategoryId": parseInt(recipeCategory),
        "Name": name,
        "Fat": fats,
        "Protein": proteins,
        "Carbohydrates": carbohydrates,
        "Calories": 0,
        "Instructions": editorState,
        "Ingredients": [],
        // Tags: tags,
        // Image: image,
        "DateModified": new Date().toJSON(),
        "DateCreated": new Date().toJSON(),
        "PrepTime": prep,
        "Servings": servings,
        // Notes: notes
      }
    }).then((res) => {
      setResponse(res.data);
      setStatusCode(res.status);
    })
    .catch((err) => {
      setResponse(err.response.data);
      setStatusCode(err.response.status);
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
              <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="ingredient1" />
              <label htmlFor="quantity1">Quantity:</label>
              <input className="input-field mx-2 focus:outline-none focus:shadow-outline" type="text" id="quantity1" />
              <label htmlFor="measurement1">Measurement:</label>
              <select id="measurement1">
                {measurementsList.map((measurement) => {
                  return (
                    <option value={measurement}>{measurement}</option>
                  );
                })}
              </select>
            </section>
            <button className="purple-button hover:bg-purple-700 focus:outline-none focus:shadow-outline" onClick={AddIngredients} >+</button>
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
