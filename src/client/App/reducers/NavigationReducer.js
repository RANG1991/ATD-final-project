import {history} from "../../../index";
import initialState from "../initialState";
import {NavigationConstants} from "../Constants/NavigationConstants";

const NavigationReducer  = (state = initialState.navigation, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case NavigationConstants.CHANGE_REGISTRATION_SUCCESS:
            state = state.set('successfullyReg', action.payload.success);
            return state;
        case NavigationConstants.ON_CLICK_MENU_BUTTON:
            state = state.set('displayMenu', true);
            return state;
        case NavigationConstants.ON_CLOSE_MENU:
            state = state.set('displayMenu', false);
            return state;
        case NavigationConstants.ON_CHANGE_ROUTING:
            history.push(action.payload.newPath);
            return state;
        default:
            return state;
    }
};

export default NavigationReducer;