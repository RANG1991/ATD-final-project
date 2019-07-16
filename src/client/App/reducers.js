import { combineReducers } from 'redux';
import UserProfileReducer from './reducers/CurrentUserReducer';
import NavigationReducer from "./reducers/NavigationReducer";
import AppReducer from "./reducers/AppReducer";


export default combineReducers({
    currentUser: UserProfileReducer,
    navigation: NavigationReducer,
    app: AppReducer,
});