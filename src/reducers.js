import { combineReducers } from 'redux';
import AppReducer from './components/App/LoginPage/reducer';


export default combineReducers({
    app: AppReducer,
});