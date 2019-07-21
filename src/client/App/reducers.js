import { combineReducers } from 'redux';
import CurrentUserReducer from './reducers/CurrentUserReducer';
import NavigationReducer from "./reducers/NavigationReducer";
import AppReducer from "./reducers/AppReducer";
import NewReviewReducer from "./reducers/NewReviewReducer";
import AllReviewsReducer from "./reducers/AllReviewsReducer";


export default combineReducers({
    currentUser: CurrentUserReducer,
    navigation: NavigationReducer,
    app: AppReducer,
    newReview: NewReviewReducer,
    allReviews: AllReviewsReducer,
});