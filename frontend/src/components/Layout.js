import React from 'react';
import NavMenu from './NavMenu';
import Footer from './Footer';
import HeaderComp from './HeaderComp';

function Layout (props) {

  return (
    <>
      <div id="outer-container" style={{height: '100%'}}>
        <NavMenu />
        <div id="page-wrap">
          <HeaderComp />
          <div className="flex flex-col h-screen justify-between">
            <div className="container mx-auto mb-auto content-start">
              {props.children}
            </div>
          <div className="h-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
      </>
  );

}

//Export Function
export default Layout;