import React from 'react';
import NavMenu from './NavMenu';
import Footer from './Footer';
import HeaderComp from './HeaderComp';
import '../custom.css'

function Layout (props) {
      return (
      <>
        <div id="outer-container" className="bg-purple-900" style={{height: '100%'}}>
          <NavMenu />
          <div id="page-wrap" className="bg-white bg-opacity-90 bg-fixed">
            <HeaderComp />

            <div className="flex flex-col h-screen justify-between">
              <div className="container mx-auto mb-auto content-start">
                {this.props.children}
              </div>
              <div className="h-10">
                <Footer/>
              </div>
              <div className="h-10">
                <Footer/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

//Export Function
export default Layout;
