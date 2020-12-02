import dayjs from 'dayjs';

/**
 * Encoder/Decoder for Drag and Drop Meal Recipe Draggable ids
 */
export class DraggableMealRecipeId {
  /**
   * Encodes a recipeId into string format which
   * can be used to uniquely identify a recipe in a
   * Drag-n-Drop context.
   *
   * @param {int} id encoded id
   * @returns {string}
   */
  static encode(day, time, recipeId) {
    day = dayjs(day).format('YYYY-MM-DD');
    return `${day}.${time}.${recipeId}`;
  }

  /**
   * Encodes a recipeId into string format which
   * can be used to uniquely identify a recipe in a
   * Drag-n-Drop context.
   *
   * @param {int} id encoded id
   * @returns {{day: Date}}
   */
  static decode(encoding) {
    const [planDateRaw, mealTime, rawRecipeId] = encoding.split('.');
    const planDate = dayjs(planDateRaw);
    const recipeId = parseInt(rawRecipeId);

    return { day: planDate, time: mealTime, recipeId: recipeId};
  }
}


/**
 * Encoder/Decoder for Drag and Drop Meal Droppable ids
 */
export class DroppableMealId {
  /**
   * Encodes a recipeId into string format which
   * can be used to uniquely identify a recipe in a
   * Drag-n-Drop context.
   *
   * @param {int} id encoded id
   * @returns {string}
   */
  static encode(day, time) {
    day = dayjs(day).format('YYYY-MM-DD');
    return `${day}.${time}`;
  }

  /**
   * Encodes a recipeId into string format which
   * can be used to uniquely identify a recipe in a
   * Drag-n-Drop context.
   *
   * @param {int} id encoded id
   * @returns {{day: Date}}
   */
  static decode(encoding) {
    const [planDayRaw, time] = encoding.split('.');
    const planDay = dayjs(planDayRaw);

    return { day: planDay, time: time };
  }
}


/**
 * Encoder/Decoder for Drag and Drop Recipe Draggable ids
 */
export class DraggableRecipeId {

  /**
   * Encodes a recipeId into string format which
   * can be used to uniquely identify a recipe in a
   * Drag-n-Drop context.
   *
   * @param {int} id encoded id
   * @returns {string}
   */
  static encode(id) {
    return `recipe.${id}`
  }


  /**
   * Decodes an encoded Drag-n-Drop recipeId back to
   * a number.
   *
   * @param {string} id encoded id
   * @returns {number}
   */
  static decode(encoding) {
    const [_, id] = encoding.split('.');
    return parseInt(id);
  }
}
