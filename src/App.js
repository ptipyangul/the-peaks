import React, { Component } from 'react';
import './App.css';

import NavigationArea from "./components/NavigationArea/NavigationArea";

import Homepage from './containers/Homepage/Homepage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationArea/>
        <Homepage/>
      </div>
    );
  }
}

export default App;
