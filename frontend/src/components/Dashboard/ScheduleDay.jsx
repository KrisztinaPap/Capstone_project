import React from 'react';
import Meal from './Meal';

export default ({date, plan, recipes, isEditing, fetchRecipe}) => {

  const getModel = (time) => {
    return plan ? plan.mealByTime(time) : null
  }


  return (
    <div className="border border-gray-600 divide-y divide-gray-600">
      <div className="text-center p-2">
        <div>
          {date.format('ddd')}
        </div>
        <div>
          {date.format('DD')}
        </div>
      </div>

      <Meal date={date} time="breakfast" model={getModel("breakfast")} fetchRecipe={fetchRecipe} isEditing={isEditing} />

      <Meal date={date} time="lunch" model={getModel("lunch")}  recipes={recipes} isEditing={isEditing} />

      <Meal date={date} time="dinner" model={getModel("dinner")}  recipes={recipes} isEditing={isEditing} />
    </div>
  );
}
