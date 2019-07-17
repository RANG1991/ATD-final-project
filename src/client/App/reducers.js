import { combineReducers } from 'redux';
import CurrentUserReducer from './reducers/CurrentUserReducer';
import NavigationReducer from "./reducers/NavigationReducer";
import AppReducer from "./reducers/AppReducer";
import NewReviewReducer from "./reducers/NewReviewReducer";


export default combineReducers({
    currentUser: CurrentUserReducer,
    navigation: NavigationReducer,
    app: AppReducer,
    newReview: NewReviewReducer
});