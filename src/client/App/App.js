import React from 'react';
import {Router} from "react-router-dom";
import {Route} from "react-router-dom";
import ButtonAppBar from "./Components/NavBar";
import UserProfile from "./Components/UserImageReg"
import ReviewForm from "./Components/ReviewForm";
import ReviewsView from "./Components/ReviewsView";
import {history} from "../../index";
import UsersProfileView from "./Components/UserProfileView";


class App extends React.Component{
    // componentDidMount() {
    //     window.addEventListener("beforeunload", () => localStorage.clear());
    // }
    //
    // componentWillUnmount() {
    //     window.removeEventListener('onbeforeunload', () => localStorage.clear());
    // }

  render() {
      return (
          <Router history={history}>
              <ButtonAppBar message="Welcome to Reviews Restaurants App!"/>
              <Route path='/register' component={UserProfile}/>
              <Route path='/new_review' component={ReviewForm}/>
              <Route path='/all_reviews' component={ReviewsView}/>
              <Route path='/my_profile' component={UsersProfileView}/>
          </Router>
      );
    }
}

export default App;