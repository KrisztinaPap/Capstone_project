import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DraggableMealRecipeId, DroppableMealId } from '../../utils/dndIdCoders';



export default ({date, time, model, recipes, isEditing}) => {
  const id = DroppableMealId.encode(date, time);

  let recipe;
  let recipeId;
  const index = 1; //Always index one because we only support a single recipe.

  if(model) {
    recipe = recipes.find(r => r.id === model.recipeId);
    recipeId = DraggableMealRecipeId.encode(date, time, recipe.id);
  }

  return (
    <div className="meal-container w-32">
      {time}

      <Droppable droppableId={id} type="recipes" isDropDisabled={!isEditing}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
          >
            { recipe &&
              <Draggable key={recipes.id} draggableId={recipeId} index={index} isDragDisabled={!isEditing} className="h-full">
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}

                  >
                    <div className="swiper-item">
                      <img src={recipe.image} />
                      <div className="select-none">
                        {recipe.name}
                      </div>
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
