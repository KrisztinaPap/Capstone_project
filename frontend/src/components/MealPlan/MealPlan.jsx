import React, { useState, useEffect, useReducer, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import dayjs from 'dayjs';

import {
  DraggableMealRecipeId,
  DraggableRecipeId,
  DroppableMealId
} from '../../utils/dndIdCoders';
import Plans from '../../models/Plans'
import { plansReducer, updateMeal, moveMeal, loadPeriod, removeMeal} from '../../reducers/plansReducer';
import {
  scheduleReducer,
  updateFocusDate,
  updatePeriod,
  getDefaultScheduleState
} from '../../reducers/scheduleReducer';
import RecipeList from './RecipeList'
import Schedule, {Forward, Backward, Jump} from './Schedule';
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

const MealPlan = () => {
  const {user} = useContext(AuthContext);
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [isSaving, setSaving] = useState(false);
  const [loadingMeals, setLoadingMeals] = useState(true);
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function populateRecipes() {
    try {
      const response = await axios.get('api/recipes', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      await new Promise(x=> setTimeout(x,3000));

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
      } catch(err) {
        if(err.response?.status === 401) {
          history.push('/login');
        }
        else
        {
          // There are no other errors this page
          // should throw so its pretty safe to just
          // escape to our catch all error page.
          history.push('/page500')
        }
        setLoadingMeals(false);
      }
    }

    getPlans();
  }, [schedule, user.token]); // eslint-disable-line react-hooks/exhaustive-deps

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
        if(err.response?.status === 401) {
          history.push('/login');
        }
        else
        {
          // There are no other errors this page
          // should throw so its pretty safe to just
          // escape to our catch all error page.
          history.push('/page500')
        }
      }
    }

    updatePlans();
  }, [plans, loadingMeals, isMealsStale]) // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div className="container mx-auto">
      <h1 className="text-left font-bold my-4">Meal Plan</h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>

          {isEditing &&
            <RecipeList
              isLoading={loading}
              error={error}
              recipes={recipes}
              retry={populateRecipes}
            />
          }

          <Schedule
            viewPeriod={schedule.viewRange}
            plans={plans}
            onMove={onMove}
            isEditing={isEditing}
            isSaving={isSaving}
            isLoading={loading || loadingMeals}
            toggleEditing={toggleEditing}
            fetchRecipe={fetchRecipe}
          />

        </DragDropContext>
      </div>
    </div>
  );
}


export default MealPlan;
