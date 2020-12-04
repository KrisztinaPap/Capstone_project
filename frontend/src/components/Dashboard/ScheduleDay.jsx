import React from 'react';
import Meal from './Meal';

export default ({date, plan, isEditing, fetchRecipe}) => {

  const getModel = (time) => {
    return plan ? plan.mealByTime(time) : null
  }


  return (
    <div className="border border-gray-600 divide-y divide-gray-600">
      <div className="bg-purple-500 text-center p-2">
        <div className="font-bold">
          {date.format('ddd')}
        </div>
        <div className="font-bold">
          {date.format('DD')}
        </div>
      </div>

      <Meal date={date} time="breakfast" model={getModel("breakfast")} fetchRecipe={fetchRecipe} isEditing={isEditing} />

      <Meal date={date} time="lunch" model={getModel("lunch")}  fetchRecipe={fetchRecipe} isEditing={isEditing} />

      <Meal date={date} time="dinner" model={getModel("dinner")}  fetchRecipe={fetchRecipe} isEditing={isEditing} />
    </div>
  );
}
