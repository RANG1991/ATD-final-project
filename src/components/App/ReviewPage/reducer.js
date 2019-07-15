import {HomeActionsConstants} from './Constants.js';
import initialState from '../../../initialState';

const HomeReducer = (state = initialState.home, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case HomeActionsConstants.ON_CLICK_MENU_BUTTON:
            state = state.set('displayMenu', true);
            return state;
        case HomeActionsConstants.ON_CLOSE_MENU:
            state = state.set('displayMenu', false);
            return state;
        default:
            return state;
    }
};

export default HomeReducer