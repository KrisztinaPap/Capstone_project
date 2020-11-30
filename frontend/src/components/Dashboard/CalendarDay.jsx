import React from 'react';
import Meal from './Meal';

export default ({date, plan, recipes, isEditing}) => {

  const getModel = (time) => {
    return plan ? plan.mealByTime(time) : null
  }

  return (
    <div className="flex-1">
      <div className="text-center p-2">{date.toString()}</div>

      <Meal date={date} time="breakfast" model={getModel("breakfast")} recipes={recipes} isEditing={isEditing} />

      <Meal date={date} time="lunch" model={getModel("lunch")}  recipes={recipes} isEditing={isEditing} />

      <Meal date={date} time="dinner" model={getModel("dinner")}  recipes={recipes} isEditing={isEditing} />
    </div>
  );
}
