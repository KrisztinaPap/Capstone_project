import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import "../assets/custom.css";

// Citation: https://swiperjs.com/react/
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Dashboard = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const today = moment();
  const [firstDate, setFirstDate] = useState(today);
  const [lastDate, setLastDate] = useState(today.clone().add(7, 'days'));
  const [datePeriod, setDatePeriod] = useState([today]);

  // Citation
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  const [desktop, setDesktop] = useState(window.innerWidth > 1450);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    populateRecipes();
  }, []);

  useEffect(() => {
    createDatePeriod(firstDate);
  }, [desktop]);

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
      console.log(firstDate);
      console.log(lastDate);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }

  function goToToday() {
    setFirstDate(today.clone());
    console.log(`firstDay is set to: ${firstDate}`);
  }
  {/* Go back in time arrows */ }
  function backOneDay() {
    setFirstDate(firstDate.clone().subtract(1, 'days'));
    setLastDate(lastDate.clone().subtract(1, 'days'));
    console.log(`firstDay is set to: ${firstDate}`);
    console.log(`lastDay is set to: ${lastDate}`);
  }

  function backSevenDays() {
    setFirstDate(firstDate.clone().subtract(7, 'days'));
    setLastDate(lastDate.clone().subtract(7, 'days'));
    console.log(`firstDay is set to: ${firstDate}`);
    console.log(`lastDay is set to: ${lastDate}`);
  }

  {/* Go forward in time arrows */ }
  function forwardOneDay() {
    setFirstDate(firstDate.clone().add(1, 'days'));
    setLastDate(lastDate.clone().add(1, 'days'));
    console.log(`firstDay is set to: ${firstDate}`);
    console.log(`lastDay is set to: ${lastDate}`);
  }

  function forwardSevenDays() {
    setFirstDate(firstDate.clone().add(7, 'days'));
    setLastDate(lastDate.clone().add(7, 'days'));
    console.log(`firstDay is set to: ${firstDate}`);
    console.log(`lastDay is set to: ${lastDate}`);
  }

  function editMode() {
    setEdit(!edit);
    console.log(edit);
  }

  function createDatePeriod(startDate) {
    let tempArray = new Array();
    let tempStart = new Date(startDate);

    let numberOfDays;
    (desktop) ? numberOfDays = 7 : numberOfDays = 1;

    for (let i = 0; i < numberOfDays; i++) {
      tempArray.push(new Date(tempStart));
      tempStart.setDate(tempStart.getDate() + 1);
    }
    setDatePeriod([tempArray]);
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
                {/* Go back in time arrows */}
                <button className="md:hidden" onClick={() => backOneDay()}><i className="far fa-arrow-alt-circle-left fa-2x"></i></button>
                <button className="hidden lg:inline" onClick={() => backSevenDays()}><i className="far fa-arrow-alt-circle-left fa-2x"></i></button>

            {/* Currently displayed time period */}
            {!desktop &&
              <>
                <div className="inline px-3">{firstDate.format('L')}</div>
                <button className="md:hidden" onClick={() => forwardOneDay()}><i className="far fa-arrow-alt-circle-right fa-2x"></i></button>
              </>
            }
            {desktop &&
              <>
                <div className="inline px-3">{firstDate.format('L')} - {lastDate.format('L')}</div>
                <button className="hidden lg:inline" onClick={() => forwardSevenDays()}><i className="far fa-arrow-alt-circle-right fa-2x"></i></button>
              </>
            }
                <button className="border-2 border-solid border-black rounded-md px-2 shadow mx-2" onClick={() => goToToday()}>Today</button>
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
        <div className="h-full w-full flex flex-col lg:flex-row">
          {/* When edit mode is true, show recipe list */}
          {edit &&
            <div className="mr-3 w-full">
    
              <div className="md:hidden my-3">
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
              </div>

              <div className="hidden lg:block my-3">
                {recipes.map(recipes => (
                  <div key={recipes.id} className="swiper-item lg:w-full">
                    <img src={recipes.image} />
                    <div>
                      {recipes.name}
                    </div>
                  </div>
                ))}
              </div>

            </div>
        }
           

          {/* Calendar container - maps over datePeriod array to display daily schedules */}
          <div className="flex flex-row my-3 w-full h-full">

          {!desktop &&
            <>
              <div className="flex flex-col flex-1">
                <div className="text-center p-2">
                  <span className="block">{firstDate.format('LL')}</span>
                  <span className="block">{firstDate.format('dddd')}</span>
                </div>

                {/* Breakfast container */}
                <div className="meal-container">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="meal-container">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="meal-container">
                  Dinner
                </div>
              </div>
            </>
          }
            {desktop &&
              <>

                {datePeriod.map((days, index) => (
                  <div key={index} className="flex flex-col flex-1">
                    <div className="text-center p-2">
                      <span className="block">{firstDate.format('LL')}</span>
                      <span className="block">{firstDate.format('dddd')}</span>
                    </div>

                    {/* Breakfast container */}
                    <div className="meal-container">
                      Breakfast
                  </div>
                    {/* Lunch container */}
                    <div className="meal-container">
                      Lunch
                  </div>
                    {/* Dinner container */}
                    <div className="meal-container">
                      Dinner
                  </div>
                  </div>
                ))}
              </>
            }
          
          </div>
          </div>

          </div>
      </>
    );
  }

export default Dashboard;
