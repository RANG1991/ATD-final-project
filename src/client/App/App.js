import React from 'react';
import {Router} from "react-router-dom";
import {Route} from "react-router-dom";
import ButtonAppBar from "./Components/NavBar";
import UserProfile from "./Components/UserImageReg"
import ReviewForm from "./Components/ReviewForm"
import {history} from "../../index";


class App extends React.Component{

  render() {
      return (
          <Router history={history}>
              <ButtonAppBar message="Welcome to Reviews Restaurants App!"/>
              <Route path='/register' component={UserProfile}/>
              <Route path='/new_review' component={ReviewForm}/>
          </Router>
      );
    }
}

export default App;