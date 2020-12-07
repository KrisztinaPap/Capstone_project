import React, { useState, useEffect, useReducer, useContext } from 'react';
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
import {Link} from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';

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
  const {user} = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [isSaving, setSaving] = useState(false);
  const [loadingMeals, setLoadingMeals] = useState(true);
  const [errorMeals, setErrorMeals] = useState(false);
  const [isMealsStale, setMealsStale] = useState(false);

  const [plans, dispatchPlans] = useReducer(plansReducer, Plans.Create());
  const [schedule, dispatchSchedule] = useReducer(scheduleReducer, defaultScheduleState)

  const [isEditing, setEdit] = useState(false);

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
    populateRecipes();
  }, [])

  async function populateRecipes() {
    try {
      const response = await axios.get('api/recipes', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      setRecipes(response.data);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getPlans() {
      const [start, end] = schedule.viewRange;

      try {
        const response = await axios.get(`api/plans/schedule?fromDate=${start.format('YYYY-MM-DD')}&toDate=${end.format('YYYY-MM-DD')}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        dispatchPlans(loadPeriod(response.data));

        setLoadingMeals(false);
        setErrorMeals(false);
      } catch(err) {
        setErrorMeals(true);
        setLoadingMeals(false);
      }
    }

    getPlans();
  }, [schedule, user.token]);

  useEffect(() => {
    async function updatePlans() {
      if(loadingMeals || !isMealsStale) { return; }

      try {
        setSaving(true);
        await axios.put(`api/plans/`,
          plans.toJson(),
          {
            headers: {
            'Authorization': `Bearer ${user.token}`
            }
          }
        );
        setSaving(false);
        setMealsStale(false)

      } catch(err) {

      }
    }

    updatePlans();
  }, [plans, loadingMeals, isMealsStale])


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
    setMealsStale(true);
  }

  function moveRecipe(encodedSrcMealId, encodedDestMealId, encodedRecipeId) {
    const src = DroppableMealId.decode(encodedSrcMealId);
    const dest = DroppableMealId.decode(encodedDestMealId);
    const { recipeId } = DraggableMealRecipeId.decode(encodedRecipeId);

    dispatchPlans(moveMeal(src.day, src.time, dest.day, dest.time, recipeId));
    setMealsStale(true);
  }

  function removeRecipe(encodedSrcMealId, encodedRecipeId) {
    const src = DroppableMealId.decode(encodedSrcMealId);
    const { recipeId } = DraggableMealRecipeId.decode(encodedRecipeId);

    dispatchPlans(removeMeal(src.day, src.time, recipeId));
    setMealsStale(true);
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
      <>
        <section className="mt-8">
          <p className="text-center">
            <i className="fas fa-spinner fa-spin fa-4x"></i>
          </p>
          <p className="text-center mt-2">
            Fetching your schedules...
          </p>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <section className="mt-8">
        <p className="text-center">
          Failed fetching schedules. Please try again..
        </p>
        <p className="text-center mt-2">
          <button className="purple-button focus:outline-none focus:shadow-outline mr-1" type="submit" onClick={populateRecipes}>
            Retry
          </button>
          <Link to={"/"}>
            <button className="purple-button focus:outline-none focus:shadow-outline ml-1" type="submit">
              Return to Home Page
            </button>
          </Link>
        </p>
      </section>
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
      <h1 className="text-left font-bold my-4">Dashboard</h1>

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
            isSaving={isSaving}
            toggleEditing={toggleEditing}
            fetchRecipe={fetchRecipe}
          />

        </DragDropContext>
      </div>
    </div>
  );
}


export default Dashboard;
