import dayjs from 'dayjs';
import Plan from './Plan';

export class Plans {
  _plans;

  constructor(plans) {
    this._plans = plans ?? []
  }

  byDate(date) {
    date = dayjs(date).startOf('day');

    return this._plans.find(x => date.isSame(x.day));
  }

  removeMeal(date, time) {
    const plan = this.byDate(date)
    if(!plan) { return this };

    const newPlan = plan.removeMeal(time);
    return new Plans(
      this._plans.map(x =>
        x.day.isSame(newPlan.day) ? newPlan : x
      )
    );
  }

  addOrUpdateMeal(date, time, recipeId) {
    const oldPlan = this.byDate(date);
    let newPlans;

    if(oldPlan) {
      // Update the recipe
      const newPlan = oldPlan.addOrUpdateRecipe(time, recipeId);
      newPlans = this._plans
        .map(plan =>
          plan.day.isSame(newPlan.day) ? newPlan : plan
        );

    } else {
      // Create a new meal with the given recipe
      newPlans = [
        ...this._plans,
        Plan
          .Create(date)
          .addOrUpdateRecipe(time, recipeId)
      ];
    }
    return new Plans(newPlans);
  }

  toJson() {
    return this._plans.map(x => x.toJson());
  }

  static fromJson(data) {
    if(!data) { throw Error("Plans cannot be null"); }
    if(!data instanceof Array) { throw Error("Plans expects an array of json plans") }

    return new Plans(data.map(x=> Plan.fromJson(x)))
  }

  static Create() {
    return new Plans([])
  }
}

export default Plans;
