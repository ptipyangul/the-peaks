import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Navigation from "./components/Navigation/Navigation";
import Homepage from './containers/Homepage/Homepage';
import Category from './containers/Category/Category';
import Article from './containers/Article/Article';
import SearchResult from './containers/SearchResult/SearchResult';
import Bookmark from './containers/Bookmark/Bookmark';
import NotFound from './containers/NotFound/NotFound';
import { GetNewsContextProvider } from './context/getNews';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: null
    }
  }

  handleUpdateKey = (searchKey) => {
    this.setState({ searchKey: searchKey });
  }

  render () {
    return (
      <Router>
        <GetNewsContextProvider>
          <div className="App">
              <Route path="/" name="navigation" render={props => <Navigation updateSearchKey={this.handleUpdateKey} {...props} />} />
              <Switch>
                <Route exact path="/" exact component={Homepage} />
                <Route exact path="/category/:categoryName" name="category" component={Category} />
                <Route path="/article/:articleID" name="article" component={Article} />
                <Route exact path="/search" name="search" render={props => <SearchResult searchKey={this.state.searchKey} {...props} />} />
                <Route exact path="/bookmark" name="bookmark" component={Bookmark} />
                <Route name="notfound" component={NotFound} />
              </Switch>
          </div>
        </GetNewsContextProvider>
      </Router>
    );
  }
}

export default App;