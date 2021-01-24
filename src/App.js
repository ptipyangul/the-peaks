import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import classes from './App.module.scss';

import Navigation from "./components/Navigation/Navigation";
import Homepage from './containers/Homepage/Homepage';
import Category from './containers/Category/Category';
import Article from './containers/Article/Article';
import SearchResult from './containers/SearchResult/SearchResult';

class App extends Component {
  render () {
    return (
      <Router>
        <div className={classes.App}>
            <Route path="/" component={Navigation} /> 
        </div>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/category/:categoryName" name="category" component={Category} />
          <Route path="/article/:articleID" name="article" component={Article} />
          <Route path="/search" name="search" component={SearchResult} />
        </Switch>
      </Router>
    );
  }
}

export default App;
