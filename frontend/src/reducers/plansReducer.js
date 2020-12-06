import Plans from '../models/Plans';

export const plansReducer = (state, action) => {
  if(!action) { return state; }

  let pl;
  switch(action.type) {
    case "plans/update_recipe":
      pl = action.payload;
      return state.addOrUpdateMeal(pl.day, pl.time, pl.recipeId);

    case "plans/moveRecipe":
      pl = action.payload
      return state
        .removeMeal(pl.from, pl.fromTime)
        .addOrUpdateMeal(pl.to, pl.toTime, pl.recipeId);

    case "plans/removeRecipe":
      pl = action.payload
      return state
        .removeMeal(pl.from, pl.fromTime)

    case "plans/loadPeriod":
      pl = action.payload;
      return Plans.fromJson(pl)

    default:
      return state;
  }
}

export const updateMeal = (day, time, recipeId) => {
  return {
    type: "plans/update_recipe",
    payload: {day, time, recipeId}
  }
}

export const moveMeal = (from, fromTime, to, toTime, recipeId) => {
  return {
    type: "plans/moveRecipe",
    payload: {from, fromTime, to, toTime, recipeId}
  }
}

export const removeMeal = (from, fromTime, recipeId) => {
  return {
    type: "plans/removeRecipe",
    payload: {from, fromTime, recipeId}
  }
}

export const loadPeriod = (jsonData) => {
  return {
    type: "plans/loadPeriod",
    payload: jsonData
  }
}

export default plansReducer;
