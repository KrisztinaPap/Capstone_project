import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';


export default ({date, time, model, recipes}) => {
  const stringDate = date ? date.format('YYYY/MM/DD') : ""
  const id = `${stringDate}-${time.toLowerCase()}`;

  let recipe;
  let index = 1;
  if(model !== null) {
    recipes.forEach(r => {
      if(r.id === model[0].recipeId) {
        recipe = r; // ALSO FIX <- Horrible
      }
    });
  }

  return (
    <div className="meal-container">
      {time}

      <Droppable droppableId={id} type="recipes">
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
          >
            { recipe &&
              <Draggable key={recipes.id} draggableId={`${id}-${recipe.id}`} index={index} className="h-full">
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
