import React from 'react';
import dayjs from 'dayjs';
import ScheduleDay from './ScheduleDay';

const ShortMonthDayFormat = 'MMM DD';

/**
 * Defines a constant indicating the user wants to move
 * forward in time.
 */
export const Forward = 'forward';

/**
 * Defines a constant indicating the user wants to move
 * backward in time.
 */
export const Backward = 'backward';

/**
 * Defines a constant indicating the user wants to jump to
 * a specific date.
 */
export const Jump = 'jump';


export const Schedule = ({isEditing, toggleEditing, plans, viewPeriod, onMove, fetchRecipe, className}) => {
  /**
   * Moves the user forward by the time interval.
   */
  const moveForward = () => onMove(Forward);

  /**
   * Moves the user backward by the time interval.
   */
  const moveBackwards = () => onMove(Backward);

  /**
   * Moves the user to focus on the current day.
   */
  const moveToToday = () => onMove(Jump, dayjs().startOf('day'));

  /**
   * Representation of the datePeriod as a displayable
   * string.
   *
   * Handles single day format, along with multi-day span format.
   *
   * @returns string date period as string
   */
  const displayPeriod = () => {
    const [start, end] = viewPeriod;

    if(start === end) {
      return start.format(ShortMonthDayFormat);
    } else {
      return `${start.format(ShortMonthDayFormat)} - ${end.format(ShortMonthDayFormat)}`
    }
  }

  /**
   * Get all dates between and including the datePeriods
   * start date and the end date.
   *
   * @returns Array<moment> Array of dayjs dates.
   */
  const getPeriodSpan = (period) => {
    const dates = [];
    const [start, end] = period;

    if(start.diff(end) === 0) {
      dates.push(start);
    } else {
      let currentDate = start;

      while(currentDate.diff(end) < 0) {
        dates.push(currentDate);
        currentDate = currentDate.add(1, 'days');
      }
    }

    return dates;
  }


  return (
    <div className={`flex-1 ${className}`}>
      <div className="flex items-center p-2 justify-between">

        <div className="flex items-center">
          <button onClick={moveBackwards}>
            <i className="far fa-arrow-alt-circle-left fa-2x"></i>
          </button>

          <div className="inline px-3">{displayPeriod()}</div>

          <button onClick={moveForward}>
            <i className="far fa-arrow-alt-circle-right fa-2x"></i>
          </button>

          <button
            className="border-2 border-solid border-black rounded-md px-2 shadow mx-2"
            onClick={moveToToday}
          >
            Today
          </button>
        </div>


        <button
          className="border-2 border-solid border-black rounded-md px-2 shadow mx-2"
          onClick={toggleEditing}
        >
          {isEditing ?
            <i className="far fa-check-circle"></i> :
            <i className="far fa-edit"></i>
          }
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
        {getPeriodSpan(viewPeriod).map((day, index) => (
          <ScheduleDay
            date={day}
            key={index}
            fetchRecipe={fetchRecipe}
            plan={plans.byDate(day)}
            isEditing={isEditing}
            className=""
          />
        ))}
      </div>
    </div>
  );
}

export default Schedule;
