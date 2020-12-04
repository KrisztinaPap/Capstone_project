import dayjs from 'dayjs';

const UpdateFocusDateType = 'scheduleView/focusDate';
const UpdatePeriodType = 'scheduleView/updatePeriod';

/**
 * Schedule reducer used to keep the current focused
 * date in sync with the view period and view dates.
 *
 * @param {{focusDate:dayjs, period:number, viewRange}} state State of the reducer.
 * @param {{type, payload}} action action to take.
 */
export const scheduleReducer = function(state, action) {
  if(!action) { return state; }

  switch(action.type) {
    case UpdateFocusDateType:
      const date = action.payload;
      return {
        ...state,
        focusDate: date,
        viewRange: updateRange(date, state.period)
      };

    case UpdatePeriodType:
      const period = action.payload;
      return {
        ...state,
        period: period,
        viewRange: updateRange(state.focusDate, period)
      };

    default:
      return state;
  }
}

/**
 * Builds a new default state for the scheduleReducer.
 *
 * @param {Date,Dayjs} focusDate Date that the schedule should focus on
 * @param {number} period Number of days that should be displayed
 */
export const getDefaultScheduleState = (focusDate, period) => {
  focusDate = dayjs(focusDate).startOf('day');

  return {
    period: period,
    focusDate: focusDate,
    viewRange: updateRange(focusDate, period)
  }
}

/**
 * Creates an action which can be used to update the
 * focus date in a ScheduleReducer.
 *
 * @param {Date,Dayjs} date the new focus date
 * @returns {Action} scheduleReducer action
 */
export const updateFocusDate = (date) => {
  return {
    type: UpdateFocusDateType,
    payload: dayjs(date).startOf('day')
  }
}

/**
 * Creates an action which can be used to update the
 * view period in a ScheduleReducer.
 *
 * @param {number} period The number of days to view
 * @returns {Action} scheduleReducer action
 */
export const updatePeriod = (period) => {
  return {
    type: UpdatePeriodType,
    payload: isNaN(period) ? 1 : period
  }
}

/**
 * Builds the viewRange which is used when building
 * the sites display.
 * @private
 */
const updateRange = (date, period) => {
  date = date.startOf('day');

  // If the period is just one day
  if(period === 1) {
    return [date, date];
  }

  // For a three day period split
  // the focused day in two
  if(period === 3) {
    return [
      date.subtract(1, 'day'),
      date.add(1, 'day'),
    ]
  }

  // For a 7 day period always
  // start the week on Sunday
  // and end on Saturday
  if(period >= 7) {
    return [
      date.startOf('week'),
      date.endOf('week')
    ]
  }

  // In all other scenarios start on the focus day
  // and add the period.
  return [
    date,
    date.add(period, 'day')
  ]
}
