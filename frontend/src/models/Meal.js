import MealTime from './MealTime'

export class Meal {
  _id;
  _mealTime;
  _recipes = [];

  /**
   * @returns {number} Current id assigned to the meal.
   */
  get id() {
    return this._id;
  }

  /**
   * @returns {MealTime} The time this meal is for.
   *                     Eg: 'breakfast', 'lunch', 'dinner'
   */
  get mealTime() {
    return this._mealTime;
  }

  /**
   * @returns {number} Id for the recipe attached to
   *                   to the current meal.
   */
  get recipeId() {
    // We grab the first recipe only because our front-end
    // only supports a single recipe for each meal. Our data model
    // is more robust here incase there was time to
    // add support for more multiple recipes.
    return this._recipes[0]
  }

  constructor(id, mealTime, recipes) {
    this._id = id ? id : 0
    this._mealTime = MealTime.From(mealTime)
    this._recipes = recipes ?? []
  }

  /**
   * Updates the meal to a new recipe.
   * @param {number} recipeId new recipe id for the meal
   * @returns {Meal} a new updated meal instance.
   */
  updateRecipe(recipeId) {
    return new Meal(
      this._id,
      this._mealTime,
      [recipeId]
    );
  }

  /**
   * Determines if the given value is the current meals' mealTime
   * @param {string, int, MealTime} time The given meal time
   */
  isMealTime(time) {
    return this._mealTime.equals(time);
  }

  toJson() {
    const json = {
      mealTime: this.mealTime.toString(),
      recipes: this._recipes
    }

    if(this._id !== 0) {
      json.id = this._id
    }

    return json;
  }

  static fromJson(meal) {
    if(!meal) { throw Error("Meal data cannot be null"); }

    const rawId = parseInt(meal._id);
    const id = !isNaN(rawId) ? rawId : 0
    const mealTime = MealTime.From(meal.mealTime)
    const recipes = meal.recipes
      .map(x => parseInt(x))
      .filter(x => !isNaN(x));

    return new Meal(id, mealTime, recipes);
  }

  /**
   * Creates a new meal instance.
   *
   * @param {string} time MealTime Identifier
   * @param {number} recipeId Id for the connected recipe
   * @returns {Meal} a newly created meal instance.
   */
  static Create(time, recipeId) {
    const recipes = recipeId ? [recipeId] : []

    return new Meal(0, time, recipes)
  }
}

export default Meal;
