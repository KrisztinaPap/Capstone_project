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

    if(value instanceof MealTime) {
      return value;
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

export default MealTime;
