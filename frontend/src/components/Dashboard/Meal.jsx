import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DraggableMealRecipeId, DroppableMealId } from '../../utils/dndIdCoders';



export default ({date, time, model, recipes, isEditing}) => {
  const id = DroppableMealId.encode(date, time);

  let recipe;
  let recipeId;
  const index = 1; //Always index one because we only support a single recipe.

  const getListStyle = (isDragging) => {
    return isDragging ? "bg-blue-200" : ""
  };


  if(model) {
    recipe = recipes.find(r => r.id === model.recipeId);
    recipeId = DraggableMealRecipeId.encode(date, time, recipe.id);
  }

  return (
    <div className="flex flex-col justify-center">
      <span className="text-center text-gray-600 font-black uppercase text-xs">{time}</span>

      <Droppable droppableId={id} type="recipes" isDropDisabled={!isEditing}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            className={`min-h-32 ${getListStyle(droppableSnapshot.isDraggingOver)}`}
          >
            { recipe &&
              <Draggable key={recipes.id} draggableId={recipeId} index={index} isDragDisabled={!isEditing} className="h-full">
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <div className="select-none m-1 px-2 py-1 bg-blue-800 text-white rounded-md">
                      <img src={recipe.image} />
                      <p className="">{recipe.name}</p>
                    </div>
                  </div>
                )}
              </Draggable>
            }

            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
