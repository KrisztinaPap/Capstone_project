import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import "../../assets/custom.css";

import Meal from './Meal';

// Citation: https://swiperjs.com/react/
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Dashboard = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [loadingMeals, setLoadingMeals] = useState(true);
  const [errorMeals, setErrorMeals] = useState(false);
  const [meals, setMeals] = useState([]);

  const [edit, setEdit] = useState(true);

  // Controls how many days are in view Eg: 1/3/7/30 etc
  const [timeInterval, setTimeInterval] = useState(1);

  const today = moment();
  // Controls what span of time we're currently looking at.
  const [datePeriod, setDatePeriod] = useState([today, today]);

  // Citation
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  const [desktop, setDesktop] = useState(window.innerWidth > 1450);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    // DELETE AFTER
    // Override date range to special day
    const day = moment("2020-11-28");
    setDatePeriod([day, day])
  }, [])

  useEffect(() => {
    populateRecipes();
  }, []);

  useEffect(() => {
    getMeals();
  }, [datePeriod]);

  // Citation
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

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

  async function getMeals() {
    // 2020-11-22
    // 2020-11-27
    // 2020-11-28 - this date has a meal
    const [start, end] = datePeriod;

    try {
      const response = await axios.get(`api/plans/user/-1/schedule?fromDate=${start.format('YYYY-MM-DD')}&toDate=${end.format('YYYY-MM-DD')}`);
      setMeals(response.data);
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
      return start.format('L');
    } else {
      return `${start.format('L')} - ${end.format('L')}`
    }
  }

  /**
   * Adjusts the datePeriod to focus on the current day
   */
  function moveToToday() {
    // When looking at week/ three day or month views
    // we should probably change where the first/last day
    // line up. eg start of the week or today in the middle etc
    if(timeInterval === 1) {
      setDatePeriod([today, today]);
    } else {
      setDatePeriod([today, today.add(timeInterval, 'days').clone()]);
    }
  }

  /**
   * Advances the datePeriod by the current TimeInterval
   */
  function moveForward() {
    const [start, end] = datePeriod;

    if(timeInterval === 1)
    {
      const newDate = start.add(timeInterval, 'days').clone();
      setDatePeriod([newDate, newDate]);
    } else {
      setDatePeriod([
        start.add(timeInterval,'days').clone(),
        end.add(timeInterval, 'days').clone()
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
      const newDate = start.subtract(timeInterval, 'days').clone();
      setDatePeriod([newDate, newDate]);
    } else {
      setDatePeriod([
        start.subtract(timeInterval,'days').clone(),
        end.subtract(timeInterval, 'days').clone()
      ]);
    }
  }

  /**
   * Get all dates between and including the datePeriods
   * start date and the end date.
   *
   * @returns Array<moment> Array of momentjs dates.
   */
  function getPeriodSpan() {
    const dates = [];
    const [start, end] = datePeriod;

    if(start.diff(end) === 0) {
      dates.push(start.clone());
    } else {
      const currentDate = start.clone();
      while(currentDate.add(1, 'days').diff(end) < 0) {
        dates.push(currentDate.clone());
      }
    }

    return dates;
  }

  function mealFor(day, mealtime) {
    // TODO: Needs total rework
    // This type is complex enough we should probably
    // hide it behind some kind of model object.
    // which provides easy ways get he pieces we need.

    let mealRecipes = null;

    meals.forEach(plan => {
      if(day.diff(moment(plan.day)) === 0)
      {
        plan.meals.forEach(meal => {
          if(meal.mealTime.name.toLowerCase() === mealtime.toLowerCase()) {
            mealRecipes = meal.mealRecipes;
          }
        });
      }
    });
    return mealRecipes;
  }

  function updateData(rawMealId, rawRecipeId) {
    const [planDateRaw, mealTime] = rawMealId.split('-');
    const planDate = moment(planDateRaw.replace('/', '-').replace('/', '-'));
    const recipeId = parseInt(rawRecipeId.substring(7));

    // console.log(planDateRaw)
    // console.log(planDate)
    console.log("UpdateRecipeTo: ", recipeId)
    // console.log(mealTime)

    // need a deep copy or it won't work.
    const plans = JSON.parse(JSON.stringify(meals));

    // Find plan
    const plan = plans.find(x => moment(x.day).diff(planDate) === 0);
    if(!plan) { return; }

    // Find planmeal

    const plan_meal = plan.meals.find(x => x.mealTime.name.toLowerCase() === mealTime.toLowerCase());
    if(!plan_meal) { return; } // We actually have to handle this case
                               // We need to create a new meal
    console.log(plan_meal);
    plan_meal.mealRecipes[0].recipeId = recipeId;
    setMeals(plans);
  }

  function editMode() {
    setEdit(!edit);
    console.log(edit);
  }

  function onDragEnd(result) {
    if(!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if(destination == source) {
      return; // Did nothing so do nothing.
    }

    if(destination.droppableId === "recipes") {
      // Don't allow dragging from meal to recipe list
      return;
    }

    updateData(destination.droppableId, result.draggableId)
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
      <div className="container w-full px-4 lg:px-12 mx-auto h-full">
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

        <div className="h-full flex flex-col lg:flex-row">
          <DragDropContext onDragEnd={onDragEnd}>
            {/* When edit mode is true, show recipe list */}
            {edit &&
              <div className="mr-3 w-full">

                {/* <div className="md:hidden my-3">
                  <Swiper spaceBetween={10} slidesPerView={4}>
                    {recipes.map(recipes => (
                      <SwiperSlide key={recipes.id} className="swiper-item">
                        <img src={recipes.image} />
                        <div>
                          {recipes.name}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div> */}

                <div className="block my-3">
                  <Droppable droppableId="recipes" type="recipes">
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} >
                        {recipes.map((recipes, index) => (
                          <Draggable key={recipes.id} draggableId={`recipe-${recipes.id}`} index={index} >
                            {(draggableProvided, draggableSnapshot) => (
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

              </div>
            }


            {/* Calendar container - maps over datePeriod array to display daily schedules */}
            <div className="flex flex-row my-3 w-full h-full">
              <div className="flex flex-row flex-1">
                {getPeriodSpan().map((day, index) => (
                  <div key={index} className="flex-1">
                    <div className="text-center p-2">{day.format('L')}</div>

                    {/* Breakfast container */}
                    <Meal date={day} time="breakfast" model={mealFor(day, "breakfast")} recipes={recipes} />

                    {/* Lunch container */}
                    <Meal date={day} time="lunch" model={mealFor(day, "lunch")}  recipes={recipes} />

                    {/* Dinner container */}
                    <Meal date={day} time="dinner" model={mealFor(day, "dinner")}  recipes={recipes} />
                  </div>
                ))}
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
