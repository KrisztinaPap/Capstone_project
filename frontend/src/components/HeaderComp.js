import React from 'react';
import banner from '../siteimages/NEWYUM1.png'

const HeaderComp = () => {
  return (
    <>
        <section>
          <div className="w-full h-1 border-top box-shadow bg-purple-500" />
          <img src={banner} alt="test logo" className="mx-auto"/>
        </section>
    </>
  );
}

export default HeaderComp;


