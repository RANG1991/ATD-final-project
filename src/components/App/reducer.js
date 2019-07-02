import {AppActionsConstants} from './Constants.js';
import initialState from '../../initialState';
import {history} from "../../index";

const resetCurrent = (state) => {
    state = state.set('currentUsername', '');
    state = state.set('currentLocation', '');
    state = state.set('currentImagePath', '');
    state = state.set('errorImage', 'please pick an image!');
    return state;
};

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    let users = Array.from(state.get('users').toArray(), x => x.username);
    switch (action.type){
        case AppActionsConstants.CHANGE_USER_NAME:
            console.log(state.get('currentUsername'));
            if (users !== undefined && users.includes(action.payload.username)) {
                state = state.set('errorUsername', 'user name already exist!');
            }
            else {
                state = state.set('currentUsername', action.payload.username);
                state = state.set('errorUsername', '');
            }
            return state;
        case AppActionsConstants.CHANGE_LOCATION:
                state = state.set('currentLocation', action.payload.location);
                return state;
        case AppActionsConstants.HANDLE_SUBMIT_LOGIN:
                if (users !== undefined && users.includes(state.get('currentUsername'))) {
                    state = state.set('errorUsername', 'user name already exist!');
                }
            else {
                if (state.get('currentImagePath') !== "") {
                    state = state.update('users', e => e.push(
                        {username: state.get('currentUsername'),
                        location: state.get('currentLocation'),
                        imagePath: state.get('currentImagePath')})
                    );
                    state = resetCurrent(state);
                    history.push("/welcome/" + state.get('currentUsername'));
                }
                else {
                    state = state.set('errorImage', "you have to select an image!");
                }
            }
            return state;
        case AppActionsConstants.ADD_RESTAURANT:
            state = state.update('restaurants', e => e.push(action.payload.restaurant));
            return state;
        case AppActionsConstants.ADD_IMAGE:
            if (action.payload.acceptedFiles.length === 1) {
                state = state.set('currentImagePath', URL.createObjectURL(action.payload.acceptedFiles[0]));
                state = state.set('errorImage', "")
            } else if (action.payload.acceptedFiles.length > 1) {
                state = state.set('errorImage', "you have to choose only one image!")
            }
            return state;
        case AppActionsConstants.ON_CLICK_HOME_NAV_BAR:
            history.push("/");
            return state;
        case AppActionsConstants.ON_CLICK_LOGIN_NAV_BAR:
            state = resetCurrent(state);
            history.push("/login");
            return state;
        default:
            return state;
    }
};

export default AppReducer