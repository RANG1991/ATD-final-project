import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";
import ButtonAppBar from "../NavBar";
import UserProfile from "../UserProfile/UserProfile"
import Home from "../Home"


class App extends React.Component{

  render() {
      return (
          <BrowserRouter>
              <ButtonAppBar message="Welcome to Reviews Restaurants App!"/>
              <Route path='/login' component={UserProfile}/>
              <Route path='/welcome/:username' component={Home}/>
          </BrowserRouter>
      );
    }
}

export default App;