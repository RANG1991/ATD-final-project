import { combineReducers } from 'redux';
import AppReducer from './components/App/LoginPage/reducer';
import HomeReducer from "./components/App/ReviewPage/reducer";


export default combineReducers({
    app: AppReducer,
    home: HomeReducer
});