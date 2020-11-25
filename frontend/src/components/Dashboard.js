import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "../assets/custom.css";

// Citation: https://swiperjs.com/react/
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Dashboard = () => {

    useEffect(() => {
      populateRecipes();
    }, []);

    const [recipes, setRecipes] = useState([]);

    async function populateRecipes() {
      const response = await axios.get('api/recipes')
      setRecipes(response.data);
    }

    return (
      <>
        <div className="content-start h-screen mb-12">
          

          <div className="h-full lg:grid lg:grid-cols-4 lg:grid-rows-8 gap-3">
            <h1 className="mt-6 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:row-span-1">Dashboard</h1>

            <div className="flex items-center p-2 justify-between lg:flex-col lg:place-content-center lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:row-span-1">
              <div className="flex items-center">
                <button><i className="far fa-arrow-alt-circle-left fa-2x"></i></button>
                {/* Current day/week below to be replaced with dynamic dates */}
                <div className="inline px-3">Current day/week</div>
                <button><i className="far fa-arrow-alt-circle-right fa-2x"></i></button>
              </div>
              <button className="border-2 border-solid border-black rounded-md px-2 shadow mx-2">Today</button>
            </div>

            {/* Recipe icon swiper for mobile screen */}
            <div className="md:hidden my-3">
              <Swiper spaceBetween={10} slidesPerView={4}>
                {recipes.map(recipes => (
                  <SwiperSlide id={`recipes/${recipes.id}`} className="border-2 border-black rounded-md px-2 bg-white cursor-pointer">
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
                  <SwiperSlide id={`recipes/${recipes.id}`} className="border-2 border-black rounded-md px-2 bg-white cursor-pointer">
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
                  <div id={`recipes/${recipes.id}`} className="border-2 border-black rounded-md px-2 bg-white cursor-pointer lg:w-full">
                    <img src={recipes.image} />
                    <div>
                      {recipes.name}
                    </div>
                  </div>
                ))}
            </div>

            {/* Calendar container */}
            <div className="md:flex flex-row my-3 lg:col-span-3 lg:col-start-2 lg:row-start-2 lg:row-span-6 border-2 border-solid border-black">
              {/* Day container - Shows on mobile */}
              <div className="flex flex-col h-full md:flex-1">
                <div className="text-center py-2">Date</div>
                {/* Breakfast container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile & tablet */}
              <div className="hidden md:flex flex-col h-full md:flex-1">
                <div className="text-center py-2">Date</div>
                {/* Breakfast container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile & tablet */}
              <div className="hidden md:flex flex-col h-full md:flex-1">
                <div className="text-center py-2">Date</div>
                {/* Breakfast container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile, tablet, and desktop */}
              <div className="hidden lg:flex flex-col h-full md:flex-1">
                <div className="text-center py-2">Date</div>
                {/* Breakfast container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile, tablet, and desktop */}
              <div className="hidden lg:flex flex-col h-full md:flex-1">
                <div className="text-center py-2">Date</div>
                {/* Breakfast container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile, tablet, and desktop */}
              <div className="hidden lg:flex flex-col h-full md:flex-1">
                <div className="text-center py-2">Date</div>
                {/* Breakfast container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile, tablet, and desktop */}
              <div className="hidden lg:flex flex-col h-full md:flex-1">
                <div className="text-center py-2">Date</div>
                {/* Breakfast container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border border-solid border-black h-24 lg:h-full">
                  Dinner
                </div>
              </div>  {/* end of Day container */}
            </div>
          </div>
        </div>
      </>
    );
}

export default Dashboard;
