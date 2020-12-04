import dayjs from 'dayjs';
import Meal from './Meal';
import MealTime from './MealTime';

export class Plan {
  _day;
  _meals;

  get day() {
    return this._day;
  }

  get meals() {
    return this._meals;
  }

  constructor(day, meals) {
    this._day = dayjs(day).startOf('day');
    this._meals = meals ?? []
  }

  mealByTime(time) {
    const mealTime = MealTime.From(time);
    return this.meals.find(x => x.isMealTime(mealTime))
  }

  removeMeal(time) {
    const mealTime = MealTime.From(time);
    return new Plan(
      this.day,
      this.meals.filter(x => !x.isMealTime(mealTime))
    );
  }

  addOrUpdateRecipe(time, recipeId) {
    const oldMeal = this.meals.find(x => x.isMealTime(time));

    let meals;
    if(oldMeal) {
      // Update the recipe
      const newMeal = oldMeal.updateRecipe(recipeId);
      // if the current meal (x) has a meal time
      // that matches the oldMeal time then swap
      // out the oldMeal with the newly updated
      // meal.
      meals = this.meals
        .map(x => oldMeal.isMealTime(x.mealTime) ? newMeal : x);
    } else {
      // Create a new meal with the given recipe
      meals = [
        ...this.meals,
        Meal.Create(time, recipeId)
      ];
    }

    return new Plan(
      this.day,
      meals
    )
  }

  toJson() {
    return {
      day: this.day.format('YYYY-MM-DD'),
      meals: this.meals.map(x => x.toJson())
    }
  }

  static fromJson(data) {
    if(!data) { throw Error("Plan data cannot be null"); }
    return new Plan(
      data.day,
      data.meals.map(x => Meal.fromJson(x))
    );
  }

  static Create(day) {
    return new Plan(day, []);
  }
}

export default Plan;
