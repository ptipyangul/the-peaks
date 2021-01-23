import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import classes from './App.module.scss';

import NavigationArea from "./components/NavigationArea/NavigationArea";
import Homepage from './containers/Homepage/Homepage';


function App() {
  return (
    <Router>
      <div className={classes.App}>
          <NavigationArea/>          
      </div>

      <Route path="/" exact component={Homepage} />

    </Router>
  );
}

export default App;
