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
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [datePeriod, setDatePeriod] = useState([today]);

  const [firstDate, setFirstDate] = useState(datePeriod[0]);
  const [lastDate, setLastDate] = useState(datePeriod[datePeriod.length - 1]);

  useEffect(() => {
    populateRecipes();
  }, []);

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
    setFirstDate(today);
    console.log(`firstDay is set to: ${firstDate}`);
  }
  {/* Go back in time arrows */ }
  function backOneDay() {
    setFirstDate(firstDate.subtract(1, 'days'));
    setLastDate(lastDate.subtract(1, 'days'));
    console.log(`firstDay is set to: ${firstDate}`);
    console.log(`lastDay is set to: ${lastDate}`);
  }

  function backThreeDays() {
    setFirstDate(firstDate.subtract(3, 'days'));
    setLastDate(lastDate.subtract(3, 'days'));
    console.log(`firstDay is set to: ${firstDate}`);
    console.log(`lastDay is set to: ${lastDate}`);
  }

  function backSevenDays() {
    setFirstDate(firstDate.subtract(7, 'days'));
    setLastDate(lastDate.subtract(7, 'days'));
    console.log(`firstDay is set to: ${firstDate}`);
    console.log(`lastDay is set to: ${lastDate}`);
  }

  {/* Go forward in time arrows */ }
  function forwardOneDay() {
    setFirstDate(firstDate.add(1, 'days'));
    setLastDate(lastDate.add(1, 'days'));
    console.log(`firstDay is set to: ${firstDate}`);
    console.log(`lastDay is set to: ${lastDate}`);
  }

  function forwardThreeDays() {
    setFirstDate(firstDate.add(3, 'days'));
    setLastDate(lastDate.add(3, 'days'));
    console.log(`firstDay is set to: ${firstDate}`);
    console.log(`lastDay is set to: ${lastDate}`);
  }

  function forwardSevenDays() {
    setFirstDate(firstDate.add(7, 'days'));
    setLastDate(lastDate.add(7, 'days'));
    console.log(`firstDay is set to: ${firstDate}`);
    console.log(`lastDay is set to: ${lastDate}`);
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
        <div className="container mx-auto max-wlg h-screen mb-12">

          <div className="h-full lg:grid lg:grid-cols-4 lg:grid-rows-8 gap-3">
            <h1 className="mt-6 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:row-span-1">Dashboard</h1>

            <div className="flex items-center p-2 justify-between lg:flex-col lg:place-content-center lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:row-span-1">
              <div className="flex items-center">
                {/* Go back in time arrows */}
                <button className="md:hidden" onClick={() => backOneDay()}><i className="far fa-arrow-alt-circle-left fa-2x"></i></button>
                <button className="hidden md:inline lg:hidden" onClick={() => backThreeDays()}><i className="far fa-arrow-alt-circle-left fa-2x"></i></button>
                <button className="hidden lg:inline" onClick={() => backSevenDays()}><i className="far fa-arrow-alt-circle-left fa-2x"></i></button>
                {/* Current day/week below to be replaced with dynamic dates */}
              <div className="md:hidden inline px-3">{firstDate.format('L')}</div>
                <div className="hidden md:inline lg:hidden px-3">{firstDate.format('L')} - {lastDate.format('L')}</div>
                <div className="hidden lg:inline px-3">{firstDate.format('L')} - {lastDate.format('L')}</div>
                {/* Go forward in time arrows */}
                <button className="md:hidden" onClick={() => forwardOneDay()}><i className="far fa-arrow-alt-circle-right fa-2x"></i></button>
                <button className="hidden md:inline lg:hidden" onClick={() => forwardThreeDays()}><i className="far fa-arrow-alt-circle-right fa-2x"></i></button>
                <button className="hidden lg:inline" onClick={() => forwardSevenDays()}><i className="far fa-arrow-alt-circle-right fa-2x"></i></button>
               </div>
              <button className="border-2 border-solid border-black rounded-md px-2 shadow mx-2" onClick={() => goToToday()}>Today</button>
            </div>

            {/* Recipe icon swiper for mobile screen */}
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

            {/* Recipe icon swiper for tablet screen */}
            <div className="hidden md:block lg:hidden my-3">
              <Swiper spaceBetween={10} slidesPerView={8}>
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

            {/* Recipe icon swiper for desktop screen */}
            <div className="hidden lg:block lg:col-start-1 lg:col-span-1 lg:row-span-6 lg:row-start-2 my-3">
              {recipes.map(recipes => (
                <div key={recipes.id} className="swiper-item lg:w-full">
                  <img src={recipes.image} />
                  <div>
                    {recipes.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar container - maps over datePeriod array to display daily schedules */}

            <div className="md:flex flex-row my-3 lg:col-span-3 lg:col-start-2 lg:row-start-2 lg:row-span-6 border-2 border-solid border-black">

            {datePeriod.map((days, index) => (
              <div key={index} className="flex flex-col h-full md:flex-1">
                <div className="text-center py-2">
                  <span className="block">{firstDate.format('LL')}</span>
                  <span className="block">{firstDate.format('dddd')}</span>
                </div>
                {/* Breakfast container */}
                <div className="meal-container lg:h-full">
                  Breakfast
                  </div>
                {/* Lunch container */}
                <div className="meal-container lg:h-full">
                  Lunch
                  </div>
                {/* Dinner container */}
                <div className="meal-container lg:h-full">
                  Dinner
                  </div>
              </div>
           ))}
          </div>

          </div>

        </div>
      </>
    );
  }

export default Dashboard;
