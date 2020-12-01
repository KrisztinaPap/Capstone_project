import React, { Component } from 'react';
import NavMenu from './NavMenu';
import Footer from './Footer';

function Layout (props) {

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="h-10">
        <NavMenu />
      </div>
      <div className="container mx-auto mb-auto content-start">
        {props.children}
      </div>
      <div className="h-10">
        <Footer />
      </div>
    </div>
  );

}

//Export Function
export default Layout;