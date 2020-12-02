import React from 'react';
import banner from '../siteimages/NEWYUM1.png'

const HeaderComp = () => {
  return (
    <>
      {/* TODO: Replace Below with a Banner once created */}
      <center>
        <section>
          <div className="w-full h-1 border-top box-shadow bg-purple-500" />
          <img src={banner} alt="test logo" />
        </section>
      </center>
    </>
  );
}

export default HeaderComp;


