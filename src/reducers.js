import { combineReducers } from 'redux';
import AppReducer from './components/App/reducer';


export default combineReducers({
    app: AppReducer,
});