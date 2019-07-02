import React from 'react';
import {Router} from "react-router-dom";
import {Route} from "react-router-dom";
import ButtonAppBar from "./App/LoginPage/NavBar";
import UserProfile from "./App/LoginPage/UserProfile"
import Home from "./App/ReviewPage/Home"
import {history} from "../index";


class App extends React.Component{

  render() {
      return (
          <Router history={history}>
              <ButtonAppBar message="Welcome to Reviews Restaurants App!"/>
              <Route path='/login' component={UserProfile}/>
              <Route path='/welcome/:username' component={Home}/>
          </Router>
      );
    }
}

export default App;