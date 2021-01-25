import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import classes from './App.module.scss';

import Navigation from "./components/Navigation/Navigation";
import Homepage from './containers/Homepage/Homepage';
import Category from './containers/Category/Category';
import Article from './containers/Article/Article';
import SearchResult from './containers/SearchResult/SearchResult';
import Bookmark from './containers/Bookmark/Bookmark';

class App extends Component {
  render () {
    return (
      <Router>
        <div className={classes.App}>
            <Route path="/" component={Navigation} />
        </div>
        <Switch>
          <Route exact path="/" exact component={Homepage} />
          <Route exact path="/category/:categoryName" name="category" component={Category} />
          <Route path="/article/:articleID" name="article" component={Article} />
          <Route exact path="/search" name="search" component={SearchResult} />
          <Route exact path="/bookmark" name="bookmark" component={Bookmark} />
        </Switch>
      </Router>
    );
  }
}

export default App;
