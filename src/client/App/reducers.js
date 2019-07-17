import { combineReducers } from 'redux';
import CurrentUserReducer from './reducers/CurrentUserReducer';
import NavigationReducer from "./reducers/NavigationReducer";
import AppReducer from "./reducers/AppReducer";


export default combineReducers({
    currentUser: CurrentUserReducer,
    navigation: NavigationReducer,
    app: AppReducer,
});