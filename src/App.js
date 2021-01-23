import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import classes from './App.module.scss';

import NavigationArea from "./components/Navigation/Navigation";
import Homepage from './containers/Homepage/Homepage';
import Category from './containers/Category/Category';
import Article from './containers/Article/Article';

function App() {
  return (
    <Router>
      <div className={classes.App}>
          <NavigationArea/>          
      </div>

      <Route path="/" exact component={Homepage} />
      <Route path="/category/:categoryName" name="category" component={Category} />
      <Route path="/article/:articleID" name="article" component={Article} />

    </Router>
  );
}

export default App;
