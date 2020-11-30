import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import "../../assets/custom.css";

import CalendarDay from './CalendarDay'

import plansReducer, {Plans} from '../../reducers/plansReducer';
import {
  DraggableMealRecipeId,
  DraggableRecipeId,
  DroppableMealId
} from '../../utils/dndIdCoders';

// Citation: https://swiperjs.com/react/
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


// TODO: ----------------------------------------------
// Break these functions out into utils files.

// Citation: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}





// --------------------------------


const Dashboard = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [loadingMeals, setLoadingMeals] = useState(true);
  const [errorMeals, setErrorMeals] = useState(false);

  const [plans, dispatchPlans] = useReducer(plansReducer, Plans.Create([]));

  const [edit, setEdit] = useState(true);

  // Controls how many days are in view Eg: 1/3/7/30 etc
  const [timeInterval, setTimeInterval] = useState(1);

  const today = dayjs().startOf('day');
  // Controls what span of time we're currently looking at.
  const [datePeriod, setDatePeriod] = useState([today, today]);

  // Citation
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  const [desktop, setDesktop] = useState(window.innerWidth > 1450);
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  // Citation
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDesktop(window.innerWidth > 1450);
      setViewWidth(window.innerWidth);

    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  });


  useEffect(() => {
    // DELETE AFTER
    // Override date range to special day
    const day = dayjs("2020-11-28T-7:00:00:00.000Z");
    setDatePeriod([day, day])

    populateRecipes();
  }, [])

  useEffect(() => {
    getPlans();
  }, [datePeriod]);

  useEffect(() => {
    // Logic needs to be reworked here.
    // Adjusting our period seems a bit wonky.
    const [start] = datePeriod;

    if(viewWidth >= 1024) {
      // lg-xl screens
      setTimeInterval(7);
      setDatePeriod([start, start.add(6, 'days')]);
    }
    else if(viewWidth >= 768) {
      // md screens
      setTimeInterval(3);
      setDatePeriod([
        start.subtract(1, 'days'),
        start.add(1, 'days')])
    }
    else {
      // xs-sm screens
      setTimeInterval(1);
      setDatePeriod([start, start])
    }
  }, [viewWidth])

  async function populateRecipes() {
    try {
      const response = await axios.get('api/recipes')
      setRecipes(response.data);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }

  async function getPlans() {
    // 2020-11-22
    // 2020-11-27
    // 2020-11-28 - this date has a meal
    const [start, end] = datePeriod;

    try {
      const response = await axios.get(`api/plans/user/-1/schedule?fromDate=${start.format('YYYY-MM-DD')}&toDate=${end.format('YYYY-MM-DD')}`);
      dispatchPlans({
        type: "plans/load_period",
        payload: response.data
      });
      setLoadingMeals(false);
      setErrorMeals(false);
    } catch(err) {
      setErrorMeals(true);
      setLoadingMeals(false);
    }
  }

  /**
   * Representation of the datePeriod as a displayable
   * string.
   *
   * Handles single day format, along with multi-day span format.
   *
   * @returns string date period as string
   */
  function displayDate() {
    const [start, end] = datePeriod;

    if(start === end) {
      return start.format('MMM DD');
    } else {
      return `${start.format('MMM DD')} - ${end.format('MMM DD')}`
    }
  }

  /**
   * Adjusts the datePeriod to focus on the current day
   */
  function moveToToday() {
    // TODO:
    // When looking at week or three day views
    // we should probably change where the first/last day
    // line up. eg start of the week or today in the middle etc
    if(timeInterval === 1) {
      setDatePeriod([today, today]);
    } else {
      setDatePeriod([today, today.add(timeInterval, 'days')]);
    }
  }

  /**
   * Advances the datePeriod by the current TimeInterval
   */
  function moveForward() {
    const [start, end] = datePeriod;

    if(timeInterval === 1)
    {
      const newDate = start.add(timeInterval, 'days');
      setDatePeriod([newDate, newDate]);
    } else {
      setDatePeriod([
        start.add(timeInterval,'days'),
        end.add(timeInterval, 'days')
      ]);
    }
  }

  /**
   * Reverses the datePeriod by the current TimeInterval
   */
  function moveBackwards() {
    const [start, end] = datePeriod;

    if(timeInterval === 1)
    {
      const newDate = start.clone().subtract(timeInterval, 'days');
      setDatePeriod([newDate, newDate]);
    } else {
      setDatePeriod([
        start.clone().subtract(timeInterval,'days'),
        end.clone().subtract(timeInterval, 'days')
      ]);
    }
  }

  /**
   * Get all dates between and including the datePeriods
   * start date and the end date.
   *
   * @returns Array<moment> Array of dayjs dates.
   */
  function getPeriodSpan(period) {
    const dates = [];
    const [start, end] = period;

    if(start.diff(end) === 0) {
      dates.push(start.clone());
    } else {
      let currentDate = start;
      dates.push(currentDate);

      do {
        currentDate = currentDate.add(1, 'days');
        dates.push(currentDate);
      } while(currentDate.diff(end) < 0)
    }

    return dates;
  }

  function copyRecipeToPlan(encodedMealId, encodedRecipeId) {
    const { day, time } = DroppableMealId.decode(encodedMealId);
    const recipeId = DraggableRecipeId.decode(encodedRecipeId);

    dispatchPlans({
      type: "plans/update_recipe",
      payload: {
        day: day.toDate(),
        time: time,
        recipeId: recipeId
      }
    });
  }

  function moveData(encodedSrcMealId, encodedDestMealId, encodedRecipeId) {
    const src = DroppableMealId.decode(encodedSrcMealId);
    const dest = DroppableMealId.decode(encodedDestMealId);
    const { recipeId } = DraggableRecipeId.decode(encodedRecipeId);

    console.log("src: ", src)
    console.log("dest: ", dest)
    console.log("recipeId: ", recipeId)
  }

  function editMode() {
    setEdit(!edit);
  }

  function onDragEnd(result) {
    const { source, destination } = result;

    if(!result.destination) {
      return; // Dropped outside of any lists.
    }

    if(destination.droppableId === "recipes") {
      return; // Don't allow dragging from meal to recipe list
    }

    switch(source.droppableId) {
      case destination.droppableId:
        // Ignore, we're moving items within ourselves.
        break;
      case "recipes":
        console.log(result)
        // Add recipe from recipes list
        copyRecipeToPlan(
          destination.droppableId,
          result.draggableId
        );
        break;
      default:
        // Move recipe from one day to another
        moveData(
          source.droppableId,
          destination.droppableId,
          result.draggableId
        )
    }
  }

  {/* Loading */}
  if (loading) {
    return (
      <>
        <center>
          <p><i className="fas fa-spinner fa-spin fa-4x"></i></p>
          <p>Fetching your schedules...</p>
        </center>
      </>
    );
  }

  {/* If Axios request has an error, display error message...*/}
  if (error) {
    return (
      <>
        <p>Failed fetching schedules. Please try again.</p>
        <p><button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow" type="submit" onClick={() => populateRecipes()}>
          Retry
        </button></p>
      </>
    )
  }

  return (
    <>
      <div className="container mx-auto">
        <h1 className="mt-6">Dashboard</h1>

        <div className="flex items-center p-2 justify-between">

          {/* Date display with arrows and today button */}
          <div className="flex items-center">
            <button onClick={moveBackwards}><i className="far fa-arrow-alt-circle-left fa-2x"></i></button>
            <div className="inline px-3">{displayDate()}</div>
            <button onClick={moveForward}><i className="far fa-arrow-alt-circle-right fa-2x"></i></button>

            <button className="border-2 border-solid border-black rounded-md px-2 shadow mx-2" onClick={moveToToday}>Today</button>
          </div>

          <div>
            {/* Edit mode toggle button */}
            {!edit &&
              <button className="border-2 border-solid border-black rounded-md px-2 shadow mx-2" onClick={() => editMode()}>
                <i className="far fa-edit"></i>
              </button>
            }
            {edit &&
              <button className="border-2 border-solid border-black rounded-md px-2 shadow mx-2" onClick={() => editMode()}>
                <i className="far fa-check-circle"></i>
              </button>
            }
          </div>
        </div>


        {/* Recipe list and calendar (1 column on mobile and tablet, 2 colums on desktop */}

        <div className="flex flex-col lg:flex-row">
          <DragDropContext onDragEnd={onDragEnd}>
            {/* When edit mode is true, show recipe list */}
            {edit &&
              <div className="mr-3 block my-3">
                <Droppable droppableId="recipes" type="recipes">
                  {(provided) => (
                    <div ref={provided.innerRef} >
                      {recipes.map((recipes, index) => (
                        <Draggable key={recipes.id} draggableId={DraggableRecipeId.encode(recipes.id)} index={index} >
                          {(draggableProvided) => (
                            <div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
                              <div className="swiper-item lg:w-full">
                                <img src={recipes.image} />
                                <div className="select-none">
                                  {recipes.name}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                        {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            }


            {/* Calendar container - maps over datePeriod array to display daily schedules */}
            <div className="flex flex-row my-3 lg:w-3/5">
                {getPeriodSpan(datePeriod).map((day, index) => (
                  <CalendarDay
                    date={day}
                    key={index}
                    recipes={recipes}
                    plan={plans.byDate(day.toDate())}
                    isEditing={edit}
                    className=""
                  />
                ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}


export default Dashboard;
