import {CurrentUserConstants} from '../Constants/CurrentUserConstants.js';
import initialState from '../initialState';

const CurrentUserReducer = (state = initialState.currentUser, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type)
    {
        case CurrentUserConstants.RESET_CURRENT_STATE:
            state = state.set('currentUsername', '');
            state = state.set('currentLocation', '');
            state = state.set('currentImagePath', '');
            state = state.set('errorImage', 'please pick an image!');
            return state;
        case CurrentUserConstants.USER_NAME_ERROR:
            state = state.set('errorUsername', 'user name already exist!');
            return state;
        case CurrentUserConstants.CHANGE_USERNAME:
                state = state.set('currentUsername', action.payload.username);
                state = state.set('errorUsername', '');
            return state;
        case CurrentUserConstants.CHANGE_LOCATION:
                state = state.set('currentLocation', action.payload.location);
                return state;
        case CurrentUserConstants.ADD_IMAGE:
            if (action.payload.acceptedFiles.length === 1) {
                state = state.set('currentImagePath', URL.createObjectURL(action.payload.acceptedFiles[0]));
                state = state.set('errorImage', "")
            } else if (action.payload.acceptedFiles.length > 1) {
                state = state.set('errorImage', "you have to choose only one image!")
            }
            return state;
        default:
            return state;
    }
};

export default CurrentUserReducer