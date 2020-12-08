import React from 'react';
import { Link } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DraggableMealRecipeId, DroppableMealId } from '../../utils/dndIdCoders';



export default ({date, time, model, isEditing, isLoading, fetchRecipe}) => {
  const id = DroppableMealId.encode(date, time);

  let recipe;
  let recipeId;
  const index = 1; //Always index one because we only support a single recipe.

  const getListClass = (isDragging) => {
    return isDragging ? "bg-blue-200" : ""
  };

  const getStyle = (style, snapshot) => {
    if (!snapshot.isDragging) return {};
    if(!snapshot.isDropAnimating) {
      return style;
    }

    return {
      ...style,
      transitionDuration: `0.001s`,
    };
  }

  const wrapInLink = (recipeJSX) => {
    return (
        <Link to={`/recipes/${recipe.id}`}>
          {recipeJSX}
        </Link>
      );
  }

  const renderRecipe = () => {
    const r = (
      <div className="select-none m-1 px-2 py-4 bg-indigo-600 text-white rounded-md md:py-2 text-center">
        <p>{recipe.name}</p>
      </div>
    );

    return isEditing ?  r : wrapInLink(r)
  }

  if(model && !isLoading) {
    recipe = fetchRecipe(model.recipeId);
    recipeId = DraggableMealRecipeId.encode(date, time, recipe.id);
  }

  return (
    <div className="flex flex-col justify-center">
      <span className="text-center text-gray-600 font-black uppercase text-xs">{time}</span>

      <Droppable droppableId={id} type="recipes" isDropDisabled={!isEditing}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            className={`min-h-32 ${getListClass(droppableSnapshot.isDraggingOver)}`}
          >
            <div className="lg:h-auto lg:hidden">
              {droppableProvided.placeholder}
            </div>
            { recipe &&
              <Draggable draggableId={recipeId} index={index} isDragDisabled={!isEditing} className="h-full">
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    style={getStyle(draggableProvided.draggableProps.style, draggableSnapshot)}
                  >
                    { renderRecipe() }
                  </div>
                )}
              </Draggable>
            }
          </div>
        )}
      </Droppable>
    </div>
  );
}
