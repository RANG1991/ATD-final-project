import { combineReducers } from 'redux';
import AppReducer from './RegPage/reducer';
import HomeReducer from "./UserEntrencePage/reducer";


export default combineReducers({
    app: AppReducer,
    home: HomeReducer
});