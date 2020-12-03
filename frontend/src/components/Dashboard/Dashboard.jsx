import React, { useState, useEffect, useReducer } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';
import dayjs from 'dayjs';

import Plans from '../../models/Plans'

import { plansReducer, updateMeal, moveMeal, loadPeriod, removeMeal} from '../../reducers/plansReducer';
import {
  scheduleReducer,
  updateFocusDate,
  updatePeriod,
  getDefaultScheduleState
} from '../../reducers/scheduleReducer';

import {
  DraggableMealRecipeId,
  DraggableRecipeId,
  DroppableMealId
} from '../../utils/dndIdCoders';

import Schedule, {Forward, Backward, Jump} from './Schedule';

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


const defaultScheduleState = getDefaultScheduleState(dayjs().startOf('day'), 7);

const Dashboard = () => {
  const userId = -1;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [loadingMeals, setLoadingMeals] = useState(true);
  const [errorMeals, setErrorMeals] = useState(false);

  const [plans, dispatchPlans] = useReducer(plansReducer, Plans.Create());

  const [isEditing, setEdit] = useState(true);

  const [schedule, dispatchSchedule] = useReducer(scheduleReducer, defaultScheduleState)

  // Citation
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  // Citation
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setViewWidth(window.innerWidth);

    }, 100)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  });


  useEffect(() => {
    // DELETE AFTER
    // Override date range to special day
    // const day = dayjs("2020-11-28");
    // dispatchSchedule(updateFocusDate(day))

    populateRecipes();
  }, [])

  useEffect(() => {
    async function getPlans() {
      const [start, end] = schedule.viewRange;

      try {
        const response = await axios.get(`api/plans/user/${userId}/schedule?fromDate=${start.format('YYYY-MM-DD')}&toDate=${end.format('YYYY-MM-DD')}`);
        dispatchPlans(loadPeriod(response.data));

        setLoadingMeals(false);
        setErrorMeals(false);
      } catch(err) {
        setErrorMeals(true);
        setLoadingMeals(false);
      }
    }

    getPlans();
  }, [schedule, userId]);

  useEffect(() => {
    if(viewWidth >= 1024) {
      // lg-xl screens
      dispatchSchedule(updatePeriod(7));
    }
    else if(viewWidth >= 768) {
      // md screens
      dispatchSchedule(updatePeriod(3));
    }
    else {
      // xs-sm screens
      dispatchSchedule(updatePeriod(1));
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



  function toggleEditing() {
    setEdit(!isEditing)
  }

  const onMove = (dir, date) => {
    const {focusDate, period} = schedule;

    switch(dir) {
      case Forward:
        dispatchSchedule(updateFocusDate(
          focusDate
            .add(period, 'day')
        ))
        break;
      case Backward:
        dispatchSchedule(updateFocusDate(
          focusDate
            .subtract(period, 'day')
        ))
        break;
      case Jump:
        dispatchSchedule(updateFocusDate(
          dayjs(date)
        ));
        break;
      default:
        // To satisfy the linter.
    }
  }

  const fetchRecipe = (recipeId) => {
    return recipes.find(r => r.id === recipeId);
  }

  function addRecipe(encodedMealId, encodedRecipeId) {
    const { day, time } = DroppableMealId.decode(encodedMealId);
    const recipeId = DraggableRecipeId.decode(encodedRecipeId);

    dispatchPlans(updateMeal(day, time, recipeId));
  }

  function moveRecipe(encodedSrcMealId, encodedDestMealId, encodedRecipeId) {
    const src = DroppableMealId.decode(encodedSrcMealId);
    const dest = DroppableMealId.decode(encodedDestMealId);
    const { recipeId } = DraggableMealRecipeId.decode(encodedRecipeId);

    dispatchPlans(moveMeal(src.day, src.time, dest.day, dest.time, recipeId));
  }

  function removeRecipe(encodedSrcMealId, encodedRecipeId) {
    const src = DroppableMealId.decode(encodedSrcMealId);
    const { recipeId } = DraggableMealRecipeId.decode(encodedRecipeId);

    dispatchPlans(removeMeal(src.day, src.time, recipeId));
  }


  function onDragStart() {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(200);
    }
  }

  function onDragEnd(result) {
    const { source, destination } = result;

    if(!result.destination || destination.droppableId === "recipes") {
      removeRecipe(
        source.droppableId,
        result.draggableId
      )
      return;
    }

    switch(source.droppableId) {
      case destination.droppableId:
        // Ignore, we're moving items within ourselves.
        break;
      case "recipes":
        // Add recipe from recipes list
        addRecipe(
          destination.droppableId,
          result.draggableId
        );
        break;
      default:
        // Move recipe from one day to another
        moveRecipe(
          source.droppableId,
          destination.droppableId,
          result.draggableId
        )
    }
  }

  if (loading) {
    return (
      <div className="mx-auto">
        <p><i className="fas fa-spinner fa-spin fa-4x"></i></p>
        <p>Fetching your schedules...</p>
      </div>
    );
  }

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

  function getRecipesDragStyle(style, snapshot) {
    if (!snapshot.isDragging) return {};
    if (!snapshot.isDropAnimating) {
      return style;
    }

    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.001s`
    };
  }

  return (
    <div className="container mx-auto">
      <h1 className="mt-6">Dashboard</h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>

          {isEditing &&
            <Droppable droppableId="recipes" type="recipes">
              {({innerRef, droppableProps, placeholder}) => (

                <div
                  ref={innerRef}
                  {...droppableProps}
                  className=""
                >
                  <div className="overflow-auto py-6">
                    <div className="inline-flex flex-grow divide-gray-500 divide-solid lg:flex lg:divide-y lg:flex-col">
                      {recipes.map((recipes, index) => (
                        <Draggable
                          key={recipes.id}
                          draggableId={DraggableRecipeId.encode(recipes.id)}
                          index={index}
                        >
                          {({innerRef, draggableProps, dragHandleProps }, snapshot) => (
                            <div
                              ref={innerRef}
                              {...draggableProps}
                              {...dragHandleProps}
                              className="w-24 max-w-sm bg-white flex flex-col items-center justify-center gap-4 lg:w-auto lg:flex-row"
                              style={getRecipesDragStyle(draggableProps.style, snapshot)}
                            >
                              <div className="bg-gray-200 w-20 h-20 flex-none">
                                <img src={recipes.image} alt=""/>
                              </div>
                              <p className=" flex-1 break-words text-center lg:text-left lg:truncate">{recipes.name}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  </div>
                  {placeholder}
                </div>
              )}
            </Droppable>
          }

          <Schedule
            viewPeriod={schedule.viewRange}
            plans={plans}
            onMove={onMove}
            isEditing={isEditing}
            toggleEditing={toggleEditing}
            fetchRecipe={fetchRecipe}
          />

        </DragDropContext>
      </div>
    </div>
  );
}


export default Dashboard;
