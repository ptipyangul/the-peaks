import React, { Component } from 'react';
import './App.css';

import UserContext from './components/UserContext/UserContext';
import NavigationArea from "./components/NavigationArea/NavigationArea";
import Homepage from './containers/Homepage/Homepage';

const user = {};

class App extends Component {
  render() {
    return (      
        <div className="App">
          <UserContext.Provider value={user}>
            <NavigationArea/>
            <Homepage/>
          </UserContext.Provider>
        </div>
    );
  }
}

export default App;
