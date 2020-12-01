import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';
import HeaderComp from './HeaderComp';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <>
        <div id="outer-container" style={{height: '100%'}}>
          <NavMenu />
          <div id="page-wrap">
            <HeaderComp />
            <div className="flex flex-col h-screen justify-between">
              <div className="container mx-auto mb-auto content-start">
                {this.props.children}
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
}
