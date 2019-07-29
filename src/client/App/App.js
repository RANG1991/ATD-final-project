import React from 'react';
import {Router, withRouter} from "react-router-dom";
import {Route} from "react-router-dom";
import ButtonAppBar from "./Components/NavBar";
import UserProfile from "./Components/UserImageReg"
import ReviewForm from "./Components/NewReviewForm";
import ReviewsView from "./Components/ReviewsView";
import {history} from "../../index";
import MyProfileView from "./Components/MyProfileView";
import ProfilesView from "./Components/ProfilesView";
import AdvancedSearchForm from "./Components/AdvancedSearchForm";
import SearchUsernameForm from "./Components/SearchUsernameForm";
import LoginForm from "./Components/LoginForm";
import AppActions from "./actions/AppActions";
import {connect} from "react-redux";


class App extends React.Component {
    componentDidMount() {
        this.props.handleGetAllUsers();
        window.addEventListener("beforeunload", () => localStorage.clear());
    }

    componentWillUnmount() {
        window.removeEventListener('onbeforeunload', () => localStorage.clear());
    }

    render() {
        return (
            <Router history={history}>
                <ButtonAppBar message="Welcome to Reviews Restaurants App!"/>
                <Route path='/register' component={UserProfile}/>
                <Route path='/new_review' component={ReviewForm}/>
                <Route path='/all_reviews' component={ReviewsView}/>
                <Route path='/my_profile' component={MyProfileView}/>
                <Route path='/other_profiles' component={ProfilesView}/>
                <Route path='/searchReviews' component={AdvancedSearchForm}/>
                <Route path='/searchUsers' component={SearchUsernameForm}/>
                <Route path='/login' component={LoginForm}/>
            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetAllUsers: () => {
            dispatch(AppActions.getAllUsersSaga());
        }
    }
};

export default connect(null, mapDispatchToProps)(App);