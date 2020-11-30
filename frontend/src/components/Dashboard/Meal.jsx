import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';


export default ({date, time, model, recipes, isEditing}) => {
  const stringDate = date ? date.format('YYYY/MM/DD') : ""
  const id = `${stringDate}-${time.toLowerCase()}`;

  let recipe;
  let index = 1;
  if(model) {
    recipe = recipes.find(r => r.id === model.recipeId);
  }

  return (
    <div className="meal-container">
      {time}

      <Droppable droppableId={id} type="recipes" isDropDisabled={!isEditing}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
          >
            { recipe &&
              <Draggable key={recipes.id} draggableId={`${id}-${recipe.id}`} index={index} isDragDisabled={!isEditing} className="h-full">
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}

                  >
                    <div className="swiper-item lg:w-full">
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
