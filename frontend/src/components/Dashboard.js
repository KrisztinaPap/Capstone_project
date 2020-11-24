import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const Dashboard = () => {
   
    return (
      <>
        <div className="content-start h-screen">
          <h1 className="mt-6">Dashboard</h1>
          <div className="h-full">
            <div className="border-2 border-solid border-black rounded-md">
              <button><i class="far fa-arrow-alt-circle-left fa-2x"></i></button>
              {/* Current day/week below to be replaced with dynamic dates */}
              <span>Current day/week</span>
              <button><i class="far fa-arrow-alt-circle-right fa-2x"></i></button>
              <button className="border-2 border-solid border-black rounded-md px-2">Today</button>
            </div>
            <span>Recipe list to drag from</span>
            <div className="border-2 border-solid border-black rounded-md flex flex-rows h-24 overflow-x-auto">
       
               
              <div className="border-2 border-solid border-black rounded-md px-2 bg-white cursor-pointer w-24">Recipe 1</div>
              <div className="border-2 border-solid border-black rounded-md px-2 bg-white cursor-pointer w-24">Recipe 2</div>
              <div className="border-2 border-solid border-black rounded-md px-2 bg-white cursor-pointer w-24">Recipe 3</div>
              <div className="border-2 border-solid border-black rounded-md px-2 bg-white cursor-pointer w-24">Recipe 4</div>
              <div className="border-2 border-solid border-black rounded-md px-2 bg-white cursor-pointer w-24">Recipe 5</div>
              <div className="border-2 border-solid border-black rounded-md px-2 bg-white cursor-pointer w-24">Recipe 6</div>

            </div>
            {/* Calendar container */}
            <span>Plan Your Days</span>
            <div className="border-2 border-solid border-black rounded-md md:flex flex-row">

              

              {/* Day container - Shows on mobile */}
              
              <div className="border-2 border-solid border-black rounded-md flex flex-col h-full md:flex-1">
                <div>Date</div>
                {/* Breakfast container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile & tablet */}
              <div className="hidden border-2 border-solid border-black rounded-md md:flex flex-col h-full md:flex-1">
                <div>Date</div>
                {/* Breakfast container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile & tablet */}
              <div className="hidden border-2 border-solid border-black rounded-md md:flex flex-col h-full md:flex-1">
                <div>Date</div>
                {/* Breakfast container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile, tablet, and desktop */}
              <div className="hidden border-2 border-solid border-black rounded-md lg:flex flex-col h-full md:flex-1">
                <div>Date</div>
                {/* Breakfast container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile, tablet, and desktop */}
              <div className="hidden border-2 border-solid border-black rounded-md lg:flex flex-col h-full md:flex-1">
                <div>Date</div>
                {/* Breakfast container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile, tablet, and desktop */}
              <div className="hidden border-2 border-solid border-black rounded-md lg:flex flex-col h-full md:flex-1">
                <div>Date</div>
                {/* Breakfast container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Dinner
                </div>
              </div>  {/* end of Day container */}

              {/* Day container - Shows on mobile, tablet, and desktop */}
              <div className="hidden border-2 border-solid border-black rounded-md lg:flex flex-col h-full md:flex-1">
                <div>Date</div>
                {/* Breakfast container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Breakfast
                </div>
                {/* Lunch container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
                  Lunch
                </div>
                {/* Dinner container */}
                <div className="border-2 border-solid border-black rounded-md h-24">
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
