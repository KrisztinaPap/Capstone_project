import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import "../assets/custom.css";

// Import Authentication
import { UserContext } from './Authentication/UserAuthentication';

// Citation: https://swiperjs.com/react/
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Dashboard = () => {

  // Create user from UserContext
  const [user, setUser] = useContext(UserContext);

  // Check for User's Authentication
  const history = useHistory();
  useEffect(() => {
    if (!user.isAuthenticated()) {
      history.push("/login");
    }
  });

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
  }, [desktop, firstDate]);

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

  function goToToday() {
    setFirstDate(today.clone());
  }
  {/* Go back in time arrows */ }
  function backOneDay() {
    setFirstDate(firstDate.clone().subtract(1, 'days'));
  }

  function backSevenDays() {
    setFirstDate(firstDate.clone().subtract(7, 'days'));
  }

  {/* Go forward in time arrows */ }
  function forwardOneDay() {
    setFirstDate(firstDate.clone().add(1, 'days'));
  }

  function forwardSevenDays() {
    setFirstDate(firstDate.clone().add(7, 'days'));
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
    setDatePeriod(tempArray);
    let tempLastDate = new Date(tempArray[tempArray.length - 1]);
    setLastDate(tempLastDate.toLocaleDateString());
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
         
                {/* Currently displayed time period */}
                {!desktop &&
                  <>
                    <button onClick={() => backOneDay()}><i className="far fa-arrow-alt-circle-left fa-2x"></i></button>
                    <div className="inline px-3">{firstDate.format('L')}</div>
                    <button onClick={() => forwardOneDay()}><i className="far fa-arrow-alt-circle-right fa-2x"></i></button>
                  </>
                }
                {desktop &&
                  <>
                    <button onClick={() => backSevenDays()}><i className="far fa-arrow-alt-circle-left fa-2x"></i></button>
              <div className="inline px-3">{firstDate.format('L')} - {lastDate}</div>
                    <button onClick={() => forwardSevenDays()}><i className="far fa-arrow-alt-circle-right fa-2x"></i></button>
                  </>
                }
                <button className="border-2 border-solid border-black rounded-md px-2 shadow mx-2" onClick={() => goToToday()}>Today</button>
              </div>
              <div>
                {/* Edit mode toggle button */}
                {!edit &&
                  <button className="border-2 border-solid border-black rounded-md px-2 shadow mx-2" onClick={() => editMode()}>
                    <i className="far fa-edit"></i>
                    Edit Plan
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
                  {datePeriod[0].toLocaleDateString()}
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
              <div className="flex flex-row flex-1">
                {datePeriod.map((days, index) => (
                  <div key={index} className="flex-1">
                    <div className="text-center p-2">
                      {days.toLocaleDateString()}
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
                </div>
              </>
            }
          
          </div>
          </div>

          </div>
      </>
    );
  }

export default Dashboard;
