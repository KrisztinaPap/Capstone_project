import React from 'react';
import Meal from './Meal';

export default ({date, plan, isEditing, isLoading, fetchRecipe}) => {

  const getModel = (time) => {
    return plan ? plan.mealByTime(time) : null
  }


  return (
    <div className="border border-gray-600 divide-y divide-gray-600">
      <div className="bg-purple-500 text-center p-2 text-white">
        <div className="font-black uppercase tracking-wider">
          {date.format('ddd')}
        </div>
        <div className="font-bold">
          {date.format('DD')}
        </div>
      </div>

      <Meal
        date={date}
        time="breakfast"
        model={getModel("breakfast")}
        fetchRecipe={fetchRecipe}
        isEditing={isEditing}
        isLoading={isLoading}
      />

      <Meal
        date={date}
        time="lunch"
        model={getModel("lunch")}
        fetchRecipe={fetchRecipe}
        isEditing={isEditing}
        isLoading={isLoading}
      />

      <Meal
        date={date}
        time="dinner"
        model={getModel("dinner")}
        fetchRecipe={fetchRecipe}
        isEditing={isEditing}
        isLoading={isLoading}
      />
    </div>
  );
}
