import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="flex flex-col h-screen justify-between">
        <NavMenu />
        <div className="container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
