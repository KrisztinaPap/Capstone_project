export class MealTime {
  static Breakfast = () => new MealTime("breakfast", -1);
  static Lunch = () => new MealTime("lunch", -2);;
  static Dinner = () => new MealTime("dinner", -3);;

  static From(value) {
    if(typeof(value) === "number") {
      return MealTime.FromInt(value);
    }

    if(typeof(value) === "string") {
      return MealTime.FromString(value);
    }
  }

  static FromInt(value) {
    if(MealTime.Breakfast().toInt() === value) {
      return MealTime.Breakfast();
    }

    if(MealTime.Lunch().toInt() === value) {
      return MealTime.Lunch();
    }

    if(MealTime.Dinner().toInt() === value) {
      return MealTime.Dinner()
    }
    return null;
  }

  static FromString(value) {
    value = value.toLowerCase();
    if(MealTime.Breakfast().toString() === value) {
      return MealTime.Breakfast();
    }

    if(MealTime.Lunch().toString() === value) {
      return MealTime.Lunch()
    }

    if(MealTime.Dinner().toString() === value) {
      return MealTime.Dinner()
    }
    return null;
  }

  _value;
  _id;

  constructor(value, id) {
    this._value = value
    this._id = id
  }

  /**
   * Determines if the given value is equivalent to the current MealTime.
   *
   * @param {string, int, MealTime} other Other instance to compare to
   */
  equals(other) {
    if(typeof(other) === "number") {
      return this._id === other;
    }

    if(typeof(other) === "string") {
      return this._value.toLowerCase() === other.toLowerCase();
    }

    if(other instanceof MealTime) {
      return this._id === other._id;
    }

    return false;
  }

  toInt() {
    return this._id;
  }

  toString() {
    return this._value;
  }
}

export class Meal {
  _data;

  /**
   * @returns {string} The time this meal is for.
   *                   Eg: 'breakfast', 'lunch', 'dinner'
   */
  get mealTime() {
    return MealTime.FromInt(this._data.mealTimeId).toString();
  }

  /**
   * @returns {number} Id for the recipe attached to
   *                   to the current meal.
   */
  get recipeId() {
    // We reach into meals and grab the first
    // recipe only because our front-end only supports
    // a single recipe for each meal. Our data model
    // is more robust here incase there was time to
    // add support for more multiple recipes.
    return this._data.mealRecipes[0].recipeId;
  }

  constructor(mealData) {
    this._data = mealData;
  }

  /**
   * Updates the meal to a new recipe.
   * @param {number} recipeId new recipe id for the meal
   * @returns {Meal} a new updated meal instance.
   */
  updateRecipe(recipeId) {
    return new Meal({
      ...this._data,
      mealRecipes: [{
        ...this._data.mealRecipes[0],
        recipeId: recipeId
      }]
    })
  }

  /**
   * Determines if the given value is the current meals' mealTime
   * @param {string, int, MealTime} time The given meal time
   */
  isMealTime(time) {
    return MealTime
      .FromInt(this._data.mealTimeId)
      .equals(time);
  }

  toJson() {
    return {
      ...this._data,
      mealRecipes: this._data.mealRecipes.map(x => {return {...x}})
    }
  }

  /**
   * Creates a new meal instance.
   *
   * @param {string} time MealTime Identifier
   * @param {number} recipeId Id for the connected recipe
   * @returns {Meal} a newly created meal instance.
   */
  static Create(time, recipeId) {
    let timeId = MealTime.FromString(time).toInt();

    return new Meal({
      mealTimeId: timeId,
      mealRecipes: [{
          recipeId: recipeId
      }]
    })
  }
}

export class Plan {
  _data;

  // memoised version of the plans date
  // as a Javascript Date object.
  _day;

  // memoised version of meals
  // as meal object.
  _meals;

  get day() {
    if(!this._day)
    {
      const rawDay = this._data.day;
      const timeDataIndex = rawDay.indexOf('T');
      const [year, month, day] = (timeDataIndex === -1) ?
          this._data.day.split('-') :
          this._data.day.substring('0', timeDataIndex).split('-');

      // Subtract a day from month because JS is insane and
      // Date months are 0 indexed.
      this._day = new Date(year, month-1, day);
    }
    return this._day;
  }

  get meals() {
    if(!this._meals) {
      this._meals = this._data.meals.map(x=> new Meal(x));
    }
    return this._meals;
  }

  constructor(planData) {
    if(!planData) { throw Error("plan data cannot be null"); }

    this._data = planData
  }

  mealByTime(time) {
    return this.meals.find(x => x.isMealTime(time))
  }

  addOrUpdateRecipe(time, recipeId) {
    const oldMeal = this.meals.find(x => x.isMealTime(time));

    let meals;
    if(oldMeal) {
      // Update the recipe
      const oldMealTime = oldMeal.mealTime;
      const meal = oldMeal.updateRecipe(recipeId);
      meals = this._data.meals
        .map(x => {
          // if the current meal (x) has a meal time
          // that matches the oldMeal time then swap
          // out the oldMeal with the newly updated
          // meal.
          if(oldMeal.isMealTime(x.mealTimeId)) {
            return meal.toJson();
          } else {
            return x;
          }
        });
    } else {
      // Create a new meal with the given recipe
      meals = [
        ...this._data.meals,
        Meal.Create(time, recipeId).toJson()
      ];
    }

    return new Plan({
      ...this._data,
      meals: meals
    })
  }

  toJson() {
    return {
      ...this._data,
      meals: [
        ...this.meals.map(x => x.toJson())
      ]
    }
  }

  static Create(day) {
    return new Plan({
      day: day.toISOString(),
      meals: []
    })
  }
}

export class Plans {
  _plans;

  constructor(plansData) {
    if(!plansData) { throw Error("Plans cannot be null"); }
    this._plans = plansData.map(x=> new Plan(x))
  }

  byDate(date) {
    if(!date instanceof Date) { throw Error("Date must be a Javascript Date") }
    date = this._ensureStartOfDay(date);

    return this._plans.find(x => x.day.getTime() === date.getTime());
  }

  addOrUpdateRecipe(date, time, recipeId) {
    const oldPlan = this.byDate(date);
    let newPlans;

    if(oldPlan) {
      // Update the recipe
      const newPlan = oldPlan.addOrUpdateRecipe(time, recipeId);
      newPlans = this._plans
        .map(plan => {
          console.log("[Old Plan] ", oldPlan);
          console.log("[New Plan] ", newPlan);
          if(plan.day.getTime() === newPlan.day.getTime()) {
            return newPlan;
          } else {
            return plan;
          }
        });
    } else {
      // Create a new meal with the given recipe
      const newPlan = Plan
        .Create(date)
        .addOrUpdateRecipe(time, recipeId);

      newPlans = [
        ...this._plans,
        newPlan
      ];
    }

    return Plans.Create(newPlans);
  }


  _ensureStartOfDay(date) {
    // Ensure the given date is comparing by date
    // only and not time.
    const newDate = new Date(date.getTime());
    newDate.setHours(0,0,0,0);
    return newDate;
  }

  static Create(newPlans) {
    return new Plans(newPlans.map(x => x.toJson()));
  }
}

export default (state, action) => {
  if(!action) { return state; }

  switch(action.type) {
    case "plans/update_recipe":
      const {day, time, recipeId} = action.payload;
      return state.addOrUpdateRecipe(day, time, recipeId);

    case "plans/load_period":
      const jsonPlans = action.payload;
      return new Plans(jsonPlans);

    default:
      return state;
  }
}
