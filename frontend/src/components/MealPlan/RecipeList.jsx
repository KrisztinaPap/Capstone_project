import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DraggableRecipeId } from '../../utils/dndIdCoders';

export const RecipeList = ({isLoading, error, recipes, recipeCategories, retry}) => {
  const [activeFilter, setActiveFiler] = useState(0)

  const getRecipesDragStyle = (style, snapshot) => {
    if (!snapshot.isDragging) return {};
    return style;
  }

  if (isLoading) {
    return (
      <section className="mt-8">
        <p className="text-center">
          <i className="fas fa-spinner fa-spin fa-4x"></i>
        </p>
        <p className="text-center mt-2">
          Fetching Recipes...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-8">
        <p className="text-center">
          Failed fetching schedules. Please try again..
        </p>
        <p className="text-center mt-2">
          <button className="purple-button focus:outline-none focus:shadow-outline mr-1" type="submit" onClick={retry}>
            Retry
          </button>
          <Link to={"/"}>
            <button className="purple-button focus:outline-none focus:shadow-outline ml-1" type="submit">
              Return to Home Page
            </button>
          </Link>
        </p>
      </section>
    )
  }

  return (
    <section>
      <select className="text-lg border border-solid mb-6" id="addRecipeCategory" onChange={(e) => setActiveFiler(parseInt(e.target.value))} defaultValue="all">
        <option className="text-lg" value="0">All Recipes</option>
        {recipeCategories.map((category) => {
          return (
            <option key={category.id} value={category.id}>{category.name}</option>
          );
        })}
      </select>
      <Droppable droppableId="recipes" type="recipes">
      {({innerRef, droppableProps, placeholder}) => (

        <div
          ref={innerRef}
          {...droppableProps}
          className=""
        >
          <div className="flex flex-row items-start overflow-x-auto divide-gray-500 divide-solid lg:flex lg:divide-y lg:flex-col " >
              {recipes.map((recipes, index) => ( (activeFilter === 0 || recipes.CategoryId === activeFilter) &&
                <Draggable
                  key={recipes.id}
                  draggableId={DraggableRecipeId.encode(recipes.id)}
                  index={index}
                >
                  {({innerRef, draggableProps, dragHandleProps }, snapshot) => (
                    <div
                      ref={innerRef}
                      {...draggableProps}
                      {...dragHandleProps}
                      className="my-6 w-24 bg-white flex flex-col items-center justify-center mx-2 lg:my-0 lg:justify-start lg:flex-row lg:w-64"
                      style={getRecipesDragStyle(draggableProps.style, snapshot)}
                    >
                      <div className="bg-gray-200 w-full h-20 lg:mr-2 lg:w-2/5">
                        <img className="object-cover w-full h-full" src={recipes.image} alt=""/>
                      </div>
                      <p className="px-2 break-normal text-center lg:text-left lg:w-3/5">{recipes.name}</p>
                    </div>
                  )}
                </Draggable>
              ))}
          </div>
          {/* Quirk of react-beautiful-dnd we want to hide the place holder
          so that it doesn't cause expansion */}
          <div className="hidden">
            {placeholder}
          </div>
        </div>
      )}
    </Droppable>
  </section>
  )
}

export default RecipeList;
