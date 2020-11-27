import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="flex flex-col h-screen justify-between">
        <div className="h-10">
          <NavMenu />
        </div>
        <div className="container mx-auto mb-auto content-start">
          {this.props.children}
        </div>
        <div className="h-10">
          <Footer />
        </div>
      </div>
    );
  }
}
