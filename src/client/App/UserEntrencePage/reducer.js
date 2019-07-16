import {HomeActionsConstants} from './Constants.js';
import initialState from '../initialState';
import {history} from "../../../index";

const HomeReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case HomeActionsConstants.ON_CLICK_MENU_BUTTON:
            state = state.set('displayMenu', true);
            return state;
        case HomeActionsConstants.ON_CLOSE_MENU:
            state = state.set('displayMenu', false);
            return state;
        case HomeActionsConstants.ON_CLICK_MY_PROFILE:
            history.push("/my_profile");
            return state;
        case HomeActionsConstants.ON_CLICK_OTHER_PROFILES:
            history.push("/all_profiles");
            return state;
        case HomeActionsConstants.ON_CLICK_NEW_REVIEW:
            history.push("/new_review");
            return state;
        case HomeActionsConstants.ON_CLICK_REVIEWS:
            history.push("/all_reviews");
            return state;
        case HomeActionsConstants.ON_CLICK_SEARCH:
            history.push("/search");
            return state;
        case HomeActionsConstants.ON_CLICK_LOGOUT:
            history.push("/");
            return state;
        default:
            return state;
    }
};

export default HomeReducer